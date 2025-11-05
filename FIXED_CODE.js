/**
 * FIXED VERSION - Google Apps Script Code
 * 
 * Fix: Added null check for event object
 */

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
    
    // FIX: Check if event object exists
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
    
    // Rest of the function remains the same...
    // (Include all the rest of the doPost function from GOOGLE_APPS_SCRIPT_CODE.js)
    
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



