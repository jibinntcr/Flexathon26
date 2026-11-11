import json
import urllib.request

def test_analytics_dropoff():
    print("\n==========================================")
    print("  TESTING ANALYTICS USER ACTIVITY TRACKING")
    print("==========================================")
    
    # 1. Trigger Payment Initiation
    url = "http://localhost:3000/api/create-order"
    payload = {
        "category": "5Km",
        "name": "Live Dropoff Tester",
        "email": "livedropoff@test.org",
        "contact": "919988776655",
        "couponCode": ""
    }
    
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"}
    )
    
    with urllib.request.urlopen(req) as resp:
        res_data = json.loads(resp.read().decode("utf-8"))
        print(f"1. Create order initiated: Status {resp.status}, Order ID: {res_data.get('order_id')}")
        
    # 2. Check analytics.json
    with open("analytics.json", "r", encoding="utf-8") as f:
        analytics = json.load(f)
        
    logs = analytics.get("dropoffLogs", [])
    print(f"2. Total dropoffLogs found: {len(logs)}")
    
    matching = [l for l in logs if l.get("name") == "Live Dropoff Tester"]
    if matching:
        latest = matching[0]
        print(f"3. SUCCESS! Found user activity log:")
        print(f"   - Name: {latest.get('name')}")
        print(f"   - WhatsApp: {latest.get('whatsapp')}")
        print(f"   - Email: {latest.get('email')}")
        print(f"   - Stage: {latest.get('stage')}")
        print(f"   - Status: {latest.get('status')}")
        print(f"   - Remark: {latest.get('remark')}")
    else:
        print("3. FAILED: Dropoff log not found!")
        
    print("\n==========================================")
    print("  ANALYTICS ACTIVITY TEST COMPLETE!")
    print("==========================================")

if __name__ == "__main__":
    test_analytics_dropoff()
