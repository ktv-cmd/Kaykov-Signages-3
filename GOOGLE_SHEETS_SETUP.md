# Google Sheets Integration Setup Guide

To automatically save callback requests to your Google Sheet, follow these steps:

## Step 1: Create Google Apps Script

1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1OPGRV7LVeiuOxsS5Qs4ZQSlOar5l42uZp3znm7ynWgY/edit
2. Go to **Extensions** → **Apps Script**
3. Delete any existing code and paste this:

```javascript
// Replace with your Google Sheet ID
const SPREADSHEET_ID = '1OPGRV7LVeiuOxsS5Qs4ZQSlOar5l42uZp3znm7ynWgY';

// Email recipient for lead notifications
const NOTIFICATION_EMAIL = 'ktv@kaykovmedia.com';

function doPost(e) {
  try {
    // Parse incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Open the spreadsheet and get the active sheet
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    
    // Append row to Google Sheets
    sheet.appendRow([
      new Date(),
      data.name || '',
      data.phone || '',
      data.email || '',
      data.serviceType || '',
      data.message || ''
    ]);
    
    // Send email notification
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
    
    // HTML version for better formatting
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
    
    // Send email with both plain text and HTML versions
    try {
      MailApp.sendEmail({
        to: NOTIFICATION_EMAIL,
        subject: subject,
        body: body,
        htmlBody: htmlBody
      });
      console.log('Email sent successfully to:', NOTIFICATION_EMAIL);
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Continue even if email fails - data is still saved to sheet
    }
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Data saved and email sent'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Log error and return error response
    console.error('Error in doPost:', error);
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Step 2: Set up Column Headers in Google Sheet

Make sure your Google Sheet has these headers in Row 1:
- Column A: Timestamp
- Column B: Name
- Column C: Phone
- Column D: Email
- Column E: Service Type
- Column F: Message

## Step 3: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type" and choose **Web app**
3. Set:
   - **Description**: "Callback Request Handler"
   - **Execute as**: **Me**
   - **Who has access**: **Anyone** (important!)
4. Click **Deploy**
5. Copy the **Web app URL** - you'll need this!

## Step 4: Update Your Code

Update `src/lib/googleSheets.ts` and replace:
```typescript
const SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";
```

With your actual web app URL from Step 3.

## Step 5: Authorize Email Permissions (IMPORTANT!)

When you first run the script, Google will ask for permission to send emails on your behalf:

1. After deploying, click **Run** → **doPost** (or test the script)
2. Google will show an authorization dialog
3. Click **Review Permissions**
4. Choose your Google account
5. Click **Advanced** → **Go to [Project Name] (unsafe)**
6. Click **Allow** to grant permission to send emails

**Without this authorization, emails will not be sent!**

## Troubleshooting Email Issues

If emails are not being received:

1. **Check Spam/Junk folder** - Emails might be filtered
2. **Verify email address** - Make sure `ktv@kaykovmedia.com` is correct
3. **Check Google Apps Script execution logs:**
   - Go to Apps Script editor
   - Click **Executions** (clock icon on the left)
   - Check for any errors
4. **Test the script manually:**
   - In Apps Script editor, create a test function:
   ```javascript
   function testEmail() {
     MailApp.sendEmail({
       to: 'ktv@kaykovmedia.com',
       subject: 'Test Email',
       body: 'This is a test email from Google Apps Script'
     });
   }
   ```
   - Run this function to test if email sending works
5. **Check Google Workspace settings** - If using a Google Workspace account, your admin might have restrictions on sending emails

## Alternative: Manual Setup (If Apps Script doesn't work)

If you can't set up Apps Script, the form will still work and show success messages. You can manually check form submissions in the browser console, or we can set up email notifications instead.





