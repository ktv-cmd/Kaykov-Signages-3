/**
 * Submit form data to Google Sheets
 * 
 * To use this:
 * 1. Create a Google Apps Script project
 * 2. Deploy it as a web app with "Execute as: Me" and "Who has access: Anyone"
 * 3. Replace the SCRIPT_URL below with your deployed web app URL
 * 
 * Example Google Apps Script code:
 * ```javascript
 * function doPost(e) {
 *   const sheet = SpreadsheetApp.openById('1OPGRV7LVeiuOxsS5Qs4ZQSlOar5l42uZp3znm7ynWgY').getActiveSheet();
 *   const data = JSON.parse(e.postData.contents);
 *   sheet.appendRow([
 *     new Date(),
 *     data.name,
 *     data.phone,
 *     data.email || '',
 *     data.serviceType || '',
 *     data.message
 *   ]);
 *   return ContentService.createTextOutput(JSON.stringify({success: true}));
 * }
 * ```
 */

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxlWBMIWgVL5rsW9D-BUnCSyu4Wi4GWrMhLKZb4PAEQzJP0bSYFZtkyddTrZcDbP212pA/exec";

export interface CallbackFormData {
  name: string;
  phone: string;
  email?: string;
  serviceType?: string;
  message: string;
}

export async function submitToGoogleSheets(data: CallbackFormData): Promise<boolean> {
  try {
    // Prepare data for Google Sheets
    const rowData = {
      timestamp: new Date().toISOString(),
      name: data.name || "",
      phone: data.phone || "",
      email: data.email || "",
      serviceType: data.serviceType || "",
      message: data.message || ""
    };

    // If SCRIPT_URL is not set, log the data (for development)
    if (SCRIPT_URL === "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE") {
      console.log("%c📊 Form Data (for Google Sheets):", "color: #E11D48; font-weight: bold;");
      console.table(rowData);
      console.log("%c⚠️ To enable automatic saving:", "color: #E11D48; font-weight: bold;");
      console.log("1. Follow instructions in GOOGLE_SHEETS_SETUP.md");
      console.log("2. Update SCRIPT_URL in src/lib/googleSheets.ts with your web app URL");
      
      // Store in localStorage as fallback (for manual retrieval)
      const storedRequests = JSON.parse(localStorage.getItem('callbackRequests') || '[]');
      storedRequests.push(rowData);
      localStorage.setItem('callbackRequests', JSON.stringify(storedRequests));
      localStorage.setItem('lastCallbackRequest', JSON.stringify(rowData));
      
      return false; // Return false so user knows manual setup is needed
    }

    // Submit to Google Apps Script web app
    // Using no-cors mode because Google Apps Script has CORS limitations
    await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rowData),
    });

    // With no-cors mode, we can't verify the response
    // But Google Apps Script should handle the POST request
    // Store in localStorage as backup
    const storedRequests = JSON.parse(localStorage.getItem('callbackRequests') || '[]');
    storedRequests.push(rowData);
    localStorage.setItem('callbackRequests', JSON.stringify(storedRequests));
    
    return true;
  } catch (error) {
    console.error("Error submitting to Google Sheets:", error);
    // Store in localStorage as fallback
    try {
      const rowData = {
        timestamp: new Date().toISOString(),
        name: data.name || "",
        phone: data.phone || "",
        email: data.email || "",
        serviceType: data.serviceType || "",
        message: data.message || ""
      };
      const storedRequests = JSON.parse(localStorage.getItem('callbackRequests') || '[]');
      storedRequests.push(rowData);
      localStorage.setItem('callbackRequests', JSON.stringify(storedRequests));
    } catch (storageError) {
      console.error("Error storing in localStorage:", storageError);
    }
    return false;
  }
}

