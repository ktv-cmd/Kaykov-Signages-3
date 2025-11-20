const SPREADSHEET_ID = '1OPGRV7LVeiuOxsS5Qs4ZQSlOar5l42uZp3znm7ynWgY';
const DRIVE_FOLDER_ID = '1jCMgJiJlbVjhrAtg_T7ZjjbKHpoRT_yu';
const RECIPIENT_EMAIL = 'boris@kaykovmedia.com'; // Email to receive new lead notifications
const EMAIL_SUBJECT = 'New Lead Form Website';

function getOrCreateSheet(spreadsheet) {
  let sheet = spreadsheet.getSheetByName('Sheet1');
  if (!sheet) {
    sheet = spreadsheet.insertSheet('Sheet1');
    initializeSheetHeaders(sheet);
  }
  return sheet;
}

function initializeSheetHeaders(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Lead #',
      'Received',
      'Name',
      'Phone',
      'Email',
      'Company Name',
      'Client Address',
      'Details',
      'File Link',
      'Email Sent to Boris',
      'Email Sent to Customer'
    ]);
    
    const headerRange = sheet.getRange(1, 1, 1, 11);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#4285f4');
    headerRange.setFontColor('#ffffff');
  }
}

function formatEmailBody(data, leadNumber, sentTimestamp, fileLink) {
  let emailBody = `You received one more lead from the website\n\n`;
  emailBody += `Name: ${data.name || 'Not provided'}\n`;
  emailBody += `Phone: ${data.phone || 'Not provided'}\n`;
  emailBody += `Email: ${data.email || 'Not provided'}\n`;
  emailBody += `Company Name: ${data.company || 'Not provided'}\n`;
  emailBody += `Client Address: ${data.businessLocation || 'Not provided'}\n`;
  
  if (data.message && data.message.trim() !== '' && data.message !== 'No message') {
    emailBody += `Details: ${data.message}\n`;
  } else {
    emailBody += `Details: No message provided\n`;
  }
  
  if (fileLink) {
    emailBody += `\nFile uploaded: ${fileLink}\n`;
  }
  
  emailBody += `\nPlease get in touch as soon as possible\n`;
  
  return emailBody;
}

function formatClientConfirmationEmail(data, sentTimestamp) {
  let emailBody = `Dear ${data.name || 'Valued Customer'},\n\n`;
  emailBody += `We have received your custom quote request for signage. Our team will review your inquiry and contact you shortly to discuss your project.\n\n`;
  emailBody += `We appreciate your interest in our services and look forward to working with you.\n\n`;
  emailBody += `Best regards,\n\n`;
  emailBody += `Boris\n\n`;
  emailBody += `Kaykov Media`;
  
  return emailBody;
}

function sendEmailNotification(data, leadNumber, fileLink) {
  try {
    const sentTimestamp = new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    });
    
    // Use MailApp - it will send from the account that owns the script
    // To send from info@kaykovmedia.com, the script must be owned by that account
    MailApp.sendEmail({
      to: RECIPIENT_EMAIL,
      subject: EMAIL_SUBJECT,
      body: formatEmailBody(data, leadNumber, sentTimestamp, fileLink)
    });
    
    return { success: true, timestamp: sentTimestamp };
  } catch (emailError) {
    return { success: false, error: emailError.toString() };
  }
}

function sendClientConfirmationEmail(data) {
  if (!data.email || data.email.trim() === '' || data.email === 'Not provided') {
    return { success: false, reason: 'No email provided' };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const clientEmail = data.email.trim();
  if (!emailRegex.test(clientEmail)) {
    return { success: false, reason: 'Invalid email format' };
  }
  
  try {
    const sentTimestamp = new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    });
    
    // Use MailApp - it will send from the account that owns the script
    // To send from info@kaykovmedia.com, the script must be owned by that account
    MailApp.sendEmail({
      to: clientEmail,
      subject: 'Custom Quote for a signage',
      body: formatClientConfirmationEmail(data, sentTimestamp)
    });
    
    return { success: true, timestamp: sentTimestamp };
  } catch (emailError) {
    return { success: false, error: emailError.toString() };
  }
}

function saveImageToDrive(imageBase64, imageFileName, imageMimeType, leadNumber, name) {
  try {
    if (!imageBase64 || !imageFileName) {
      return null;
    }
    
    // Get the Drive folder
    let folder;
    try {
      folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
    } catch (folderError) {
      Logger.log('Error accessing folder: ' + folderError.toString());
      return null;
    }
    
    // Decode base64 image
    const imageBlob = Utilities.newBlob(
      Utilities.base64Decode(imageBase64.split(',')[1] || imageBase64),
      imageMimeType || 'image/jpeg',
      imageFileName
    );
    
    // Create a descriptive filename
    const timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd_HH-mm-ss');
    const sanitizedName = (name || 'Unknown').replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30);
    const fileExtension = imageFileName.split('.').pop() || 'jpg';
    const newFileName = `Lead_${leadNumber}_${sanitizedName}_${timestamp}.${fileExtension}`;
    
    // Create file in the folder
    const file = folder.createFile(imageBlob);
    file.setName(newFileName);
    
    // Return the file URL
    return file.getUrl();
  } catch (error) {
    Logger.log('Error saving image to Drive: ' + error.toString());
    return null;
  }
}

function prepareRowData(data, leadNumber, fileLink) {
  return [
    leadNumber,
    data.timestamp ? new Date(data.timestamp) : new Date(),
    data.name || '',
    data.phone || 'Not provided',
    data.email || 'Not provided',
    data.company || 'Not provided',
    data.businessLocation || 'Not provided',
    data.message || 'No message',
    fileLink || 'No file',
    '',
    ''
  ];
}

function updateInfoEmailStatus(sheet, rowNumber, emailSent, timestamp) {
  try {
    const statusCell = sheet.getRange(rowNumber, 10);
    if (emailSent && timestamp) {
      statusCell.setValue(new Date());
      statusCell.setNumberFormat('mm/dd/yyyy hh:mm:ss');
      statusCell.setBackground('#d4edda');
    } else {
      statusCell.setValue('Failed');
      statusCell.setBackground('#f8d7da');
    }
  } catch {}
}

function updateCustomerEmailStatus(sheet, rowNumber, emailSent, timestamp) {
  try {
    const statusCell = sheet.getRange(rowNumber, 11);
    if (emailSent && timestamp) {
      statusCell.setValue(new Date());
      statusCell.setNumberFormat('mm/dd/yyyy hh:mm:ss');
      statusCell.setBackground('#d4edda');
    } else {
      statusCell.setValue('Not sent');
      statusCell.setBackground('#fff3cd');
    }
  } catch {}
}

function doPost(e) {
  try {
    if (!e?.postData?.contents) {
      return createErrorResponse('No data received');
    }
    
    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseError) {
      return createErrorResponse('Invalid JSON format', parseError.toString());
    }
    
    if (!data.name || data.name.trim() === '') {
      return createErrorResponse('Name is required');
    }
    
    let spreadsheet;
    try {
      spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    } catch (sheetError) {
      return createErrorResponse('Cannot open spreadsheet', sheetError.toString());
    }
    
    const sheet = getOrCreateSheet(spreadsheet);
    initializeSheetHeaders(sheet);
    
    const leadNumber = sheet.getLastRow();
    
    // Save image to Drive if provided
    let fileLink = null;
    if (data.imageBase64 && data.imageFileName) {
      fileLink = saveImageToDrive(
        data.imageBase64,
        data.imageFileName,
        data.imageMimeType,
        leadNumber,
        data.name
      );
    }
    
    const rowData = prepareRowData(data, leadNumber, fileLink);
    
    try {
      sheet.appendRow(rowData);
      const newRowNumber = sheet.getLastRow();
      
      // Format file link cell if file was uploaded
      if (fileLink) {
        const fileLinkCell = sheet.getRange(newRowNumber, 9);
        fileLinkCell.setFormula('=HYPERLINK("' + fileLink + '","View File")');
        fileLinkCell.setFontColor('#1155cc');
        fileLinkCell.setFontStyle('underline');
      }
      
      const emailResult = sendEmailNotification(data, leadNumber, fileLink);
      const clientEmailResult = sendClientConfirmationEmail(data);
      
      updateInfoEmailStatus(sheet, newRowNumber, emailResult.success, emailResult.timestamp);
      updateCustomerEmailStatus(sheet, newRowNumber, clientEmailResult.success, clientEmailResult.timestamp);
      
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: 'Lead saved successfully',
        rowNumber: newRowNumber,
        leadNumber: leadNumber,
        fileLink: fileLink || null,
        emailSent: emailResult.success,
        infoEmailTimestamp: emailResult.timestamp || null,
        clientEmailSent: clientEmailResult.success,
        clientEmailTimestamp: clientEmailResult.timestamp || null,
        clientEmailReason: clientEmailResult.reason || null,
        timestamp: new Date().toISOString(),
        sheetName: sheet.getName()
      })).setMimeType(ContentService.MimeType.JSON);
      
    } catch (appendError) {
      return createErrorResponse('Cannot save data to sheet', appendError.toString());
    }
    
  } catch (error) {
    return createErrorResponse('Unexpected error', error.toString());
  }
}

function createErrorResponse(error, details = null) {
  const response = {
    success: false,
    error: error
  };
  
  if (details) {
    response.details = details;
  }
  
  return ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  if (e.parameter.test === '1') {
    try {
      const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
      const sheet = spreadsheet.getSheetByName('Sheet1') || spreadsheet.getSheets()[0];
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: 'Script is working! Ready to receive leads.',
        timestamp: new Date().toISOString(),
        spreadsheetId: SPREADSHEET_ID,
        sheetName: sheet.getName(),
        lastRow: sheet.getLastRow(),
        canAccessSheet: true,
        recipientEmail: RECIPIENT_EMAIL
      })).setMimeType(ContentService.MimeType.JSON);
    } catch (error) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        message: 'Script is running but cannot access spreadsheet',
        error: error.toString(),
        spreadsheetId: SPREADSHEET_ID
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }
  return ContentService.createTextOutput('Script is working. Use POST to submit form data.');
}
