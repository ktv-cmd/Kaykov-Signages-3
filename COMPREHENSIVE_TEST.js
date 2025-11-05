/**
 * Comprehensive Test Script for Google Apps Script
 * 
 * Copy this into Google Apps Script editor and run to test everything
 * 
 * Instructions:
 * 1. Open https://script.google.com
 * 2. Open your project
 * 3. Copy ALL functions below
 * 4. Paste them into the editor
 * 5. Select "runAllTests" from dropdown
 * 6. Click Run
 * 7. Check the logs for results
 */

function runAllTests() {
  Logger.log('========================================');
  Logger.log('COMPREHENSIVE TEST SUITE STARTED');
  Logger.log('========================================');
  Logger.log('');
  
  const results = {
    sheetAccess: false,
    emailTest: false,
    doPostTest: false,
    errors: []
  };
  
  // Test 1: Check Sheet Access
  Logger.log('TEST 1: Checking Google Sheets access...');
  try {
    const SPREADSHEET_ID = '1OPGRV7LVeiuOxsS5Qs4ZQSlOar5l42uZp3znm7ynWgY';
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    Logger.log('✅ Sheet access: SUCCESS');
    results.sheetAccess = true;
  } catch (error) {
    Logger.log('❌ Sheet access: FAILED - ' + error.toString());
    results.errors.push('Sheet access: ' + error.toString());
  }
  Logger.log('');
  
  // Test 2: Test Email Sending
  Logger.log('TEST 2: Testing email sending...');
  try {
    const emailResult = testEmail();
    if (emailResult && emailResult.success) {
      Logger.log('✅ Email test: SUCCESS');
      results.emailTest = true;
    } else {
      Logger.log('❌ Email test: FAILED');
      results.errors.push('Email test: ' + (emailResult?.message || 'Unknown error'));
    }
  } catch (error) {
    Logger.log('❌ Email test: FAILED - ' + error.toString());
    results.errors.push('Email test: ' + error.toString());
  }
  Logger.log('');
  
  // Test 3: Test doPost function
  Logger.log('TEST 3: Testing doPost function...');
  try {
    const testData = {
      name: 'Test User',
      phone: '+17184784200',
      email: 'test@example.com',
      serviceType: '3D Signs',
      message: 'Test message from comprehensive test'
    };
    
    const mockEvent = {
      postData: {
        contents: JSON.stringify(testData)
      }
    };
    
    const result = doPost(mockEvent);
    const resultContent = result.getContent();
    const resultJson = JSON.parse(resultContent);
    
    if (resultJson.success) {
      Logger.log('✅ doPost test: SUCCESS');
      Logger.log('Response: ' + JSON.stringify(resultJson, null, 2));
      results.doPostTest = true;
      
      if (resultJson.emailSent) {
        Logger.log('✅ Email was sent successfully!');
      } else {
        Logger.log('⚠️ Email was not sent, but data was saved');
        results.errors.push('Email not sent in doPost test');
      }
    } else {
      Logger.log('❌ doPost test: FAILED');
      Logger.log('Error: ' + resultJson.error);
      results.errors.push('doPost: ' + resultJson.error);
    }
  } catch (error) {
    Logger.log('❌ doPost test: FAILED - ' + error.toString());
    results.errors.push('doPost test: ' + error.toString());
  }
  Logger.log('');
  
  // Summary
  Logger.log('========================================');
  Logger.log('TEST SUMMARY');
  Logger.log('========================================');
  Logger.log('Sheet Access: ' + (results.sheetAccess ? '✅ PASS' : '❌ FAIL'));
  Logger.log('Email Test: ' + (results.emailTest ? '✅ PASS' : '❌ FAIL'));
  Logger.log('doPost Test: ' + (results.doPostTest ? '✅ PASS' : '❌ FAIL'));
  Logger.log('');
  
  if (results.errors.length > 0) {
    Logger.log('ERRORS FOUND:');
    results.errors.forEach((error, index) => {
      Logger.log((index + 1) + '. ' + error);
    });
  } else {
    Logger.log('✅ ALL TESTS PASSED!');
  }
  
  Logger.log('');
  Logger.log('========================================');
  Logger.log('Check your email: ktv@kaykovmedia.com');
  Logger.log('Check Google Sheets for test data');
  Logger.log('========================================');
  
  return results;
}

// Quick test - just check if functions exist
function quickTest() {
  Logger.log('Quick Test: Checking if functions exist...');
  
  try {
    if (typeof doGet !== 'undefined') {
      Logger.log('✅ doGet function exists');
    } else {
      Logger.log('❌ doGet function NOT FOUND');
    }
  } catch (e) {
    Logger.log('❌ Error checking doGet: ' + e.toString());
  }
  
  try {
    if (typeof doPost !== 'undefined') {
      Logger.log('✅ doPost function exists');
    } else {
      Logger.log('❌ doPost function NOT FOUND');
    }
  } catch (e) {
    Logger.log('❌ Error checking doPost: ' + e.toString());
  }
  
  try {
    if (typeof testEmail !== 'undefined') {
      Logger.log('✅ testEmail function exists');
    } else {
      Logger.log('❌ testEmail function NOT FOUND');
    }
  } catch (e) {
    Logger.log('❌ Error checking testEmail: ' + e.toString());
  }
}



