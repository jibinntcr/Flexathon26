const http = require("http");
const fs = require("fs");
const path = require("path");

function request(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body), headers: res.headers });
        } catch (e) {
          resolve({ status: res.statusCode, text: body, headers: res.headers });
        }
      });
    });
    req.on("error", reject);
    if (data) {
      if (typeof data === "string") {
        req.write(data);
      } else {
        req.write(JSON.stringify(data));
      }
    }
    req.end();
  });
}

async function runTests() {
  console.log("==================================================");
  console.log("FLEXATHON REGISTRATION & PRICING VERIFICATION SUITE");
  console.log("==================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${message}`);
      failed++;
    }
  }

  // TEST 1: CREATE ORDER WITHOUT EARLY BIRD (Base Prices: 3Km=749, 5Km=999, 10Km=1099)
  console.log("--- 1. Testing /api/create-order Base Pricing ---");
  
  const testCategories = [
    { cat: "3Km", expectedAmountPaise: 74900, expectedRupees: 749 },
    { cat: "5Km", expectedAmountPaise: 99900, expectedRupees: 999 },
    { cat: "10Km", expectedAmountPaise: 109900, expectedRupees: 1099 }
  ];

  for (const item of testCategories) {
    const res = await request({
      hostname: "localhost",
      port: 3000,
      path: "/api/create-order",
      method: "POST",
      headers: { "Content-Type": "application/json" }
    }, {
      category: item.cat,
      name: "Integration Tester",
      email: "tester@flexathonrun.org",
      contact: "9876543210"
    });

    assert(res.status === 200, `create-order for ${item.cat} returned HTTP 200`);
    assert(res.data && res.data.amount === item.expectedAmountPaise, `create-order for ${item.cat} amount in paise is ${item.expectedAmountPaise} (₹${item.expectedRupees})`);
    assert(res.data && res.data.order_id && res.data.key_id, `create-order returned order_id (${res.data?.order_id}) and key_id`);
  }

  // TEST 2: COUPON CALCULATION BASED ON UPDATED BASE PRICE
  console.log("\n--- 2. Testing Coupon Calculations on Standard Pricing ---");
  // Test VEGA999 (10% discount)
  // For 3Km (749): 10% = 75 discount -> final = 674
  // For 5Km (999): 10% = 100 discount -> final = 899
  // For 10Km (1099): 10% = 110 discount -> final = 989
  const couponCategories = [
    { cat: "3Km", original: 749, discount: 75, final: 674 },
    { cat: "5Km", original: 999, discount: 100, final: 899 },
    { cat: "10Km", original: 1099, discount: 110, final: 989 }
  ];

  for (const c of couponCategories) {
    const res = await request({
      hostname: "localhost",
      port: 3000,
      path: "/api/verify-coupon",
      method: "POST",
      headers: { "Content-Type": "application/json" }
    }, {
      code: "VEGA999",
      category: c.cat
    });

    assert(res.status === 200, `verify-coupon returned 200 for ${c.cat}`);
    assert(res.data && res.data.valid === true, `Coupon VEGA999 is valid for ${c.cat}`);
    assert(res.data && res.data.originalAmount === c.original, `Original amount for ${c.cat} is ₹${c.original}`);
    assert(res.data && res.data.discountAmount === c.discount, `Discount amount for ${c.cat} is ₹${c.discount}`);
    assert(res.data && res.data.finalAmount === c.final, `Final discounted amount for ${c.cat} is ₹${c.final}`);
  }

  // TEST 3: FULL REGISTRATION PROCESS & DATABASE VERIFICATION
  console.log("\n--- 3. Testing Registration Database Insertion & Field Integrity ---");
  const testTshirtSize = "XL";
  const testDob = "1994-07-22";
  const testGender = "Female";
  const testBloodGroup = "O+";
  const testCategory = "10Km";
  const testName = `Audit Runner ${Date.now().toString().slice(-4)}`;
  const testEmail = `runner_${Date.now().toString().slice(-4)}@example.com`;
  const testWhatsapp = "9876543210";
  const mockPaymentId = `pay_test_${Date.now()}`;
  const mockOrderId = `order_test_${Date.now()}`;

  const regPayload = {
    name: testName,
    email: testEmail,
    whatsapp: testWhatsapp,
    tshirtSize: testTshirtSize,
    eventCategory: testCategory,
    dob: testDob,
    gender: testGender,
    bloodGroup: testBloodGroup,
    razorpay_payment_id: mockPaymentId,
    razorpay_order_id: mockOrderId,
    razorpay_signature: "mock_sig_valid"
  };

  const regRes = await request({
    hostname: "localhost",
    port: 3000,
    path: "/api/register",
    method: "POST",
    headers: { "Content-Type": "application/json" }
  }, regPayload);

  assert(regRes.status === 200, `register API returned 200`);
  assert(regRes.data && regRes.data.success === true, `register API returned success: true`);
  assert(regRes.data && regRes.data.runner && regRes.data.runner.name === testName, `Registration runner name returned correctly`);

  // Verify record in registrations.json
  const dbPath = path.join(process.cwd(), "registrations.json");
  const dbContent = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  const savedRecord = dbContent.find(r => r.email === testEmail);

  assert(!!savedRecord, `Record found in registrations.json for email ${testEmail}`);
  if (savedRecord) {
    assert(savedRecord.name === testName, `DB name '${savedRecord.name}' matches '${testName}'`);
    assert(savedRecord.email === testEmail, `DB email '${savedRecord.email}' matches '${testEmail}'`);
    assert(savedRecord.whatsapp === testWhatsapp, `DB whatsapp '${savedRecord.whatsapp}' matches '${testWhatsapp}'`);
    assert(savedRecord.tshirt_size === testTshirtSize, `DB tshirt_size '${savedRecord.tshirt_size}' matches requested '${testTshirtSize}'`);
    assert(savedRecord.event_category === testCategory, `DB event_category '${savedRecord.event_category}' matches '${testCategory}'`);
    assert(savedRecord.dob === testDob, `DB dob '${savedRecord.dob}' matches '${testDob}'`);
    assert(savedRecord.gender === testGender, `DB gender '${savedRecord.gender}' matches '${testGender}'`);
    assert(savedRecord.blood_group === testBloodGroup, `DB blood_group '${savedRecord.blood_group}' matches '${testBloodGroup}'`);
    assert(savedRecord.amount === 1099, `DB amount is ₹1099 (Standard 10K without early bird)`);
    assert(savedRecord.payment && savedRecord.payment.razorpay_payment_id === mockPaymentId, `DB payment.razorpay_payment_id matches`);
    assert(savedRecord.payment && savedRecord.payment.razorpay_order_id === mockOrderId, `DB payment.razorpay_order_id matches`);
  }

  // TEST 4: T-SHIRT SIZE IN CONFIRMATION EMAIL TEMPLATE
  console.log("\n--- 4. Testing Confirmation Email Template T-Shirt Size Alignment ---");
  const notificationsTsPath = path.join(process.cwd(), "src", "app", "lib", "notifications.ts");
  const notificationsSource = fs.readFileSync(notificationsTsPath, "utf-8");

  const tshirtPattern = /<td[^>]*>T-Shirt Size<\/td>[\s\S]*?\${data\.tshirtSize}/i;
  assert(tshirtPattern.test(notificationsSource), "Confirmation email template explicitly binds and renders '${data.tshirtSize}' in the T-Shirt Size row");
  
  // Also check registrationService.ts passes tshirtSize to sendRegistrationNotification
  const regServiceSource = fs.readFileSync(path.join(process.cwd(), "src", "app", "lib", "registrationService.ts"), "utf-8");
  assert(regServiceSource.includes("tshirtSize,") || regServiceSource.includes("tshirtSize: tshirtSize"), "registrationService.ts forwards tshirtSize into sendRegistrationNotification");
  assert(regServiceSource.includes("tshirt_size: tshirtSize"), "registrationService.ts writes tshirtSize to database column tshirt_size");

  console.log("\n==================================================");
  console.log(`TOTAL RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log("==================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error("Test suite runtime error:", err);
  process.exit(1);
});
