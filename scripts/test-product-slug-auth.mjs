#!/usr/bin/env node
/**
 * Test script to verify product slug authentication
 * Tests both UUID-based and slug-based product identification
 */

import crypto from 'crypto';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const API_PATH = '/api/v1/ppn/events/signup';

// Test configuration
const PRODUCT_ID = process.env.PRODUCT_ID || '00000000-0000-0000-0000-000000000001';
const PRODUCT_SLUG = process.env.PRODUCT_SLUG || 'procafeai';
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'test-secret-key';

/**
 * Generate headers for PPN event
 */
function generateHeaders(productIdentifier, webhookSecret, body, useSlug = false) {
  const timestamp = Math.floor(Date.now() / 1000);
  const eventId = crypto.randomUUID();
  const rawBody = JSON.stringify(body);
  
  const signingString = `v1.${timestamp}.${eventId}.${rawBody}`;
  const signature = 'v1=' + crypto
    .createHmac('sha256', webhookSecret)
    .update(signingString)
    .digest('hex');
  
  const headers = {
    'Content-Type': 'application/json',
    'X-PPN-Timestamp': String(timestamp),
    'X-PPN-Event-Id': eventId,
    'X-PPN-Signature': signature,
    'Idempotency-Key': eventId,
  };

  if (useSlug) {
    headers['X-PPN-Product-Slug'] = productIdentifier;
  } else {
    headers['X-PPN-Product-Id'] = productIdentifier;
  }
  
  return { headers, rawBody };
}

/**
 * Send test event
 */
async function sendEvent(headers, body) {
  const url = `${BASE_URL}${API_PATH}`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
    });
    
    const data = await response.json();
    return {
      status: response.status,
      data,
      ok: response.ok,
    };
  } catch (error) {
    return {
      status: 0,
      error: error.message,
      ok: false,
    };
  }
}

/**
 * Test cases
 */
async function runTests() {
  console.log('🧪 Testing Product Slug Authentication\n');
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Product ID: ${PRODUCT_ID}`);
  console.log(`Product Slug: ${PRODUCT_SLUG}\n`);

  const testBody = {
    external_customer_id: 'test-customer-' + Date.now(),
    occurred_at: new Date().toISOString(),
    ppn_ref: 'TEST123',
  };

  let passed = 0;
  let failed = 0;

  // Test 1: Product ID (existing method)
  console.log('Test 1: Product identification by ID (UUID)');
  {
    const { headers, rawBody } = generateHeaders(PRODUCT_ID, WEBHOOK_SECRET, testBody, false);
    const result = await sendEvent(headers, rawBody);
    
    if (result.status === 200 && result.data.ok) {
      console.log('✅ PASS - Product authenticated with UUID\n');
      passed++;
    } else {
      console.log(`❌ FAIL - Status: ${result.status}, Response:`, result.data, '\n');
      failed++;
    }
  }

  // Test 2: Product Slug via header
  console.log('Test 2: Product identification by slug (X-PPN-Product-Slug header)');
  {
    const { headers, rawBody } = generateHeaders(PRODUCT_SLUG, WEBHOOK_SECRET, testBody, true);
    const result = await sendEvent(headers, rawBody);
    
    if (result.status === 200 && result.data.ok) {
      console.log('✅ PASS - Product authenticated with slug header\n');
      passed++;
    } else {
      console.log(`❌ FAIL - Status: ${result.status}, Response:`, result.data, '\n');
      failed++;
    }
  }

  // Test 3: Product Slug via body (no headers)
  console.log('Test 3: Product identification by slug (body.product_slug)');
  {
    const bodyWithSlug = { ...testBody, product_slug: PRODUCT_SLUG };
    const timestamp = Math.floor(Date.now() / 1000);
    const eventId = crypto.randomUUID();
    const rawBody = JSON.stringify(bodyWithSlug);
    
    const signingString = `v1.${timestamp}.${eventId}.${rawBody}`;
    const signature = 'v1=' + crypto
      .createHmac('sha256', WEBHOOK_SECRET)
      .update(signingString)
      .digest('hex');
    
    const headers = {
      'Content-Type': 'application/json',
      'X-PPN-Timestamp': String(timestamp),
      'X-PPN-Event-Id': eventId,
      'X-PPN-Signature': signature,
      'Idempotency-Key': eventId,
    };
    
    const result = await sendEvent(headers, rawBody);
    
    if (result.status === 200 && result.data.ok) {
      console.log('✅ PASS - Product authenticated with body slug\n');
      passed++;
    } else {
      console.log(`❌ FAIL - Status: ${result.status}, Response:`, result.data, '\n');
      failed++;
    }
  }

  // Test 4: Invalid product slug (should return 404 PRODUCT_NOT_FOUND)
  console.log('Test 4: Invalid product slug (should return 404 PRODUCT_NOT_FOUND)');
  {
    const { headers, rawBody } = generateHeaders('invalid-slug', WEBHOOK_SECRET, testBody, true);
    const result = await sendEvent(headers, rawBody);
    
    if (result.status === 404 && result.data.error?.code === 'PRODUCT_NOT_FOUND') {
      console.log('✅ PASS - Correct error code for invalid product\n');
      passed++;
    } else {
      console.log(`❌ FAIL - Expected 404 PRODUCT_NOT_FOUND, got ${result.status}:`, result.data, '\n');
      failed++;
    }
  }

  // Test 5: Valid product but invalid signature (should return 401 INVALID_SIGNATURE)
  console.log('Test 5: Valid product with invalid signature (should return 401 INVALID_SIGNATURE)');
  {
    const { headers, rawBody } = generateHeaders(PRODUCT_SLUG, 'wrong-secret', testBody, true);
    const result = await sendEvent(headers, rawBody);
    
    if (result.status === 401 && result.data.error?.code === 'INVALID_SIGNATURE') {
      console.log('✅ PASS - Correct error code for invalid signature\n');
      passed++;
    } else {
      console.log(`❌ FAIL - Expected 401 INVALID_SIGNATURE, got ${result.status}:`, result.data, '\n');
      failed++;
    }
  }

  // Test 6: Priority - Product ID should win over slug
  console.log('Test 6: Priority test - ID should win over slug header');
  {
    const timestamp = Math.floor(Date.now() / 1000);
    const eventId = crypto.randomUUID();
    const rawBody = JSON.stringify(testBody);
    
    const signingString = `v1.${timestamp}.${eventId}.${rawBody}`;
    const signature = 'v1=' + crypto
      .createHmac('sha256', WEBHOOK_SECRET)
      .update(signingString)
      .digest('hex');
    
    const headers = {
      'Content-Type': 'application/json',
      'X-PPN-Product-Id': PRODUCT_ID,
      'X-PPN-Product-Slug': 'different-slug',  // This should be ignored
      'X-PPN-Timestamp': String(timestamp),
      'X-PPN-Event-Id': eventId,
      'X-PPN-Signature': signature,
      'Idempotency-Key': eventId,
    };
    
    const result = await sendEvent(headers, rawBody);
    
    if (result.status === 200 && result.data.ok) {
      console.log('✅ PASS - Product ID takes priority over slug\n');
      passed++;
    } else {
      console.log(`❌ FAIL - Status: ${result.status}, Response:`, result.data, '\n');
      failed++;
    }
  }

  // Test 7: Missing product identifier
  console.log('Test 7: Missing product identifier (should return 401 with appropriate error)');
  {
    const timestamp = Math.floor(Date.now() / 1000);
    const eventId = crypto.randomUUID();
    const rawBody = JSON.stringify(testBody);
    
    const headers = {
      'Content-Type': 'application/json',
      'X-PPN-Timestamp': String(timestamp),
      'X-PPN-Event-Id': eventId,
      'X-PPN-Signature': 'v1=dummy',
      'Idempotency-Key': eventId,
    };
    
    const result = await sendEvent(headers, rawBody);
    
    if (result.status === 401 && result.data.error?.code === 'MISSING_PRODUCT_IDENTIFIER') {
      console.log('✅ PASS - Correct error for missing product identifier\n');
      passed++;
    } else {
      console.log(`❌ FAIL - Expected 401 MISSING_PRODUCT_IDENTIFIER, got ${result.status}:`, result.data, '\n');
      failed++;
    }
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log(`Test Results: ${passed} passed, ${failed} failed`);
  console.log('='.repeat(50));

  return failed === 0;
}

// Run tests
runTests()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('Test suite error:', error);
    process.exit(1);
  });
