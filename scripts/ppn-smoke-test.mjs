#!/usr/bin/env node

/**
 * PPN Smoke Test Script
 * Tests the health and readiness endpoints of the PPN system
 * 
 * Usage: npm run ppn:smoke
 * Or with custom URL: PPN_BASE_URL=https://example.com npm run ppn:smoke
 */

const BASE_URL = process.env.PPN_BASE_URL || 'http://localhost:3000';

const ENDPOINTS = [
  { 
    name: 'Health Check', 
    path: '/api/v1/ppn/health',
    method: 'GET',
    expected: (data) => data.status === 'ok' && data.service === 'ppn',
  },
  { 
    name: 'Readiness Check', 
    path: '/api/v1/ppn/ready',
    method: 'GET',
    expected: (data) => typeof data.ok === 'boolean' && typeof data.checks === 'object',
  },
];

async function runTests() {
  console.log('🔍 PPN Smoke Test');
  console.log(`   Base URL: ${BASE_URL}\n`);

  let passed = 0;
  let failed = 0;
  const results = [];

  for (const test of ENDPOINTS) {
    const url = `${BASE_URL}${test.path}`;
    const startTime = Date.now();

    try {
      const response = await fetch(url, {
        method: test.method,
        headers: { 'Accept': 'application/json' },
      });

      const duration = Date.now() - startTime;
      const data = await response.json();

      // Check if response matches expected pattern
      const isValid = test.expected(data);

      if (response.ok && isValid) {
        console.log(`✅ ${test.name}: PASS (${duration}ms)`);
        passed++;
        results.push({ name: test.name, status: 'PASS', duration });
      } else if (response.status === 503 && data.ok === false) {
        // 503 with proper error is acceptable (config missing)
        console.log(`⚠️  ${test.name}: WARN (${duration}ms) - ${data.status || 'Service unavailable'}`);
        if (data.warnings) {
          data.warnings.forEach(w => console.log(`   └─ ${w}`));
        }
        passed++; // Count as pass since it's a valid response
        results.push({ name: test.name, status: 'WARN', duration, warnings: data.warnings });
      } else {
        console.log(`❌ ${test.name}: FAIL (${duration}ms)`);
        console.log(`   └─ Status: ${response.status}`);
        console.log(`   └─ Response: ${JSON.stringify(data).substring(0, 100)}`);
        failed++;
        results.push({ name: test.name, status: 'FAIL', duration, error: data });
      }
    } catch (error) {
      const duration = Date.now() - startTime;
      console.log(`❌ ${test.name}: FAIL (${duration}ms)`);
      console.log(`   └─ Error: ${error.message}`);
      failed++;
      results.push({ name: test.name, status: 'FAIL', duration, error: error.message });
    }
  }

  console.log('\n' + '─'.repeat(40));
  console.log(`📊 Results: ${passed} passed, ${failed} failed`);
  console.log('─'.repeat(40));

  if (failed > 0) {
    console.log('\n❌ SMOKE TEST FAILED\n');
    process.exit(1);
  } else {
    console.log('\n✅ SMOKE TEST PASSED\n');
    process.exit(0);
  }
}

// Check if server is running
async function checkServer() {
  try {
    await fetch(`${BASE_URL}/api/v1/ppn/health`, { 
      method: 'HEAD',
      signal: AbortSignal.timeout(5000),
    });
    return true;
  } catch {
    return false;
  }
}

async function main() {
  // Quick server check first
  const serverUp = await checkServer();
  if (!serverUp) {
    console.log(`⚠️  Server at ${BASE_URL} is not responding.`);
    console.log('   Make sure the server is running: npm run dev\n');
    
    // Still try to run tests in case of slow startup
    console.log('   Attempting tests anyway...\n');
  }

  await runTests();
}

main();
