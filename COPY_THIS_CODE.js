/**
 * ============================================================
 * ИСПРАВЛЕННЫЙ КОД ДЛЯ GOOGLE APPS SCRIPT
 * ============================================================
 * 
 * ИНСТРУКЦИЯ:
 * 1. Откройте https://script.google.com
 * 2. Найдите или создайте проект
 * 3. УДАЛИТЕ весь старый код
 * 4. СКОПИРУЙТЕ ВЕСЬ код ниже (от начала до конца)
 * 5. ВСТАВЬТЕ в редактор Google Apps Script
 * 6. Сохраните (Ctrl+S или Cmd+S)
 * 7. Запустите функцию testEmail() для авторизации
 * 8. Переразверните Web App (Deploy → Manage deployments)
 * 
 * ИСПРАВЛЕНИЯ:
 * ✅ Добавлена проверка на null/undefined для объекта события
 * ✅ Улучшена обработка ошибок
 * ✅ Добавлены несколько способов отправки email
 * ============================================================
 */

// Replace with your Google Sheet ID
const SPREADSHEET_ID = '1OPGRV7LVeiuOxsS5Qs4ZQSlOar5l42uZp3znm7ynWgY';

// Email recipient for lead notifications
const NOTIFICATION_EMAIL = 'ktv@kaykovmedia.com';

// Enable Gmail API (optional, for better email delivery)
function onOpen() {
  // This enables Gmail API if available
  try {
    GmailApp.getInboxThreads(0, 1);
    Logger.log('Gmail API is available');
  } catch (e) {
    Logger.log('Gmail API not available, using MailApp');
  }
}

// Test function to verify script is accessible
function doGet(e) {
  try {
    const response = {
      status: 'ok',
      message: 'Google Apps Script is working!',
      timestamp: new Date().toISOString(),
      sheetId: SPREADSHEET_ID,
      email: NOTIFICATION_EMAIL,
      functions: {
        doPost: 'Available',
        testEmail: 'Available',
        testDoPost: 'Available'
      }
    };
    
    return ContentService.createTextOutput(JSON.stringify(response, null, 2))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Main function to handle form submissions
function doPost(e) {
  const startTime = new Date().getTime();
  const logEntries = [];
  
  function log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [${type.toUpperCase()}] ${message}`;
    logEntries.push(logEntry);
    Logger.log(logEntry);
  }
  
  try {
    log('=== doPost called ===', 'start');
    
    // Check if event object exists
    if (!e) {
      throw new Error('Event object is null or undefined');
    }
    
    log(`Event object keys: ${JSON.stringify(Object.keys(e || {}))}`, 'debug');
    
    // Parse incoming data
    let data = null;
    
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
        log(`Data parsed successfully: ${JSON.stringify(data)}`, 'success');
      } catch (parseError) {
        log(`ERROR parsing JSON: ${parseError.toString()}`, 'error');
        log(`Raw contents: ${e.postData.contents}`, 'debug');
        
        // Try to parse as URL-encoded form data
        if (e.parameter) {
          data = e.parameter;
          log(`Using parameter data instead: ${JSON.stringify(data)}`, 'info');
        } else {
          throw new Error(`Could not parse data: ${parseError.toString()}`);
        }
      }
    } else if (e.parameter) {
      data = e.parameter;
      log(`Using parameter data: ${JSON.stringify(data)}`, 'info');
    } else {
      throw new Error('No postData.contents or parameter found in request');
    }
    
    // Validate required fields
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data format');
    }
    
    if (!data.name || !data.phone) {
      throw new Error('Missing required fields: name or phone');
    }
    
    log('Data validation passed', 'success');
    
    // Save to Google Sheets
    let sheetSaved = false;
    try {
      const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
      const sheet = spreadsheet.getActiveSheet();
      log('Sheet opened successfully', 'success');
      
      // Append row to Google Sheets
      sheet.appendRow([
        new Date(),
        data.name || '',
        data.phone || '',
        data.email || '',
        data.serviceType || '',
        data.message || ''
      ]);
      
      sheetSaved = true;
      log('Data appended to sheet successfully', 'success');
    } catch (sheetError) {
      log(`ERROR with sheet: ${sheetError.toString()}`, 'error');
      log(`Sheet error stack: ${sheetError.stack}`, 'error');
      // Continue with email even if sheet fails
    }
    
    // Prepare email content
    const subject = 'New Lead - Call Request';
    const timestamp = new Date().toLocaleString('en-US', { 
      timeZone: 'America/New_York',
      dateStyle: 'full',
      timeStyle: 'long'
    });
    
    const body = `
New lead has submitted a request:

Name: ${data.name || 'Not provided'}
Phone: ${data.phone || 'Not provided'}
Email: ${data.email || 'Not provided'}
Service Type: ${data.serviceType || 'Not specified'}
Message: ${data.message || 'No message provided'}

Timestamp: ${timestamp}

Please call them back within 3 hours.
    `.trim();
    
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #E11D48; border-bottom: 2px solid #E11D48; padding-bottom: 10px;">
          New Lead - Call Request
        </h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Name:</strong> ${data.name || 'Not provided'}</p>
          <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
          <p><strong>Email:</strong> ${data.email || 'Not provided'}</p>
          <p><strong>Service Type:</strong> ${data.serviceType || 'Not specified'}</p>
          <p><strong>Message:</strong> ${data.message || 'No message provided'}</p>
        </div>
        <p style="color: #666; font-size: 12px;">
          <strong>Timestamp:</strong> ${timestamp}
        </p>
        <p style="background-color: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin-top: 20px;">
          <strong>⚠️ Action Required:</strong> Please call them back within 3 hours.
        </p>
      </div>
    `;
    
    // Try multiple email sending methods
    let emailSent = false;
    let emailMethod = '';
    let emailError = null;
    
    // Method 1: Try MailApp (primary method)
    if (!emailSent) {
      try {
        log(`Attempting to send email using MailApp to: ${NOTIFICATION_EMAIL}`, 'info');
        MailApp.sendEmail({
          to: NOTIFICATION_EMAIL,
          subject: subject,
          body: body,
          htmlBody: htmlBody
        });
        emailSent = true;
        emailMethod = 'MailApp';
        log(`✅ Email sent successfully using MailApp to: ${NOTIFICATION_EMAIL}`, 'success');
      } catch (mailError) {
        emailError = mailError;
        log(`❌ MailApp failed: ${mailError.toString()}`, 'error');
        log(`MailApp error name: ${mailError.name}`, 'error');
        log(`MailApp error message: ${mailError.message}`, 'error');
      }
    }
    
    // Method 2: Try GmailApp (fallback)
    if (!emailSent) {
      try {
        log('Trying alternative method using GmailApp...', 'info');
        GmailApp.sendEmail(
          NOTIFICATION_EMAIL,
          subject,
          body,
          {
            htmlBody: htmlBody
          }
        );
        emailSent = true;
        emailMethod = 'GmailApp';
        log(`✅ Email sent successfully using GmailApp to: ${NOTIFICATION_EMAIL}`, 'success');
      } catch (gmailError) {
        log(`❌ GmailApp also failed: ${gmailError.toString()}`, 'error');
        log(`GmailApp error name: ${gmailError.name}`, 'error');
        log(`GmailApp error message: ${gmailError.message}`, 'error');
        if (!emailError) {
          emailError = gmailError;
        }
      }
    }
    
    // Method 3: Try creating a draft as last resort (for manual sending)
    if (!emailSent) {
      try {
        log('Creating draft email as last resort...', 'info');
        GmailApp.createDraft(
          NOTIFICATION_EMAIL,
          subject,
          body,
          {
            htmlBody: htmlBody
          }
        );
        log('⚠️ Draft email created (manual sending required)', 'warning');
      } catch (draftError) {
        log(`❌ Could not create draft: ${draftError.toString()}`, 'error');
      }
    }
    
    // Calculate execution time
    const executionTime = new Date().getTime() - startTime;
    log(`Execution completed in ${executionTime}ms`, 'info');
    
    // Return response
    const response = {
      success: true,
      message: emailSent ? 'Data saved and email sent' : 'Data saved but email failed',
      emailSent: emailSent,
      emailMethod: emailMethod,
      sheetSaved: sheetSaved,
      timestamp: new Date().toISOString(),
      executionTime: `${executionTime}ms`,
      logs: logEntries.slice(-10) // Last 10 log entries
    };
    
    if (!emailSent && emailError) {
      response.emailError = {
        message: emailError.toString(),
        name: emailError.name || 'Unknown'
      };
    }
    
    return ContentService.createTextOutput(JSON.stringify(response, null, 2))
      .setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    log(`❌ FATAL ERROR in doPost: ${error.toString()}`, 'error');
    log(`Error name: ${error.name}`, 'error');
    log(`Error message: ${error.message}`, 'error');
    log(`Error stack: ${error.stack || 'No stack trace'}`, 'error');
    
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString(),
      message: error.message,
      timestamp: new Date().toISOString(),
      logs: logEntries.slice(-10)
    }, null, 2)).setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function for email sending (RUN THIS FIRST!)
function testEmail() {
  const logEntries = [];
  
  function log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [${type.toUpperCase()}] ${message}`;
    logEntries.push(logEntry);
    Logger.log(logEntry);
  }
  
  try {
    log('=== Testing email send ===', 'start');
    log(`Email address: ${NOTIFICATION_EMAIL}`, 'info');
    log(`Sheet ID: ${SPREADSHEET_ID}`, 'info');
    
    const testSubject = `Test Email from Google Apps Script - ${new Date().toISOString()}`;
    const testBody = 'This is a test email to verify that email sending is working correctly.';
    const testHtmlBody = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #E11D48;">✅ Test Email</h2>
        <p>This is a test email to verify that email sending is working correctly.</p>
        <p><strong>If you received this email, the email functionality is working!</strong></p>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">
          Sent at: ${new Date().toLocaleString('en-US', { 
            timeZone: 'America/New_York',
            dateStyle: 'full',
            timeStyle: 'long'
          })}
        </p>
        <p style="background-color: #e7f3ff; padding: 10px; border-left: 4px solid #2196F3; margin-top: 20px;">
          <strong>Next steps:</strong> After confirming this email works, the doPost function will automatically send emails for form submissions.
        </p>
      </div>
    `;
    
    log('Attempting to send test email using MailApp...', 'info');
    
    try {
      MailApp.sendEmail({
        to: NOTIFICATION_EMAIL,
        subject: testSubject,
        body: testBody,
        htmlBody: testHtmlBody
      });
      
      log('✅ Test email sent successfully using MailApp!', 'success');
      log(`Check your inbox at: ${NOTIFICATION_EMAIL}`, 'info');
      
      return {
        success: true,
        message: `Test email sent successfully! Check your inbox at ${NOTIFICATION_EMAIL}`,
        logs: logEntries
      };
      
    } catch (mailError) {
      log(`❌ MailApp failed: ${mailError.toString()}`, 'error');
      log(`Trying GmailApp...`, 'info');
      
      try {
        GmailApp.sendEmail(
          NOTIFICATION_EMAIL,
          testSubject,
          testBody,
          {
            htmlBody: testHtmlBody
          }
        );
        
        log('✅ Test email sent successfully using GmailApp!', 'success');
        
        return {
          success: true,
          message: `Test email sent successfully using GmailApp! Check your inbox at ${NOTIFICATION_EMAIL}`,
          method: 'GmailApp',
          logs: logEntries
        };
        
      } catch (gmailError) {
        log(`❌ GmailApp also failed: ${gmailError.toString()}`, 'error');
        throw gmailError;
      }
    }
    
  } catch (error) {
    log(`❌ ERROR sending test email: ${error.toString()}`, 'error');
    log(`Error name: ${error.name}`, 'error');
    log(`Error message: ${error.message}`, 'error');
    log(`Error stack: ${error.stack || 'No stack trace'}`, 'error');
    
    return {
      success: false,
      error: error.toString(),
      message: `Error: ${error.toString()} - ${error.message}`,
      logs: logEntries
    };
  }
}

// Test function for doPost (optional)
function testDoPost() {
  const testData = {
    name: 'Test User',
    phone: '+1(718) 478-4200',
    email: 'test@example.com',
    serviceType: '3D Signs',
    message: 'This is a test message from testDoPost function'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  Logger.log('Testing doPost with mock data...');
  Logger.log(`Test data: ${JSON.stringify(testData, null, 2)}`);
  
  const result = doPost(mockEvent);
  const resultContent = result.getContent();
  
  Logger.log('Test result:');
  Logger.log(resultContent);
  
  return resultContent;
}
