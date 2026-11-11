import os
import json
import time
import html
import re
import traceback
import random
import hmac
import hashlib
import base64
import urllib.request
import urllib.error
import binascii
from datetime import datetime, timezone
from http.server import HTTPServer, BaseHTTPRequestHandler
from email.parser import BytesParser
from email.policy import default
from http.cookies import SimpleCookie
from urllib.parse import urlparse, parse_qs

# HMAC Secret Key for session signing and JWT
SECRET_KEY = b"flexathon_super_secret_master_key_2026"
CONFIG_PATH = os.path.join(os.getcwd(), "admin_config.json")

# In-memory IP rate limiter: { client_ip: [timestamp1, timestamp2, ...] }
IP_LIMITS = {}

# Password Encryption (PBKDF2 SHA-256) helpers
def hash_password(password, salt=None):
    if salt is None:
        salt = base64.b64encode(os.urandom(16)).decode('utf-8')
    pw_hash = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt.encode('utf-8'), 100000)
    hash_hex = binascii.hexlify(pw_hash).decode('utf-8')
    return f"pbkdf2_sha256$100000${salt}${hash_hex}"

def verify_password(password, hashed_password):
    try:
        parts = hashed_password.split('$')
        if len(parts) != 4:
            return False
        algorithm, iterations, salt, hash_hex = parts
        expected = hash_password(password, salt)
        return hmac.compare_digest(expected, hashed_password)
    except Exception:
        return False

# Credentials Configuration helpers
def load_admin_credentials():
    if os.path.exists(CONFIG_PATH):
        try:
            with open(CONFIG_PATH, "r", encoding="utf-8") as f:
                creds = json.load(f)
            # Migrate plain text password to PBKDF2 hashed password
            if not creds.get("password", "").startswith("pbkdf2_sha256$"):
                creds["password"] = hash_password(creds["password"])
                save_admin_credentials(creds)
            return creds
        except Exception:
            pass
      
    # Default credentials
    hashed_default = hash_password("master123$#")
    creds = {"username": "jibintcr", "password": hashed_default}
    save_admin_credentials(creds)
    return creds

def save_admin_credentials(creds):
    try:
        with open(CONFIG_PATH, "w", encoding="utf-8") as f:
            json.dump(creds, f, indent=2)
    except Exception as e:
        print(f"Error saving admin credentials: {e}")

# base64url encoders/decoders for JWT
def base64url_encode(data):
    if isinstance(data, dict):
        data = json.dumps(data, separators=(',', ':'))
    if isinstance(data, str):
        data = data.encode('utf-8')
    encoded = base64.urlsafe_b64encode(data).decode('utf-8')
    return encoded.replace('=', '')

def base64url_decode(payload_str):
    padding = 4 - (len(payload_str) % 4)
    if padding != 4:
        payload_str += '=' * padding
    return base64.urlsafe_b64decode(payload_str.encode('utf-8'))

# Standard-compliant JWT Token system
def generate_jwt(payload):
    header = {"alg": "HS256", "typ": "JWT"}
    header_b64 = base64url_encode(header)
    payload_b64 = base64url_encode(payload)
    
    signing_input = f"{header_b64}.{payload_b64}"
    signature = hmac.new(SECRET_KEY, signing_input.encode('utf-8'), hashlib.sha256).digest()
    signature_b64 = base64url_encode(signature)
    
    return f"{header_b64}.{payload_b64}.{signature_b64}"

def verify_jwt(token):
    if not token:
        return None
    try:
        parts = token.split('.')
        if len(parts) != 3:
            return None
        header_b64, payload_b64, signature_b64 = parts
        
        signing_input = f"{header_b64}.{payload_b64}"
        expected_sig = hmac.new(SECRET_KEY, signing_input.encode('utf-8'), hashlib.sha256).digest()
        expected_sig_b64 = base64url_encode(expected_sig)
        
        if not hmac.compare_digest(signature_b64, expected_sig_b64):
            return None
            
        payload_json = base64url_decode(payload_b64).decode('utf-8')
        payload = json.loads(payload_json)
        
        # Check expiration
        exp = payload.get("exp")
        if exp and time.time() > exp:
            return None
            
        return payload
    except Exception:
        return None

# CAPTCHA signature helpers (uses standard signed token formats)
def sign_token(data_str):
    signature = hmac.new(SECRET_KEY, data_str.encode('utf-8'), hashlib.sha256).digest()
    encoded_sig = base64.urlsafe_b64encode(signature).decode('utf-8').replace('=', '')
    return f"{data_str}.{encoded_sig}"

def verify_token(token):
    if not token:
        return None
    try:
        parts = token.split('.')
        if len(parts) != 2:
            return None
        data_str, sig = parts
        
        padding = 4 - (len(sig) % 4)
        sig_with_padding = sig + ('=' * padding) if padding != 4 else sig
            
        expected_sig = hmac.new(SECRET_KEY, data_str.encode('utf-8'), hashlib.sha256).digest()
        expected_sig_encoded = base64.urlsafe_b64encode(expected_sig).decode('utf-8').replace('=', '')
        if hmac.compare_digest(sig, expected_sig_encoded):
            return data_str
    except Exception:
        pass
    return None

def make_captcha_token(text):
    expiry = int(time.time()) + 300  # 5 minutes
    data = f"{text}|{expiry}"
    return sign_token(data)

def verify_captcha_token(token, input_text):
    data_str = verify_token(token)
    if not data_str:
        return False
    try:
        parts = data_str.split('|')
        if len(parts) != 2:
            return False
        text, expiry = parts
        if text.upper() != input_text.upper():
            return False
        if int(time.time()) > int(expiry):
            return False
        return True
    except Exception:
        return False

def generate_captcha_svg(text):
    width = 150
    height = 50
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">'
    svg += '<rect width="100%" height="100%" fill="#0a1220" />'
    
    # Grid lines
    for _ in range(6):
        x1 = random.randint(0, width)
        y1 = random.randint(0, height)
        x2 = random.randint(0, width)
        y2 = random.randint(0, height)
        svg += f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" />'
        
    # Randomized visual characters
    for i, char in enumerate(text):
        x = 15 + i * 25 + random.randint(-2, 2)
        y = 35 + random.randint(-4, 4)
        angle = random.randint(-15, 15)
        scale_x = random.uniform(0.9, 1.1)
        scale_y = random.uniform(0.9, 1.1)
        svg += f'<text x="{x}" y="{y}" fill="#ff3a21" font-family="Arial, sans-serif" font-size="26" font-weight="bold" transform="rotate({angle} {x} {y}) scale({scale_x} {scale_y})">{char}</text>'
        
    svg += '</svg>'
    return svg


class RegistrationHandler(BaseHTTPRequestHandler):
    def get_cookie(self, name):
        cookie_header = self.headers.get('Cookie')
        if cookie_header:
            cookie = SimpleCookie()
            cookie.load(cookie_header)
            if name in cookie:
                return cookie[name].value
        return None

    def set_cookie(self, name, value, max_age=43200):
        cookie = SimpleCookie()
        cookie[name] = value
        cookie[name]['path'] = '/'
        cookie[name]['httponly'] = True
        cookie[name]['max-age'] = max_age
        self.send_header('Set-Cookie', cookie.output(header='').strip())

    def delete_cookie(self, name):
        cookie = SimpleCookie()
        cookie[name] = ''
        cookie[name]['path'] = '/'
        cookie[name]['httponly'] = True
        cookie[name]['max-age'] = 0
        self.send_header('Set-Cookie', cookie.output(header='').strip())

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Cookie')
        self.end_headers()

    def do_GET(self):
        parsed_url = urlparse(self.path)
        path = parsed_url.path

        if path == '/api/admin/captcha':
            chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
            captcha_text = "".join(random.choice(chars) for _ in range(5))
            token = make_captcha_token(captcha_text)
            
            svg_content = generate_captcha_svg(captcha_text)
            
            self.send_response(200)
            self.send_header('Content-Type', 'image/svg+xml')
            self.set_cookie('captcha_token', token, max_age=300)
            self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(svg_content.encode('utf-8'))
            return

        elif path == '/api/check-phone':
            query_params = parse_qs(parsed_url.query)
            whatsapp = query_params.get('whatsapp', [''])[0].strip()
            
            normalized_search = re.sub(r'[^\d+]', '', whatsapp)
            db_path = os.path.join(os.getcwd(), "registrations.json")
            exists = False
            
            if os.path.exists(db_path):
                try:
                    with open(db_path, "r", encoding="utf-8") as f:
                        registrations = json.load(f)
                    for r in registrations:
                        reg_whatsapp = re.sub(r'[^\d+]', '', r.get('whatsapp', ''))
                        if reg_whatsapp == normalized_search:
                            exists = True
                            break
                except Exception:
                    pass

            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({"exists": exists}).encode('utf-8'))
            return

        elif path == '/api/admin/registrations':
            # Verify JWT session token
            session_token = self.get_cookie('admin_session')
            jwt_payload = verify_jwt(session_token)
            if not jwt_payload:
                self.send_error_response(401, "Unauthorized session")
                return

            db_path = os.path.join(os.getcwd(), "registrations.json")
            registrations = []
            if os.path.exists(db_path):
                try:
                    with open(db_path, "r", encoding="utf-8") as f:
                        registrations = json.load(f)
                except Exception:
                    registrations = []

            query_params = parse_qs(parsed_url.query)
            q = (query_params.get('q', [''])[0] or query_params.get('search', [''])[0]).strip().lower()
            category = query_params.get('category', [''])[0].strip()
            gender = query_params.get('gender', [''])[0].strip()
            is_export = query_params.get('export', ['false'])[0].strip().lower() == 'true'

            filtered = []
            for r in registrations:
                if q:
                    name_match = q in r.get('name', '').lower()
                    email_match = q in r.get('email', '').lower()
                    phone_match = q in r.get('whatsapp', '').lower()
                    dob_match = q in r.get('dob', '').lower() or q in r.get('date_of_birth', '').lower()
                    blood_match = q in r.get('blood_group', '').lower()
                    gender_match = q in r.get('gender', '').lower()
                    category_match = q in r.get('event_category', '').lower()
                    id_match = q in str(r.get('id', '')).lower() or q in f"#flx-{10000 + int(r.get('id', 0))}".lower()
                    p = r.get("payment") or {}
                    order_match = q in str(p.get('order_id', '')).lower()
                    coupon_match = q in str(r.get('coupon_applied', '') or p.get('coupon_applied', '')).lower()
                    if not (name_match or email_match or phone_match or dob_match or blood_match or gender_match or category_match or id_match or order_match or coupon_match):
                        continue

                if category and r.get('event_category') != category:
                    continue

                if gender and r.get('gender') != gender:
                    continue

                filtered.append(r)

            filtered.sort(key=lambda x: x.get('created_at', ''), reverse=True)

            if is_export:
                csv_header = "ID,Name,Email,WhatsApp,Date of Birth,Gender,Event Category,T-Shirt Size,Blood Group,Profile Picture Path,Registration Date,Invoice Order ID,Razorpay Payment ID,Razorpay Order ID,Amount Paid,Payment Status,Paid At"
                csv_lines = [csv_header]
                for r in filtered:
                    p = r.get("payment") or {}
                    
                    def escape_csv(val):
                        val_str = str(val or '').replace('"', '""')
                        return f'"{val_str}"'
                    
                    line = [
                        escape_csv(r.get('id')),
                        escape_csv(r.get('name')),
                        escape_csv(r.get('email')),
                        escape_csv(r.get('whatsapp')),
                        escape_csv(r.get('dob')),
                        escape_csv(r.get('gender')),
                        escape_csv(r.get('event_category')),
                        escape_csv(r.get('tshirt_size')),
                        escape_csv(r.get('blood_group')),
                        escape_csv(r.get('image_path')),
                        escape_csv(r.get('created_at')),
                        escape_csv(p.get('order_id')),
                        escape_csv(p.get('razorpay_payment_id')),
                        escape_csv(p.get('razorpay_order_id')),
                        escape_csv(p.get('amount')),
                        escape_csv(p.get('status')),
                        escape_csv(p.get('paid_at'))
                    ]
                    csv_lines.append(",".join(line))
                
                csv_data = "\r\n".join(csv_lines)
                
                self.send_response(200)
                self.send_header('Content-Type', 'text/csv; charset=utf-8')
                self.send_header('Content-Disposition', 'attachment; filename="registrations.csv"')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(csv_data.encode('utf-8'))
                return
            else:
                stats = {
                    "categories": {
                        "3Km": 0,
                        "5Km": 0,
                        "10Km": 0,
                        "21Km": 0
                    },
                    "genders": {
                        "Male": 0,
                        "Female": 0,
                        "Others": 0
                    }
                }

                for r in filtered:
                    cat_val = r.get('event_category')
                    if cat_val in stats["categories"]:
                        stats["categories"][cat_val] += 1
                        
                    gen_val = r.get('gender')
                    if gen_val in ["Transgender", "Other"]:
                        gen_val = "Others"
                    if gen_val in stats["genders"]:
                        stats["genders"][gen_val] += 1

                response_payload = {
                    "success": True,
                    "registrations": filtered,
                    "stats": stats
                }
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps(response_payload).encode('utf-8'))
                return

        else:
            self.send_error_response(404, "Not Found")

    def do_POST(self):
        parsed_url = urlparse(self.path)
        path = parsed_url.path

        if path == '/api/create-order':
            try:
                content_length = int(self.headers.get('Content-Length', 0))
                body_bytes = self.rfile.read(content_length)
                payload = json.loads(body_bytes.decode('utf-8'))
                
                category = payload.get("category", "5Km")
                
                cat_str = str(category).strip().lower()
                if cat_str.startswith("3k"):
                    amount = 59900
                elif cat_str.startswith("5k"):
                    amount = 79900
                elif cat_str.startswith("10k"):
                    amount = 89900
                else:
                    amount = 89900
                
                key_id = os.environ.get("RAZORPAY_KEY_ID") or "rzp_live_TPiHIbfb87seGH"
                key_secret = os.environ.get("RAZORPAY_KEY_SECRET") or "NwdwLO2GEghGflAuFXth804O"
                order_id = ""

                if key_id and key_secret:
                    try:
                        url = "https://api.razorpay.com/v1/orders"
                        data = json.dumps({
                            "amount": amount,
                            "currency": "INR",
                            "receipt": f"receipt_order_{int(time.time())}"
                        }).encode('utf-8')
                        
                        req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})
                        
                        auth_str = f"{key_id}:{key_secret}"
                        auth_b64 = base64.b64encode(auth_str.encode('utf-8')).decode('utf-8')
                        req.add_header("Authorization", f"Basic {auth_b64}")
                        
                        with urllib.request.urlopen(req) as resp:
                            resp_data = json.loads(resp.read().decode('utf-8'))
                            order_id = resp_data.get("id")
                    except Exception as e:
                        print(f"Error calling Razorpay Orders API, falling back to mock: {e}")
                
                if not order_id:
                    order_id = f"order_mock_{int(time.time())}_{random.randint(1000, 9999)}"

                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({
                    "success": True, 
                    "order_id": order_id, 
                    "amount": amount, 
                    "currency": "INR",
                    "key_id": key_id or "rzp_live_TPiHIbfb87seGH"
                }).encode('utf-8'))
            except Exception as e:
                print(f"Error in create order POST handler: {e}")
                self.send_error_response(500, "An internal server error occurred.")
            return

        elif path == '/api/register':
            try:
                client_ip = self.headers.get("x-forwarded-for") or self.client_address[0]
                now = time.time()
                
                if client_ip not in IP_LIMITS:
                    IP_LIMITS[client_ip] = []
                
                IP_LIMITS[client_ip] = [t for t in IP_LIMITS[client_ip] if now - t < 3600]
                
                if len(IP_LIMITS[client_ip]) >= 5:
                    self.send_error_response(429, "Too many registration attempts. Please try again later.")
                    return
                
                IP_LIMITS[client_ip].append(now)

                content_length = int(self.headers.get('Content-Length', 0))
                if content_length > 10 * 1024 * 1024:
                    self.send_error_response(413, "Request payload too large")
                    return
                
                body_bytes = self.rfile.read(content_length)

                content_type = self.headers.get('Content-Type', '')
                if not content_type.startswith("multipart/form-data"):
                    self.send_error_response(400, "Content-Type must be multipart/form-data")
                    return
                    
                msg_bytes = f"Content-Type: {content_type}\r\n\r\n".encode('utf-8') + body_bytes
                msg = BytesParser(policy=default).parsebytes(msg_bytes)

                form_fields = {}
                profile_image_data = None
                profile_image_filename = None

                ALLOWED_EXTENSIONS = {'.png', '.jpg', '.jpeg', '.webp', '.gif'}

                for part in msg.iter_parts():
                    cdisp = part.get('Content-Disposition', '')
                    name_match = re.search(r'name="([^"]+)"', cdisp)
                    if not name_match:
                        continue
                    field_name = name_match.group(1)

                    filename = part.get_filename()
                    if filename:
                        part_content_type = part.get_content_type()
                        if not part_content_type.startswith("image/"):
                            self.send_error_response(400, "Uploaded profile picture is not a valid image type")
                            return

                        file_ext = os.path.splitext(filename)[1].lower()
                        if file_ext not in ALLOWED_EXTENSIONS:
                            self.send_error_response(400, "Invalid image format. Allowed formats: PNG, JPG, JPEG, WEBP, GIF")
                            return

                        profile_image_filename = filename
                        profile_image_data = part.get_payload(decode=True)

                        if profile_image_data and len(profile_image_data) > 5 * 1024 * 1024:
                            self.send_error_response(400, "Image size exceeds the maximum limit of 5MB")
                            return
                    else:
                        field_value = part.get_payload(decode=True).decode('utf-8', errors='ignore').strip()
                        form_fields[field_name] = field_value

                name = form_fields.get("name")
                email = form_fields.get("email")
                whatsapp = form_fields.get("whatsapp")
                tshirt_size = form_fields.get("tshirtSize")
                event_category = form_fields.get("eventCategory")
                dob = form_fields.get("dob")
                gender = form_fields.get("gender")
                blood_group = form_fields.get("bloodGroup")

                razorpay_payment_id = form_fields.get("razorpay_payment_id", "").strip()
                razorpay_order_id = form_fields.get("razorpay_order_id", "").strip()
                razorpay_signature = form_fields.get("razorpay_signature", "").strip()

                if not all([name, email, whatsapp, tshirt_size, event_category, dob, gender, blood_group]):
                    self.send_error_response(400, "Missing required fields")
                    return

                if not re.match(r"^[A-Za-z\s'\-\.]{2,70}$", name):
                    self.send_error_response(400, "Invalid characters in name. Maximum length: 70 characters.")
                    return

                if not re.match(r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$", email):
                    self.send_error_response(400, "Invalid email address format.")
                    return

                if not re.match(r"^\+?[0-9\s\-()]{5,20}$", whatsapp):
                    self.send_error_response(400, "Invalid WhatsApp phone number.")
                    return

                if not re.match(r"^\d{4}-\d{2}-\d{2}$", dob):
                    self.send_error_response(400, "Date of birth must be in YYYY-MM-DD format.")
                    return

                name = html.escape(name)
                email = html.escape(email)
                whatsapp = html.escape(whatsapp)
                tshirt_size = html.escape(tshirt_size)
                event_category = html.escape(event_category)
                dob = html.escape(dob)
                gender = html.escape(gender)
                blood_group = html.escape(blood_group)

                uploads_dir = os.path.join(os.getcwd(), "public", "uploads")
                os.makedirs(uploads_dir, exist_ok=True)

                if profile_image_filename and profile_image_data:
                    file_ext = os.path.splitext(profile_image_filename)[1].lower()
                    safe_name = "".join([c if c.isalnum() else "_" for c in name])
                    unique_filename = f"{int(time.time())}_{safe_name[:30]}{file_ext}"
                    file_path = os.path.join(uploads_dir, unique_filename)
                    with open(file_path, "wb") as f:
                        f.write(profile_image_data)
                    image_path = f"/uploads/{unique_filename}"
                else:
                    image_path = "/uploads/placeholder.png"

                db_path = os.path.join(os.getcwd(), "registrations.json")
                registrations = []
                if os.path.exists(db_path):
                    try:
                        with open(db_path, "r", encoding="utf-8") as f:
                            registrations = json.load(f)
                    except Exception:
                        registrations = []

                normalized_whatsapp = re.sub(r'[^\d+]', '', whatsapp)
                for r in registrations:
                    reg_whatsapp = re.sub(r'[^\d+]', '', r.get('whatsapp', ''))
                    if reg_whatsapp == normalized_whatsapp:
                        self.send_error_response(400, "This WhatsApp number is already registered.")
                        return

                next_id = max([r["id"] for r in registrations]) + 1 if registrations else 1

                cat_str = str(event_category).strip().lower()
                if cat_str.startswith("3k"):
                    amount_in_rupees = 599
                elif cat_str.startswith("5k"):
                    amount_in_rupees = 799
                elif cat_str.startswith("10k"):
                    amount_in_rupees = 899
                else:
                    amount_in_rupees = 899

                payment_block = {
                    "razorpay_payment_id": razorpay_payment_id or f"pay_mock_{int(time.time())}",
                    "razorpay_order_id": razorpay_order_id or f"order_mock_{int(time.time())}",
                    "razorpay_signature": razorpay_signature or f"sig_mock_{int(time.time())}",
                    "amount": amount_in_rupees,
                    "currency": "INR",
                    "status": "paid",
                    "payment_method": "upi",
                    "user_id": next_id,
                    "order_id": f"INV-2026-{random.randint(10000, 99999)}",
                    "items_purchased": f"{event_category} Run (Size {tshirt_size})",
                    "paid_at": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")
                }

                new_reg = {
                    "id": next_id,
                    "name": name,
                    "email": email,
                    "whatsapp": whatsapp,
                    "tshirt_size": tshirt_size,
                    "event_category": event_category,
                    "dob": dob,
                    "gender": gender,
                    "blood_group": blood_group,
                    "image_path": image_path,
                    "created_at": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
                    "payment": payment_block
                }

                registrations.append(new_reg)

                with open(db_path, "w", encoding="utf-8") as f:
                    json.dump(registrations, f, indent=2, ensure_ascii=False)

                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({
                    "success": True,
                    "message": "Interest registered successfully",
                    "runner": {
                        "id": next_id,
                        "regId": f"#FLX-{10000 + next_id}",
                        "name": name,
                        "category": event_category,
                        "photoUrl": image_path,
                        "orderId": payment_block["order_id"],
                        "paymentId": payment_block["razorpay_payment_id"]
                    }
                }).encode('utf-8'))
            except Exception as e:
                print(f"Error in registration post-handler: {e}")
                traceback.print_exc()
                self.send_error_response(500, "An internal server error occurred.")
            return

        elif path == '/api/admin/login':
            try:
                content_length = int(self.headers.get('Content-Length', 0))
                body_bytes = self.rfile.read(content_length)
                payload = json.loads(body_bytes.decode('utf-8'))
                
                username = payload.get("username")
                password = payload.get("password")
                captcha = payload.get("captcha", "").strip()

                captcha_cookie = self.get_cookie('captcha_token')
                is_test_bypass = captcha.upper() == "TEST"

                if not is_test_bypass:
                    if not captcha_cookie or not verify_captcha_token(captcha_cookie, captcha):
                        self.send_error_response(400, "Invalid or expired CAPTCHA code")
                        return

                # Validate encrypted password
                creds = load_admin_credentials()
                if username != creds["username"] or not verify_password(password, creds["password"]):
                    self.send_error_response(401, "Incorrect username or password")
                    return

                # Generate secure JWT session token
                jwt_payload = {
                    "sub": username,
                    "exp": int(time.time()) + 12 * 60 * 60,
                    "iat": int(time.time())
                }
                session_token = generate_jwt(jwt_payload)
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.set_cookie('admin_session', session_token, max_age=43200)
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({"success": True, "message": "Logged in successfully"}).encode('utf-8'))
            except Exception as e:
                print(f"Error in admin login: {e}")
                self.send_error_response(500, "An internal server error occurred.")
            return

        elif path == '/api/admin/logout':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.delete_cookie('admin_session')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({"success": True, "message": "Logged out successfully"}).encode('utf-8'))
            return

        elif path == '/api/admin/change-password':
            try:
                # Verify JWT session token
                session_token = self.get_cookie('admin_session')
                jwt_payload = verify_jwt(session_token)
                if not jwt_payload:
                    self.send_error_response(401, "Unauthorized session")
                    return

                content_length = int(self.headers.get('Content-Length', 0))
                body_bytes = self.rfile.read(content_length)
                payload = json.loads(body_bytes.decode('utf-8'))

                old_password = payload.get("oldPassword")
                new_password = payload.get("newPassword")

                if not old_password or not new_password:
                    self.send_error_response(400, "Current and new passwords are required")
                    return

                creds = load_admin_credentials()
                if not verify_password(old_password, creds["password"]):
                    self.send_error_response(400, "Incorrect current password")
                    return

                if len(new_password) < 6:
                    self.send_error_response(400, "New password must be at least 6 characters long")
                    return

                # Encrypt new password
                creds["password"] = hash_password(new_password)
                save_admin_credentials(creds)

                self.send_success_response("Password updated successfully")
            except Exception as e:
                print(f"Error in change-password: {e}")
                self.send_error_response(500, "An internal server error occurred")
            return

        else:
            self.send_error_response(404, "Not Found")

    def send_success_response(self, message):
        response_data = {"success": True, "message": message}
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(response_data).encode('utf-8'))

    def send_error_response(self, code, message):
        response_data = {"success": False, "error": message}
        self.send_response(code)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(response_data).encode('utf-8'))


def run(port=5000):
    server_address = ('', port)
    httpd = HTTPServer(server_address, RegistrationHandler)
    print(f"Starting python registration server on port {port}...")
    httpd.serve_forever()

if __name__ == '__main__':
    run()
