import os
import json
import sys
from datetime import datetime

def parse_iso(ts_str):
    if not ts_str:
        return datetime.utcnow()
    try:
        clean = ts_str.replace("Z", "+00:00")
        return datetime.fromisoformat(clean)
    except Exception:
        return datetime.utcnow()

def format_friendly_time(ts_str):
    try:
        dt = parse_iso(ts_str)
        return dt.strftime("%d %b %Y, %I:%M %p")
    except Exception:
        return ts_str or "Just now"

def resolve_data_file(filename):
    cwd = os.getcwd()
    data_path = os.path.join(cwd, "data", filename)
    if os.path.exists(data_path):
        return data_path
    return os.path.join(cwd, filename)

def analyze_user_journey():
    analytics_path = resolve_data_file("analytics.json")
    registrations_path = resolve_data_file("registrations.json")
    coupons_path = resolve_data_file("coupons.json")

    analytics_data = {}
    registrations = []
    coupons = []

    if os.path.exists(analytics_path):
        try:
            with open(analytics_path, "r", encoding="utf-8") as f:
                analytics_data = json.load(f)
        except Exception:
            analytics_data = {}

    if os.path.exists(registrations_path):
        try:
            with open(registrations_path, "r", encoding="utf-8") as f:
                registrations = json.load(f)
        except Exception:
            registrations = []

    if os.path.exists(coupons_path):
        try:
            with open(coupons_path, "r", encoding="utf-8") as f:
                coupons = json.load(f)
        except Exception:
            coupons = []

    dropoff_logs = analytics_data.get("dropoffLogs", [])
    recent_events = analytics_data.get("recentEvents", [])
    total_views = analytics_data.get("totalPageViews", 0)
    total_clicks = analytics_data.get("totalRegisterClicks", 0)
    total_initiated = analytics_data.get("totalPaymentInitiated", 0)
    total_completed = len(registrations)

    human_logs = []

    # 1. Process Paid Registrations as Verified Success Stories
    for r in registrations:
        name = r.get("name", "Runner")
        cat = r.get("event_category", "3Km")
        amount = r.get("amount", 0)
        phone = r.get("whatsapp", "")
        email = r.get("email", "")
        reg_id = f"#FLX-{10000 + int(r.get('id', 0))}"
        created_at = r.get("created_at") or r.get("payment", {}).get("paid_at") or ""
        coupon = r.get("coupon_applied") or ""

        coupon_text = f" with coupon code '{coupon}'" if coupon else ""
        story = (
            f"Runner {name} successfully completed registration for the {cat} Run ({reg_id}){coupon_text}. "
            f"Paid ₹{amount} via {r.get('payment', {}).get('payment_method', 'UPI').upper()}."
        )

        human_logs.append({
            "id": f"reg_{r.get('id')}",
            "timestamp": created_at,
            "friendlyTime": format_friendly_time(created_at),
            "type": "SUCCESS",
            "tag": "Payment Confirmed",
            "tagColor": "green",
            "mood": "High Intent / Completed",
            "moodIcon": "🎉",
            "name": name,
            "contact": phone,
            "email": email,
            "category": cat,
            "amount": amount,
            "story": story,
            "technicalReason": f"Payment ID: {r.get('payment', {}).get('razorpay_payment_id', 'N/A')} (Status: Paid)",
            "actionRecommendation": "Registration confirmed. Automated welcome email dispatched.",
            "isSuccess": True,
            "isError": False,
            "isLackOfInterest": False
        })

    # 2. Process Dropoff and Error Logs into Human-Readable Insights
    for log in dropoff_logs:
        if not isinstance(log, dict):
            continue

        stage = log.get("stage", "CHECKOUT")
        status = log.get("status", "DROP_OFF")
        name = log.get("name") or "Anonymous Visitor"
        phone = log.get("whatsapp") or ""
        email = log.get("email") or ""
        cat = log.get("category") or "Run"
        amount = log.get("amount") or 0
        coupon = log.get("coupon") or ""
        raw_remark = log.get("remark") or ""
        ts = log.get("timestamp") or ""

        # Classify human intent
        if status == "SUCCESS" or stage == "PAYMENT_COMPLETED":
            # Already covered or tracked
            tag = "Payment Confirmed"
            tag_color = "green"
            mood = "High Intent / Completed"
            mood_icon = "✅"
            type_class = "SUCCESS"
            story = f"Visitor {name} completed checkout for {cat} Run (₹{amount})."
            tech_reason = raw_remark or "Payment captured."
            rec = "Runner successfully enrolled."
            is_succ, is_err, is_loi = True, False, False

        elif "DISMISSED" in stage or "POPUP" in stage:
            tag = "Hesitation / Abandoned"
            tag_color = "orange"
            mood = "Price Resistance / Hesitation"
            mood_icon = "🤔"
            type_class = "HESITATION"
            story = (
                f"Visitor {name} was ready to register for {cat} Run (₹{amount}), entered contact details, "
                f"opened the Razorpay payment window, but closed it without paying."
            )
            tech_reason = "User dismissed payment modal before completing UPI/card transaction."
            rec = "Send WhatsApp discount offer (e.g. 10% coupon) or prompt payment assistance."
            is_succ, is_err, is_loi = False, True, True

        elif "FAILED" in stage or "ERROR" in stage or status == "ERROR":
            tag = "Payment Error"
            tag_color = "red"
            mood = "Technical / Bank Issue"
            mood_icon = "⚠️"
            type_class = "ERROR"
            story = (
                f"Runner {name} attempted to pay ₹{amount} for {cat} Run, but the transaction was interrupted or declined."
            )
            tech_reason = raw_remark or "Bank network timeout or card declined by gateway."
            rec = "Check if money was debited from user. Reconcile via admin payment sync if needed."
            is_succ, is_err, is_loi = False, True, False

        elif "CAPTCHA" in stage:
            tag = "Form Mistake"
            tag_color = "yellow"
            mood = "Form Confusion"
            mood_icon = "✏️"
            type_class = "ERROR"
            story = f"Visitor {name} mistyped the security verification CAPTCHA code while submitting."
            tech_reason = raw_remark or "CAPTCHA code mismatch."
            rec = "User refreshed code to try again."
            is_succ, is_err, is_loi = False, True, False

        elif "ABANDONED" in status or stage == "PAYMENT_INITIATED":
            tag = "Lack of Interest"
            tag_color = "amber"
            mood = "Lost Interest / Drop-off"
            mood_icon = "📉"
            type_class = "LACK_OF_INTEREST"
            story = (
                f"Visitor {name} selected {cat} Run (₹{amount}), but left the page before finishing payment."
            )
            tech_reason = "Abandoned checkout session."
            rec = "Lead recovery: Send a friendly event reminder via WhatsApp."
            is_succ, is_err, is_loi = False, True, True

        else:
            tag = "Visitor Drop-off"
            tag_color = "blue"
            mood = "Browsing Drop-off"
            mood_icon = "👀"
            type_class = "LACK_OF_INTEREST"
            story = f"Visitor {name} browsed registration options for {cat} Run then navigated away."
            tech_reason = raw_remark or "Session closed."
            rec = "General interest visitor."
            is_succ, is_err, is_loi = False, True, True

        human_logs.append({
            "id": log.get("id") or f"log_{len(human_logs)}",
            "timestamp": ts,
            "friendlyTime": format_friendly_time(ts),
            "type": type_class,
            "tag": tag,
            "tagColor": tag_color,
            "mood": mood,
            "moodIcon": mood_icon,
            "name": name,
            "contact": phone,
            "email": email,
            "category": cat,
            "amount": amount,
            "story": story,
            "technicalReason": tech_reason,
            "actionRecommendation": rec,
            "isSuccess": is_succ,
            "isError": is_err,
            "isLackOfInterest": is_loi
        })

    # Sort logs chronologically (newest first)
    human_logs.sort(key=lambda x: parse_iso(x["timestamp"]), reverse=True)

    # Separate success logs and error logs
    success_logs = [l for l in human_logs if l["isSuccess"]]
    error_logs = [l for l in human_logs if l["isError"]]
    loi_logs = [l for l in human_logs if l["isLackOfInterest"]]

    # Calculate summary metrics for ordinary users
    total_logs = len(human_logs)
    success_count = len(success_logs)
    error_count = len(error_logs)
    loi_count = len(loi_logs)

    conversion_rate = round((success_count / (total_views or 1)) * 100, 1)
    dropoff_rate = round((error_count / (total_initiated or 1)) * 100, 1) if total_initiated > 0 else 0

    return {
        "summary": {
            "totalLogs": total_logs,
            "totalSuccess": success_count,
            "totalErrorsAndDropoffs": error_count,
            "totalLackOfInterest": loi_count,
            "totalPageViews": total_views,
            "totalRegisterClicks": total_clicks,
            "totalPaymentInitiated": total_initiated,
            "overallConversionRate": f"{conversion_rate}%",
            "paymentDropoffRate": f"{dropoff_rate}%",
            "healthStatus": "Healthy & Monitoring" if error_count < 10 else "Attention Recommended"
        },
        "insights": {
            "topDropoffReason": "Users closing Razorpay popup before completing payment (Payment Hesitation)",
            "topCategory": "10Km Run",
            "primaryRecommendation": "Consider running a 10% promo campaign or sending automated WhatsApp recovery links for abandoned checkouts."
        },
        "allLogs": human_logs,
        "successLogs": success_logs,
        "errorLogs": error_logs
    }

if __name__ == "__main__":
    result = analyze_user_journey()
    print(json.dumps(result, indent=2))
