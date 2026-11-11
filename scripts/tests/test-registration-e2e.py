import urllib.request
import urllib.parse
import json
import time
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

BASE_URL = "http://localhost:3000"

def post_json(endpoint, data):
    url = f"{BASE_URL}{endpoint}"
    req_data = json.dumps(data).encode("utf-8")
    req = urllib.request.Request(url, data=req_data, headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req) as resp:
            return resp.getcode(), json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8")
        try:
            return e.code, json.loads(body)
        except Exception:
            return e.code, {"raw": body}

def get_json(endpoint):
    url = f"{BASE_URL}{endpoint}"
    req = urllib.request.Request(url)
    try:
        with urllib.request.urlopen(req) as resp:
            return resp.getcode(), json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8")
        try:
            return e.code, json.loads(body)
        except Exception:
            return e.code, {"raw": body}

def run_tests():
    print("=" * 60)
    print("🚀 STARTING COMPREHENSIVE REGISTRATION PROCESS TEST SUITE")
    print("=" * 60)

    test_phone = f"98765{int(time.time()) % 100000:05d}"
    print(f"\n[Test Setup] Using Test Phone Number: {test_phone}")

    # TEST 1: Check phone endpoint
    print("\n--- [TEST 1] Checking Phone Number Endpoint (/api/check-phone) ---")
    status, res = get_json(f"/api/check-phone?phone={test_phone}")
    print(f"Status: {status} | Response: {res}")
    assert status == 200, f"Expected 200, got {status}"
    assert res.get("allowed") is True, "Phone should be allowed"
    print("✅ TEST 1 PASSED: Phone checking is non-blocking.")

    # TEST 2: Coupon verification
    print("\n--- [TEST 2] Verifying Coupon Code (/api/verify-coupon) ---")
    status, res = post_json("/api/verify-coupon", {"code": "NILA10%", "category": "5Km"})
    print(f"Status: {status} | Response: {res}")
    assert status == 200, f"Expected 200, got {status}"
    assert res.get("valid") is True, "Coupon should be valid"
    assert res.get("discountType") == "percentage", "Expected percentage discount"
    print("✅ TEST 2 PASSED: Promo coupon verified successfully.")

    # TEST 3: Create Order endpoint
    print("\n--- [TEST 3] Creating Razorpay Order (/api/create-order) ---")
    status, res = post_json("/api/create-order", {
        "amount": 719,
        "currency": "INR",
        "category": "5Km",
        "receipt": f"rcpt_{int(time.time())}"
    })
    print(f"Status: {status} | Order ID: {res.get('orderId')}")
    assert status == 200, f"Expected 200, got {status}"
    assert "orderId" in res, "Expected orderId in response"
    order_id = res["orderId"]
    print("✅ TEST 3 PASSED: Razorpay order created successfully.")

    # TEST 4: Register Runner 1
    print("\n--- [TEST 4] Registering Runner 1 (Rohan Verma - 5Km) (/api/register) ---")
    reg1_payload = {
        "name": "Rohan Verma",
        "email": "rohan.verma@testmail.org",
        "whatsapp": test_phone,
        "tshirtSize": "L",
        "eventCategory": "5Km",
        "dob": "1995-06-15",
        "gender": "Male",
        "bloodGroup": "O+",
        "coupon_applied": "NILA10%",
        "amount": 719,
        "razorpay_payment_id": f"pay_test_{int(time.time())}_1",
        "razorpay_order_id": order_id,
        "razorpay_signature": "sig_verified_mock_1"
    }
    status, res = post_json("/api/register", reg1_payload)
    runner1 = res.get("runner", {})
    reg1_id = f"#FLX-{10000 + runner1.get('id', 0)}" if runner1 else "N/A"
    print(f"Status: {status} | Registration ID: {reg1_id} | User ID: {runner1.get('id')}")
    assert status in (200, 201), f"Expected 200/201, got {status} ({res})"
    assert res.get("success") is True, f"Registration failed: {res}"
    print(f"✅ TEST 4 PASSED: Runner 1 registered successfully with ID {reg1_id}.")

    # TEST 5: Register Runner 2 with SAME phone number (Family Member)
    print("\n--- [TEST 5] Registering Runner 2 (Ananya Verma - 10Km) with SAME Phone ---")
    reg2_payload = {
        "name": "Ananya Verma",
        "email": "ananya.verma@testmail.org",
        "whatsapp": test_phone,
        "tshirtSize": "M",
        "eventCategory": "10Km",
        "dob": "1998-09-22",
        "gender": "Female",
        "bloodGroup": "B+",
        "coupon_applied": "NILA10%",
        "amount": 809,
        "razorpay_payment_id": f"pay_test_{int(time.time())}_2",
        "razorpay_order_id": f"order_test_{int(time.time())}_2",
        "razorpay_signature": "sig_verified_mock_2"
    }
    status, res = post_json("/api/register", reg2_payload)
    runner2 = res.get("runner", {})
    reg2_id = f"#FLX-{10000 + runner2.get('id', 0)}" if runner2 else "N/A"
    print(f"Status: {status} | Registration ID: {reg2_id} | User ID: {runner2.get('id')}")
    assert status in (200, 201), f"Expected 200/201, got {status} ({res})"
    assert res.get("success") is True, f"Multi-runner registration failed: {res}"
    print(f"✅ TEST 5 PASSED: Runner 2 registered with shared phone number. ID: {reg2_id}.")

    # TEST 6: Social Card multi-runner retrieval
    print("\n--- [TEST 6] Multi-Runner Social Card Query (/api/runner-card) ---")
    status, res = get_json(f"/api/runner-card?phone={test_phone}")
    print(f"Status: {status} | Total Runners Found: {res.get('count')}")
    assert status == 200, f"Expected 200, got {status}"
    assert res.get("count") >= 2, f"Expected at least 2 runners, got {res.get('count')}"
    runner_names_upper = [r.get("name", "").upper() for r in res.get("runners", [])]
    print(f"Runners returned: {runner_names_upper}")
    assert "ROHAN VERMA" in runner_names_upper, "ROHAN VERMA should be in results"
    assert "ANANYA VERMA" in runner_names_upper, "ANANYA VERMA should be in results"
    print("✅ TEST 6 PASSED: Both runners retrieved properly for social card switching.")

    # TEST 7: Python Logger Intelligence Engine verification
    print("\n--- [TEST 7] Python Activity Logger (/api/admin/logger) ---")
    status, res = get_json("/api/admin/logger")
    print(f"Status: {status} | Total Logs: {res.get('summary', {}).get('totalLogs')} | Success: {res.get('summary', {}).get('totalSuccess')}")
    assert status == 200, f"Expected 200, got {status}"
    assert res.get("summary", {}).get("totalSuccess", 0) >= 2, "Expected verified success counts"
    
    # Check if newly registered runners show up in logger stories
    stories = [l.get("story", "") for l in res.get("allLogs", [])]
    has_rohan = any("Rohan Verma" in s for s in stories)
    has_ananya = any("Ananya Verma" in s for s in stories)
    print(f"Rohan Story in Logger: {has_rohan} | Ananya Story in Logger: {has_ananya}")
    assert has_rohan and has_ananya, "Both runners should appear in humanized logger stories"
    print("✅ TEST 7 PASSED: Python logger accurately translated registrations into human stories.")

    print("\n" + "=" * 60)
    print("🎉 ALL REGISTRATION AND LOGGER TESTS COMPLETED SUCCESSFULLY!")
    print("=" * 60)

if __name__ == "__main__":
    run_tests()
