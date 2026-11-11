import os
import zipfile
import paramiko
import sys

def zip_project(zip_filename="deploy.zip"):
    print("Creating local deployment zip archive...")
    
    # Exclude specific directories based on their relative paths from the root
    exclude_paths = {
        os.path.normpath('./.git'),
        os.path.normpath('./node_modules'),
        os.path.normpath('./.next'),
        os.path.normpath('./scratch'),
        os.path.normpath('./.gemini'),
        os.path.normpath('./assets'),
        os.path.normpath('./assets1'),
        os.path.normpath('./public/uploads'),
    }
    exclude_files = {
        zip_filename, 
        'deploy_to_vps.py', 
        'install_watchdog.py',
        'deploy_to_vps.mjs',
        'registrations.json',
        'registrations.db',
        'coupons.json',
        'enquiries.json',
        'analytics.json',
        'campaigns.json',
        'contacts.json',
        'emergency_registrations.json'
    }

    with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk('.'):
            # Prune directories using their normalized path relative to the root
            dirs[:] = [d for d in dirs if os.path.normpath(os.path.join(root, d)) not in exclude_paths]
            
            for file in files:
                if file in exclude_files:
                    continue
                file_path = os.path.join(root, file)
                # Save path relative to current dir
                archive_name = os.path.relpath(file_path, '.')
                zipf.write(file_path, archive_name)
    print(f"Zip archive created: {zip_filename} ({os.path.getsize(zip_filename)} bytes)")

def run_ssh_commands(ssh, commands):
    for cmd in commands:
        print(f"\n---> Running remote command: {cmd}")
        stdin, stdout, stderr = ssh.exec_command(cmd)
        
        # Read stdout line by line to show active progress
        while True:
            line = stdout.readline()
            if not line:
                break
            print("STDOUT:", line.strip())
            
        err = stderr.read().decode('utf-8').strip()
        if err:
            print("STDERR:", err)

def setup_nginx_virtual_host(ssh):
    print("\nSetting up independent Nginx configuration for flexathonrun...")
    nginx_config = """server {
    server_name flexathonrun.org www.flexathonrun.org;

    # Gzip Compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml+rss text/javascript;

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
    sftp = ssh.open_sftp()
    temp_path = "/tmp/flexathonrun-nginx.conf"
    with sftp.open(temp_path, "w") as f:
        f.write(nginx_config)
    sftp.close()
    
    commands = [
        "cp /tmp/flexathonrun-nginx.conf /etc/nginx/sites-available/flexathonrun",
        "rm /tmp/flexathonrun-nginx.conf",
        "ln -sf /etc/nginx/sites-available/flexon-sports /etc/nginx/sites-enabled/flexon-sports",
        "ln -sf /etc/nginx/sites-available/flexathonrun /etc/nginx/sites-enabled/flexathonrun",
        "nginx -t",
        "systemctl reload nginx"
    ]
    run_ssh_commands(ssh, commands)
    print("Independent Nginx site configuration enabled and reloaded!")

def main():
    zip_name = "deploy.zip"
    
    # Ensure stdout outputs UTF-8
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8')
        
    zip_project(zip_name)
    
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    
    try:
        print("\nConnecting to remote server via SSH...")
        ssh.connect("66.116.243.185", username="root", password="xRZurglJ9SYy7!", timeout=60)
        transport = ssh.get_transport()
        transport.set_keepalive(10)
        print("Connected successfully!")
        
        # 1. Back up database and upload directory inside the new folder if they already exist
        print("\nBacking up database, coupons, enquiries, analytics, and uploads folder from /var/www/flexathonrun...")
        backup_commands = [
            "mkdir -p /var/www/flexathonrun-data-backup",
            "mkdir -p /var/www/permanent_db_backups/backup_$(date +%Y%m%d_%H%M%S)",
            "cp -p /var/www/flexathonrun/registrations.json /var/www/flexathonrun-data-backup/registrations.json 2>/dev/null || echo 'No registrations.json to back up'",
            "cp -p /var/www/flexathonrun/coupons.json /var/www/flexathonrun-data-backup/coupons.json 2>/dev/null || echo 'No coupons.json to back up'",
            "cp -p /var/www/flexathonrun/enquiries.json /var/www/flexathonrun-data-backup/enquiries.json 2>/dev/null || echo 'No enquiries.json to back up'",
            "cp -p /var/www/flexathonrun/analytics.json /var/www/flexathonrun-data-backup/analytics.json 2>/dev/null || echo 'No analytics.json to back up'",
            "cp -p /var/www/flexathonrun/campaigns.json /var/www/flexathonrun-data-backup/campaigns.json 2>/dev/null || echo 'No campaigns.json to back up'",
            "cp -p /var/www/flexathonrun/contacts.json /var/www/flexathonrun-data-backup/contacts.json 2>/dev/null || echo 'No contacts.json to back up'",
            "cp -p /var/www/flexathonrun/registrations.db /var/www/flexathonrun-data-backup/registrations.db 2>/dev/null || true",
            "mkdir -p /var/www/flexathonrun-data-backup/uploads",
            "cp -r /var/www/flexathonrun/public/uploads/. /var/www/flexathonrun-data-backup/uploads/ 2>/dev/null || echo 'No uploads to back up'",
            "LATEST_BACKUP=$(ls -td /var/www/permanent_db_backups/* | head -n 1); cp -rp /var/www/flexathonrun-data-backup/. \"$LATEST_BACKUP/\"",
            "node -e \"try { const d = JSON.parse(require('fs').readFileSync('/var/www/flexathonrun/registrations.json')); console.log('>>> [PRE-DEPLOY SAFETY AUDIT] Live Production Registrations Count:', d.length); } catch(e) { console.log('Audit note:', e.message); }\""
        ]
        run_ssh_commands(ssh, backup_commands)
        
        # 2. Clear old code/build files while strictly preserving in-place databases, uploads, node_modules, and git
        print("\nCleaning up deployment folder /var/www/flexathonrun (preserving databases in-place)...")
        run_ssh_commands(ssh, [
            "mkdir -p /var/www/flexathonrun",
            "find /var/www/flexathonrun -mindepth 1 -maxdepth 1 -not -name node_modules -not -name .git -not -name 'registrations.json' -not -name 'coupons.json' -not -name 'enquiries.json' -not -name 'analytics.json' -not -name 'campaigns.json' -not -name 'contacts.json' -not -name 'registrations.db' -not -name 'emergency_registrations.json' -exec rm -rf {} +"
        ])
        
        # 3. Upload zip file via SFTP
        print("\nUploading zip archive to VPS...")
        sftp = ssh.open_sftp()
        sftp.put(zip_name, "/var/www/flexathonrun-deploy.zip")
        sftp.close()
        print("Upload complete!")
        
        # 4. Extract new codebase and guarantee databases/uploads are restored & verified
        print("\nExtracting deployment archive and restoring backups...")
        deploy_commands = [
            "unzip -o /var/www/flexathonrun-deploy.zip -d /var/www/flexathonrun",
            "cp -p /var/www/flexathonrun-data-backup/registrations.json /var/www/flexathonrun/registrations.json 2>/dev/null || echo 'No registrations.json to restore'",
            "cp -p /var/www/flexathonrun-data-backup/coupons.json /var/www/flexathonrun/coupons.json 2>/dev/null || echo 'No coupons.json to restore'",
            "cp -p /var/www/flexathonrun-data-backup/enquiries.json /var/www/flexathonrun/enquiries.json 2>/dev/null || echo 'No enquiries.json to restore'",
            "cp -p /var/www/flexathonrun-data-backup/analytics.json /var/www/flexathonrun/analytics.json 2>/dev/null || echo 'No analytics.json to restore'",
            "cp -p /var/www/flexathonrun-data-backup/campaigns.json /var/www/flexathonrun/campaigns.json 2>/dev/null || echo 'No campaigns.json to restore'",
            "cp -p /var/www/flexathonrun-data-backup/contacts.json /var/www/flexathonrun/contacts.json 2>/dev/null || echo 'No contacts.json to restore'",
            "cp -p /var/www/flexathonrun-data-backup/registrations.db /var/www/flexathonrun/registrations.db 2>/dev/null || true",
            "mkdir -p /var/www/flexathonrun/public/uploads",
            "cp -r /var/www/flexathonrun-data-backup/uploads/. /var/www/flexathonrun/public/uploads/ 2>/dev/null || echo 'No uploads to restore'",
            "rm -f /var/www/flexathonrun-deploy.zip",
            "node -e \"try { const d = JSON.parse(require('fs').readFileSync('/var/www/flexathonrun/registrations.json')); console.log('>>> [POST-DEPLOY SAFETY AUDIT] Live Production Registrations Count:', d.length); } catch(e) { console.log('Audit note:', e.message); }\""
        ]
        run_ssh_commands(ssh, deploy_commands)
        
        # 5. Build Next.js app on port 3002
        print("\nBuilding Next.js app on the remote server...")
        build_commands = [
            "cd /var/www/flexathonrun && npm install --legacy-peer-deps",
            "cd /var/www/flexathonrun && npm run build"
        ]
        run_ssh_commands(ssh, build_commands)
        
        # 6. Start/Restart app under PM2 process 'flexathonrun'
        print("\nManaging PM2 process...")
        # Check if flexathonrun already exists in PM2
        stdin, stdout, stderr = ssh.exec_command("pm2 desc flexathonrun")
        desc_out = stdout.read().decode('utf-8')
        
        if "flexathonrun" in desc_out:
            print("PM2 process 'flexathonrun' exists. Restarting...")
            run_ssh_commands(ssh, ["pm2 restart flexathonrun", "pm2 save"])
        else:
            print("Starting new PM2 process 'flexathonrun' on port 3002...")
            run_ssh_commands(ssh, [
                "cd /var/www/flexathonrun && pm2 start node_modules/next/dist/bin/next --name \"flexathonrun\" -- start -p 3002",
                "pm2 save"
            ])
            
        # 7. Configure and reload Nginx
        setup_nginx_virtual_host(ssh)
        
        print("\nINDEPENDENT DEPLOYMENT COMPLETED SUCCESSFULLY!")
        
    except Exception as e:
        print("\nDeployment failed with error:", e)
    finally:
        ssh.close()
        # Clean up local zip
        if os.path.exists(zip_name):
            os.remove(zip_name)
            print("\nCleaned up local zip archive.")

if __name__ == "__main__":
    main()
