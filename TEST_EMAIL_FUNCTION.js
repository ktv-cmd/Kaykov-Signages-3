/**
 * Test Email Function for Google Apps Script
 * 
 * Instructions:
 * 1. Copy this function into your Google Apps Script editor
 * 2. Select the function "testEmail" from the dropdown
 * 3. Click the Run button (▶️)
 * 4. Google will ask for permissions - click "Review Permissions"
 * 5. Choose your account and click "Advanced" → "Go to [Project Name] (unsafe)"
 * 6. Click "Allow"
 * 7. After authorization, the test email will be sent
 */

// This function is now included in GOOGLE_APPS_SCRIPT_CODE.js
// Use the testEmail() function from that file instead
function testEmail() {
  try {
    const NOTIFICATION_EMAIL = 'ktv@kaykovmedia.com';
    Logger.log('Testing email send to: ' + NOTIFICATION_EMAIL);
    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      subject: 'Test Email from Google Apps Script',
      body: 'This is a test email to verify that email sending is working correctly.',
      htmlBody: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #E11D48;">Test Email</h2>
          <p>This is a test email to verify that email sending is working correctly.</p>
          <p>If you received this email, the email functionality is working!</p>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            Sent at: ${new Date().toLocaleString('en-US', { 
              timeZone: 'America/New_York',
              dateStyle: 'full',
              timeStyle: 'long'
            })}
          </p>
        </div>
      `
    });
    
    Logger.log('Test email sent successfully!');
    return 'Test email sent successfully! Check your inbox at ' + NOTIFICATION_EMAIL;
  } catch (error) {
    Logger.log('ERROR sending test email: ' + error.toString());
    Logger.log('Error details: ' + JSON.stringify(error));
    return 'Error: ' + error.toString();
  }
}

