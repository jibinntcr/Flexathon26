import crypto from "crypto";

const SECRET = process.env.ADMIN_SESSION_SECRET || "flexathon_admin_sec_987654321_key!";

export function hashPassword(password: string, saltInput?: string): string {
  const salt = saltInput || crypto.randomBytes(16).toString("base64");
  const iterations = 100000;
  const keylen = 32;
  const hash = crypto.pbkdf2Sync(password, salt, iterations, keylen, "sha256").toString("hex");
  return `pbkdf2_sha256$${iterations}$${salt}$${hash}`;
}

export function verifyPassword(password: string, hashed: string): boolean {
  try {
    const parts = hashed.split("$");
    if (parts.length !== 4) return false;
    const [algo, iterationsStr, salt, hashHex] = parts;
    const expected = hashPassword(password, salt);
    return crypto.timingSafeEqual(Buffer.from(hashed), Buffer.from(expected));
  } catch {
    return false;
  }
}


export function signCaptcha(text: string, expiry: number): string {
  const data = `${text}:${expiry}`;
  const hmac = crypto.createHmac("sha256", SECRET);
  hmac.update(data);
  return `${data}:${hmac.digest("hex")}`;
}

export function verifyCaptchaToken(signedValue: string, userText: string): boolean {
  try {
    const parts = signedValue.split(":");
    if (parts.length !== 3) return false;
    const [text, expiryStr, signature] = parts;
    const expiry = parseInt(expiryStr);
    
    if (Date.now() > expiry) return false; // Expired

    const expectedSignature = crypto.createHmac("sha256", SECRET)
      .update(`${text}:${expiry}`)
      .digest("hex");

    return signature === expectedSignature && text.toLowerCase() === userText.trim().toLowerCase();
  } catch {
    return false;
  }
}

export function signSession(expiry: number): string {
  const data = `admin_session:${expiry}`;
  const hmac = crypto.createHmac("sha256", SECRET);
  hmac.update(data);
  return `${data}:${hmac.digest("hex")}`;
}

export function verifySession(tokenOrReq: string | Request): boolean {
  try {
    let token: string | undefined;
    if (typeof tokenOrReq === "string") {
      token = tokenOrReq;
    } else {
      const cookieHeader = tokenOrReq.headers.get("cookie");
      const cookieVal = cookieHeader?.split(";")
        .find(c => c.trim().startsWith("admin_session="))
        ?.split("=")[1];
      token = cookieVal ? decodeURIComponent(cookieVal) : undefined;
    }
    if (!token) return false;

    const parts = token.split(":");
    if (parts.length !== 3) return false;
    const [prefix, expiryStr, signature] = parts;
    if (prefix !== "admin_session") return false;
    
    const expiry = parseInt(expiryStr);
    if (Date.now() > expiry) return false;

    const expectedSignature = crypto.createHmac("sha256", SECRET)
      .update(`admin_session:${expiry}`)
      .digest("hex");

    return signature === expectedSignature;
  } catch {
    return false;
  }
}
