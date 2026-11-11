import paramiko
import sys
import os

sys.stdout.reconfigure(encoding='utf-8')

# 1. Custom Graceful Error Page (Modern, auto-reloading UI)
CUSTOM_50X_HTML = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="refresh" content="3">
    <title>Connecting | Flexathon</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        body {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #090a0f;
            color: #ffffff;
            padding: 20px;
        }
        .card {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 20px;
            padding: 40px 30px;
            max-width: 440px;
            width: 100%;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.5);
            backdrop-filter: blur(10px);
        }
        .spinner {
            width: 48px;
            height: 48px;
            border: 3px solid rgba(255,255,255,0.1);
            border-top-color: #f97316;
            border-radius: 50%;
            margin: 0 auto 24px;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        h1 { font-size: 22px; font-weight: 700; margin-bottom: 12px; letter-spacing: -0.5px; }
        p { color: #94a3b8; font-size: 14px; line-height: 1.5; margin-bottom: 24px; }
        .badge {
            display: inline-block;
            background: rgba(249, 115, 22, 0.1);
            color: #f97316;
            border: 1px solid rgba(249, 115, 22, 0.2);
            padding: 6px 14px;
            border-radius: 9999px;
            font-size: 12px;
            font-weight: 500;
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="spinner"></div>
        <h1>Connecting to Service</h1>
        <p>The system is updating. Reconnecting automatically in a moment...</p>
        <div class="badge">Auto-refreshing in 3s</div>
    </div>
</body>
</html>
"""

# 2. Watchdog Python Script for VPS
WATCHDOG_PY = """#!/usr/bin/env python3
import time
import subprocess
import urllib.request
import urllib.error
import logging
from datetime import datetime

LOG_FILE = "/var/log/site-watchdog.log"
logging.basicConfig(
    filename=LOG_FILE,
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s"
)

SERVICES = [
    {
        "name": "flexathonrun",
        "url": "http://127.0.0.1:3002",
        "port": 3002,
        "dir": "/var/www/flexathonrun",
        "start_cmd": "cd /var/www/flexathonrun && pm2 start node_modules/next/dist/bin/next --name 'flexathonrun' -- start -p 3002 && pm2 save"
    },
    {
        "name": "flexon-sports",
        "url": "http://127.0.0.1:3000",
        "port": 3000,
        "dir": "/var/www/flexon-sports",
        "start_cmd": "cd /var/www/flexon-sports && pm2 start npm --name 'flexon-sports' -- start"
    }
]

def check_url(url, timeout=5):
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "SiteWatchdog/1.0"})
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return resp.getcode() < 500
    except urllib.error.HTTPError as e:
        return e.code < 500
    except Exception:
        return False

def check_nginx():
    try:
        res = subprocess.run(["systemctl", "is-active", "nginx"], capture_output=True, text=True)
        if res.stdout.strip() != "active":
            logging.warning("Nginx is inactive. Attempting restart...")
            subprocess.run(["systemctl", "restart", "nginx"])
            logging.info("Nginx restarted successfully.")
    except Exception as e:
        logging.error(f"Error checking Nginx: {e}")

def recover_service(service):
    name = service["name"]
    logging.warning(f"Service {name} is down/failing! Triggering automated recovery...")
    
    # 1. Check PM2 status
    res = subprocess.run(["pm2", "desc", name], capture_output=True, text=True)
    if name in res.stdout:
        logging.info(f"PM2 process {name} detected. Executing restart...")
        subprocess.run(["pm2", "restart", name])
    else:
        logging.info(f"PM2 process {name} missing. Launching new instance...")
        subprocess.run(service["start_cmd"], shell=True)
        
    subprocess.run(["pm2", "save"])
    time.sleep(5)
    
    # Check if healthy after restart
    if check_url(service["url"]):
        logging.info(f"Service {name} successfully restored to healthy state.")
    else:
        logging.error(f"Service {name} still failing. Will re-evaluate on next check cycle.")

def main():
    logging.info("Site Watchdog Service active in passive monitoring mode (triggers ONLY on failure).")
    fail_counts = {s["name"]: 0 for s in SERVICES}
    last_recovery_time = {s["name"]: 0 for s in SERVICES}
    RECOVERY_COOLDOWN_SECONDS = 60
    
    while True:
        try:
            # Only intervene if Nginx is stopped/crashed
            check_nginx()
            
            current_time = time.time()
            for service in SERVICES:
                name = service["name"]
                is_healthy = check_url(service["url"])
                
                if is_healthy:
                    # System is functioning normally: zero action taken
                    fail_counts[name] = 0
                else:
                    # System failure detected: increment failure counter
                    fail_counts[name] += 1
                    logging.warning(f"Health check failure detected for {name} (failure count: {fail_counts[name]})")
                    
                    # Intervene only after 2 consecutive failed checks and respect cooldown
                    if fail_counts[name] >= 2:
                        if current_time - last_recovery_time[name] >= RECOVERY_COOLDOWN_SECONDS:
                            recover_service(service)
                            last_recovery_time[name] = current_time
                            fail_counts[name] = 0
                        else:
                            logging.info(f"Cooldown active for {name} ({int(RECOVERY_COOLDOWN_SECONDS - (current_time - last_recovery_time[name]))}s remaining).")
                        
        except Exception as e:
            logging.error(f"Watchdog error: {e}")
            
        # Passive sleep interval
        time.sleep(10)

if __name__ == "__main__":
    main()
"""

# 3. Systemd Unit File for Watchdog
SYSTEMD_SERVICE = """[Unit]
Description=Flexathon & Flexon Automated Self-Healing Watchdog
After=network.target pm2-root.service nginx.service

[Service]
Type=simple
User=root
ExecStart=/usr/bin/python3 /usr/local/bin/site_watchdog.py
Restart=always
RestartSec=5
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
"""

# 4. Updated Nginx config with graceful error page and robust proxy settings
UPDATED_NGINX_CONF = """server {
    server_name flexathonrun.org www.flexathonrun.org;

    # Gzip Compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml+rss text/javascript;

    # Custom graceful error page during momentary restarts
    error_page 502 503 504 /50x.html;
    location = /50x.html {
        root /var/www/flexathonrun/public;
        internal;
    }

    location / {
        proxy_pass http://127.0.0.1:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Resilient timeouts
        proxy_connect_timeout 5s;
        proxy_read_timeout 60s;
        proxy_send_timeout 60s;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/flexathonrun.org/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/flexathonrun.org/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}
server {
    if ($host = www.flexathonrun.org) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    if ($host = flexathonrun.org) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    listen 80;
    server_name flexathonrun.org www.flexathonrun.org;
    return 404; # managed by Certbot
}
"""

def deploy_watchdog():
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    print("Connecting to remote VPS...")
    ssh.connect("66.116.243.185", username="root", password="xRZurglJ9SYy7!", timeout=30)
    
    sftp = ssh.open_sftp()
    
    # 1. Upload custom 50x.html to /var/www/flexathonrun/public/50x.html
    print("Uploading custom graceful 50x.html page...")
    with sftp.open("/var/www/flexathonrun/public/50x.html", "w") as f:
        f.write(CUSTOM_50X_HTML)
        
    # Also save it locally in public/
    os.makedirs("public", exist_ok=True)
    with open("public/50x.html", "w", encoding="utf-8") as f:
        f.write(CUSTOM_50X_HTML)
        
    # 2. Upload watchdog python script
    print("Uploading /usr/local/bin/site_watchdog.py...")
    with sftp.open("/usr/local/bin/site_watchdog.py", "w") as f:
        f.write(WATCHDOG_PY)
        
    # 3. Upload systemd unit file
    print("Uploading /etc/systemd/system/site-watchdog.service...")
    with sftp.open("/etc/systemd/system/site-watchdog.service", "w") as f:
        f.write(SYSTEMD_SERVICE)
        
    # 4. Upload updated Nginx config
    print("Uploading /etc/nginx/sites-available/flexathonrun...")
    with sftp.open("/etc/nginx/sites-available/flexathonrun", "w") as f:
        f.write(UPDATED_NGINX_CONF)
        
    sftp.close()
    
    commands = [
        "chmod +x /usr/local/bin/site_watchdog.py",
        "systemctl daemon-reload",
        "systemctl enable site-watchdog.service",
        "systemctl restart site-watchdog.service",
        "nginx -t",
        "systemctl reload nginx",
        "systemctl status site-watchdog.service",
        "tail -n 20 /var/log/site-watchdog.log"
    ]
    
    for cmd in commands:
        print(f"\n---> CMD: {cmd}")
        stdin, stdout, stderr = ssh.exec_command(cmd)
        out = stdout.read().decode('utf-8', errors='replace')
        err = stderr.read().decode('utf-8', errors='replace')
        if out:
            print(out)
        if err:
            print("ERR:", err)
            
    ssh.close()
    print("\nSelf-healing watchdog installed and active!")

if __name__ == "__main__":
    deploy_watchdog()
