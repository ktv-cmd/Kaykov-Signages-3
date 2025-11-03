# Google Sheets Integration Setup Guide

To automatically save callback requests to your Google Sheet, follow these steps:

## Step 1: Create Google Apps Script

1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1OPGRV7LVeiuOxsS5Qs4ZQSlOar5l42uZp3znm7ynWgY/edit
2. Go to **Extensions** → **Apps Script**
3. Delete any existing code and paste this:

```javascript
function doPost(e) {
  try {
    // Open your spreadsheet by ID
    const sheet = SpreadsheetApp.openById('1OPGRV7LVeiuOxsS5Qs4ZQSlOar5l42uZp3znm7ynWgY').getActiveSheet();
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Append row with: Timestamp, Name, Phone, Email, Service Type, Message
    sheet.appendRow([
      new Date(),
      data.name || '',
      data.phone || '',
      data.email || '',
      data.serviceType || '',
      data.message || ''
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
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

## Alternative: Manual Setup (If Apps Script doesn't work)

If you can't set up Apps Script, the form will still work and show success messages. You can manually check form submissions in the browser console, or we can set up email notifications instead.



