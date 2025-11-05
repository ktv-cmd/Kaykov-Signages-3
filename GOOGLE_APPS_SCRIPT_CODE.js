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
    
    // Save to Google Sheets FIRST
    let sheetSaved = false;
    let newRowNumber = null;
    try {
      const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
      const sheet = spreadsheet.getActiveSheet();
      log('Sheet opened successfully', 'success');
      
      // Get the last row number before adding
      const lastRow = sheet.getLastRow();
      
      // Append row to Google Sheets
      sheet.appendRow([
        new Date(),
        data.name || '',
        data.phone || '',
        data.email || '',
        data.serviceType || '',
        data.message || ''
      ]);
      
      newRowNumber = sheet.getLastRow();
      sheetSaved = true;
      log(`Data appended to sheet successfully at row ${newRowNumber}`, 'success');
      
      // Force spreadsheet to flush changes immediately
      SpreadsheetApp.flush();
      
    } catch (sheetError) {
      log(`ERROR with sheet: ${sheetError.toString()}`, 'error');
      log(`Sheet error stack: ${sheetError.stack}`, 'error');
      // Continue with email even if sheet fails
    }
    
    // Send email using the helper function
    // This will use the same function as the trigger, ensuring consistency
    let emailSent = false;
    let emailMethod = '';
    let emailError = null;
    
    // Prepare email data object
    const emailData = {
      timestamp: new Date(),
      name: data.name || '',
      phone: data.phone || '',
      email: data.email || '',
      serviceType: data.serviceType || '',
      message: data.message || '',
      rowNumber: newRowNumber
    };
    
    log(`Prepared email data: ${JSON.stringify(emailData)}`, 'info');
    
    try {
      log(`Attempting to send email to: ${NOTIFICATION_EMAIL}`, 'info');
      
      // Use the helper function that handles all email sending logic
      emailSent = sendEmailForNewLead(emailData);
      
      if (emailSent) {
        emailMethod = 'MailApp/GmailApp';
        log(`✅ Email sent successfully to: ${NOTIFICATION_EMAIL}`, 'success');
      } else {
        log(`❌ Email sending failed - check logs above`, 'error');
        emailError = new Error('Email sending failed - check trigger logs');
      }
    } catch (emailException) {
      emailError = emailException;
      log(`❌ Exception while sending email: ${emailException.toString()}`, 'error');
      log(`Exception stack: ${emailException.stack}`, 'error');
    }
    
    // If email failed in doPost, the trigger will try again when the row is added
    if (!emailSent && sheetSaved) {
      log(`⚠️ Email not sent in doPost, but sheet was saved. Trigger onSheetEdit will attempt to send email.`, 'warning');
    }
    
    // Calculate execution time
    const executionTime = new Date().getTime() - startTime;
    log(`Execution completed in ${executionTime}ms`, 'info');
    
    // Return response
    const response = {
      success: true,
      message: emailSent ? 'Data saved and email sent' : 'Data saved but email failed (trigger will retry)',
      emailSent: emailSent,
      emailMethod: emailMethod,
      sheetSaved: sheetSaved,
      rowNumber: newRowNumber,
      timestamp: new Date().toISOString(),
      executionTime: `${executionTime}ms`,
      logs: logEntries.slice(-10) // Last 10 log entries
    };
    
    if (!emailSent && emailError) {
      response.emailError = {
        message: emailError.toString(),
        name: emailError.name || 'Unknown',
        suggestion: sheetSaved ? 'Email will be sent automatically by trigger onSheetEdit when row is added' : 'Run testEmail() function to authorize email permissions'
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

/**
 * Trigger function: Automatically sends email when a new row is added to the sheet
 * This is a backup method in case doPost email fails
 * 
 * To set up this trigger:
 * 1. In Google Apps Script, go to Triggers (clock icon ⏰) on the left
 * 2. Click + Add Trigger in the bottom right
 * 3. Configure:
 *    - Function: onSheetEdit
 *    - Event source: From spreadsheet
 *    - Event type: On edit
 *    - Failure notification settings: Immediate
 * 4. Click Save
 */
function onSheetEdit(e) {
  const logEntries = [];
  
  function log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [${type.toUpperCase()}] ${message}`;
    logEntries.push(logEntry);
    Logger.log(logEntry);
  }
  
  try {
    log('=== onSheetEdit triggered ===', 'start');
    
    if (!e) {
      log('No event object provided', 'error');
      return;
    }
    
    const spreadsheet = e.source;
    const sheet = e.range.getSheet();
    const range = e.range;
    const row = range.getRow();
    const col = range.getColumn();
    
    // Get spreadsheet ID to verify it's the correct sheet
    const currentSheetId = spreadsheet.getId();
    log(`Spreadsheet ID: ${currentSheetId}, Target ID: ${SPREADSHEET_ID}`, 'info');
    
    // Only process if it's the correct spreadsheet
    if (currentSheetId !== SPREADSHEET_ID) {
      log(`Wrong spreadsheet (${currentSheetId}), skipping`, 'info');
      return;
    }
    
    const lastRow = sheet.getLastRow();
    const numColumns = sheet.getLastColumn();
    
    log(`Edit detected: Row ${row}, Column ${col}, Last row: ${lastRow}, Columns: ${numColumns}`, 'info');
    
    // Check if this is a new row being added (row is the last row and row > 1 to skip header)
    // Also check if we're editing the first few columns (A, B, C) which contain lead data
    if (row === lastRow && row > 1 && col <= 3) {
      log(`Potential new lead row detected: Row ${row}`, 'info');
      
      // Wait a bit to ensure data is fully written
      Utilities.sleep(500);
      
      // Get the full row data
      const rowData = sheet.getRange(row, 1, 1, Math.max(numColumns, 6)).getValues()[0];
      
      log(`Row data: ${JSON.stringify(rowData)}`, 'info');
      
      // Check if name (column B, index 1) and phone (column C, index 2) exist
      const name = rowData[1] ? String(rowData[1]).trim() : '';
      const phone = rowData[2] ? String(rowData[2]).trim() : '';
      
      log(`Extracted: Name="${name}", Phone="${phone}"`, 'info');
      
      // Validate that we have required fields
      if (name && phone && name.length > 0 && phone.length > 0) {
        log(`✅ Valid lead data found: Name=${name}, Phone=${phone}`, 'success');
        
        // Check if email was already sent for this row (using a simple approach: check if there's a timestamp in column A and it's recent)
        const timestamp = rowData[0];
        const isRecent = timestamp instanceof Date && (new Date() - timestamp) < 60000; // Within last minute
        
        if (isRecent || !timestamp) {
          log(`Row appears to be new (timestamp: ${timestamp}), proceeding with email`, 'info');
          
          // Prepare email data object
          const emailData = {
            timestamp: timestamp || new Date(),
            name: name,
            phone: phone,
            email: rowData[3] ? String(rowData[3]).trim() : '',
            serviceType: rowData[4] ? String(rowData[4]).trim() : '',
            message: rowData[5] ? String(rowData[5]).trim() : '',
            rowNumber: row
          };
          
          log(`Prepared email data: ${JSON.stringify(emailData)}`, 'info');
          
          // Send email notification
          const emailSent = sendEmailForNewLead(emailData);
          
          if (emailSent) {
            log(`✅ Email sent successfully for row ${row}`, 'success');
          } else {
            log(`❌ Failed to send email for row ${row}`, 'error');
          }
        } else {
          log(`Row ${row} appears to be old (timestamp: ${timestamp}), skipping email`, 'info');
        }
      } else {
        log(`Row ${row} doesn't have required fields: Name="${name}", Phone="${phone}"`, 'warning');
      }
    } else {
      log(`Edit is not a new lead row (row ${row} != last row ${lastRow} or column ${col} > 3), skipping`, 'info');
    }
    
  } catch (error) {
    log(`❌ FATAL ERROR in onSheetEdit: ${error.toString()}`, 'error');
    log(`Error name: ${error.name}`, 'error');
    log(`Error message: ${error.message}`, 'error');
    log(`Error stack: ${error.stack || 'No stack trace'}`, 'error');
  }
  
  // Log all entries at the end for easy debugging
  if (logEntries.length > 0) {
    Logger.log('--- onSheetEdit execution log ---');
    logEntries.forEach(entry => Logger.log(entry));
    Logger.log('--- End of log ---');
  }
}

/**
 * Helper function to send email for a new lead
 * This function is called both from doPost and from onSheetEdit trigger
 */
function sendEmailForNewLead(data) {
  const logEntries = [];
  
  function log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [${type.toUpperCase()}] ${message}`;
    logEntries.push(logEntry);
    Logger.log(logEntry);
  }
  
  try {
    log('=== sendEmailForNewLead called ===', 'start');
    log(`Data: ${JSON.stringify(data)}`, 'info');
    
    const subject = '🚨 New Lead - Call Request - ' + (data.name || 'Unknown');
    const timestamp = data.timestamp ? new Date(data.timestamp).toLocaleString('en-US', { 
      timeZone: 'America/New_York',
      dateStyle: 'full',
      timeStyle: 'long'
    }) : new Date().toLocaleString();
    
    const body = `
New lead has submitted a request:

Name: ${data.name || 'Not provided'}
Phone: ${data.phone || 'Not provided'}
Email: ${data.email || 'Not provided'}
Service Type: ${data.serviceType || 'Not specified'}
Message: ${data.message || 'No message provided'}

Timestamp: ${timestamp}
Row Number: ${data.rowNumber || 'N/A'}

Please call them back within 3 hours.
    `.trim();
    
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #E11D48; border-bottom: 2px solid #E11D48; padding-bottom: 10px;">
          🚨 New Lead - Call Request
        </h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Name:</strong> ${data.name || 'Not provided'}</p>
          <p><strong>Phone:</strong> <a href="tel:${data.phone || ''}" style="color: #E11D48; text-decoration: none;">${data.phone || 'Not provided'}</a></p>
          <p><strong>Email:</strong> ${data.email ? `<a href="mailto:${data.email}" style="color: #E11D48; text-decoration: none;">${data.email}</a>` : 'Not provided'}</p>
          <p><strong>Service Type:</strong> ${data.serviceType || 'Not specified'}</p>
          <p><strong>Message:</strong> ${data.message || 'No message provided'}</p>
        </div>
        <p style="color: #666; font-size: 12px;">
          <strong>Timestamp:</strong> ${timestamp}<br>
          <strong>Row Number:</strong> ${data.rowNumber || 'N/A'}
        </p>
        <div style="background-color: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin-top: 20px;">
          <strong>⚠️ Action Required:</strong> Please call them back within 3 hours.
        </div>
        <div style="margin-top: 20px; padding: 15px; background-color: #e7f3ff; border-radius: 5px;">
          <a href="https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit" 
             style="background-color: #E11D48; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
            📊 Open Google Sheet
          </a>
        </div>
      </div>
    `;
    
    // Try MailApp first
    try {
      log(`Attempting to send email using MailApp to: ${NOTIFICATION_EMAIL}`, 'info');
      
      MailApp.sendEmail({
        to: NOTIFICATION_EMAIL,
        subject: subject,
        body: body,
        htmlBody: htmlBody,
        replyTo: data.email || NOTIFICATION_EMAIL
      });
      
      log(`✅ Email sent successfully using MailApp to: ${NOTIFICATION_EMAIL}`, 'success');
      return true;
      
    } catch (mailError) {
      log(`❌ MailApp failed: ${mailError.toString()}`, 'error');
      log(`MailApp error name: ${mailError.name}`, 'error');
      log(`MailApp error message: ${mailError.message}`, 'error');
      
      // Check if it's a permission error
      if (mailError.toString().includes('permission') || mailError.toString().includes('authorization') || mailError.toString().includes('Access denied')) {
        log(`⚠️ PERMISSION ERROR: Run testEmail() function first to authorize email sending!`, 'error');
      }
      
      // Try GmailApp
      try {
        log('Trying alternative method using GmailApp...', 'info');
        
        GmailApp.sendEmail(
          NOTIFICATION_EMAIL,
          subject,
          body,
          {
            htmlBody: htmlBody,
            replyTo: data.email || NOTIFICATION_EMAIL
          }
        );
        
        log(`✅ Email sent successfully using GmailApp to: ${NOTIFICATION_EMAIL}`, 'success');
        return true;
        
      } catch (gmailError) {
        log(`❌ GmailApp also failed: ${gmailError.toString()}`, 'error');
        log(`GmailApp error name: ${gmailError.name}`, 'error');
        log(`GmailApp error message: ${gmailError.message}`, 'error');
        
        // Try creating a draft as last resort
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
          return false;
        } catch (draftError) {
          log(`❌ Could not create draft: ${draftError.toString()}`, 'error');
          return false;
        }
      }
    }
    
  } catch (error) {
    log(`❌ ERROR in sendEmailForNewLead: ${error.toString()}`, 'error');
    log(`Error name: ${error.name}`, 'error');
    log(`Error message: ${error.message}`, 'error');
    log(`Error stack: ${error.stack || 'No stack trace'}`, 'error');
    return false;
  }
}
