/**
 * Submit form data to Google Sheets and send email notification
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
 *   
 *   // Save to Google Sheets
 *   sheet.appendRow([
 *     new Date(),
 *     data.name,
 *     data.phone,
 *     data.email || '',
 *     data.serviceType || '',
 *     data.message
 *   ]);
 *   
 *   // Send email notification
 *   const recipientEmail = 'ktv@kaykovmedia.com';
 *   const subject = 'New Lead - Call Request';
 *   const body = `
 *     New lead has submitted a request:
 *     
 *     Name: ${data.name}
 *     Phone: ${data.phone}
 *     Email: ${data.email || 'Not provided'}
 *     Service Type: ${data.serviceType || 'Not specified'}
 *     Message: ${data.message || 'No message'}
 *     Timestamp: ${new Date().toLocaleString()}
 *     
 *     Please call them back within 3 hours.
 *   `;
 *   
 *   MailApp.sendEmail({
 *     to: recipientEmail,
 *     subject: subject,
 *     body: body
 *   });
 *   
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

// Test function to check if script is accessible
export async function testScriptConnection(): Promise<{success: boolean; message: string}> {
  try {
    console.log('🧪 Testing script connection...');
    const response = await fetch(SCRIPT_URL + '?test=1', {
      method: 'GET',
      mode: 'cors',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const text = await response.text();
    console.log('✅ Script is accessible. Response:', text);
    
    try {
      const json = JSON.parse(text);
      return { success: true, message: json.message || 'Script is working!' };
    } catch {
      return { success: true, message: text };
    }
  } catch (error) {
    console.error('❌ Script connection test failed:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : String(error) 
    };
  }
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

    console.log('📤 Submitting to Google Sheets:', rowData);
    console.log('📤 URL:', SCRIPT_URL);

    // First, try with cors mode to see the actual response
    try {
      console.log('🔄 Attempting with CORS mode first...');
      const corsResponse = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rowData),
      });

      if (corsResponse.ok) {
        const responseText = await corsResponse.text();
        console.log('✅ CORS mode success! Response:', responseText);
        
        try {
          const responseJson = JSON.parse(responseText);
          if (responseJson.success) {
            console.log('✅ Success confirmed:', responseJson.message);
            if (responseJson.emailSent === false) {
              console.warn('⚠️ Email was not sent, but data was saved');
            }
          }
        } catch {
          console.log('✅ Response received (non-JSON):', responseText);
        }
        
        // Store in localStorage as backup
        try {
          const storedRequests = JSON.parse(localStorage.getItem('callbackRequests') || '[]');
          storedRequests.push({
            ...rowData,
            submittedAt: new Date().toISOString(),
            method: 'cors'
          });
          localStorage.setItem('callbackRequests', JSON.stringify(storedRequests));
          console.log('💾 Data saved to localStorage as backup');
        } catch (storageError) {
          console.error("❌ Error storing in localStorage:", storageError);
        }
        
        return true;
      }
    } catch (corsError) {
      console.warn('⚠️ CORS mode failed, trying no-cors mode:', corsError);
    }

    // Fallback to no-cors mode (original behavior)
    console.log('🔄 Falling back to no-cors mode...');
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rowData),
    });

    console.log('✅ Request sent (no-cors mode - cannot verify response)');
    console.log('📝 Response status:', response.status);
    console.log('📝 Response type:', response.type);

    // With no-cors mode, we can't verify the response
    // But Google Apps Script should handle the POST request
    // Store in localStorage as backup
    try {
      const storedRequests = JSON.parse(localStorage.getItem('callbackRequests') || '[]');
      storedRequests.push({
        ...rowData,
        submittedAt: new Date().toISOString(),
        method: 'no-cors'
      });
      localStorage.setItem('callbackRequests', JSON.stringify(storedRequests));
      console.log('💾 Data saved to localStorage as backup');
    } catch (storageError) {
      console.error("❌ Error storing in localStorage:", storageError);
    }
    
    return true;
  } catch (error) {
    console.error("❌ Error submitting to Google Sheets:", error);
    console.error("❌ Error details:", {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    
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
      storedRequests.push({
        ...rowData,
        submittedAt: new Date().toISOString(),
        error: error instanceof Error ? error.message : String(error),
        method: 'failed'
      });
      localStorage.setItem('callbackRequests', JSON.stringify(storedRequests));
      console.log('💾 Data saved to localStorage with error flag');
    } catch (storageError) {
      console.error("❌ Error storing in localStorage:", storageError);
    }
    return false;
  }
}
