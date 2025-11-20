const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzm1yFjQxoztP-FRqXv_sBRm2Q6Ig1Hp8AZE5_6cgA2EO3dQNzhY78eb9Is4JbOKcnrMQ/exec";

export interface CallbackFormData {
  name: string;
  phone?: string;
  email?: string;
  company?: string;
  businessLocation?: string;
  serviceType?: string;
  message?: string;
  imageBase64?: string;
  imageFileName?: string;
  imageMimeType?: string;
}

export async function submitToGoogleSheets(data: CallbackFormData): Promise<boolean> {
  try {
    const rowData = {
      timestamp: new Date().toISOString(),
      name: data.name || "",
      phone: data.phone || "Not provided",
      email: data.email || "Not provided",
      company: data.company || "Not provided",
      businessLocation: data.businessLocation || "Not provided",
      serviceType: data.serviceType || "Custom Quote",
      message: data.message || "No message",
      imageBase64: data.imageBase64 || null,
      imageFileName: data.imageFileName || null,
      imageMimeType: data.imageMimeType || null
    };

    try {
      const corsResponse = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rowData),
      });

      if (corsResponse.ok) {
        try {
          const responseJson = JSON.parse(await corsResponse.text());
          if (responseJson.success) {
            saveToLocalStorage(rowData, 'cors');
            return true;
          }
        } catch {}
        saveToLocalStorage(rowData, 'cors');
        return true;
      }
    } catch {}

    await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rowData),
    });

    saveToLocalStorage(rowData, 'no-cors');
    return true;
  } catch (error) {
    try {
      const rowData = {
        timestamp: new Date().toISOString(),
        name: data.name || "",
        phone: data.phone || "",
        email: data.email || "",
        company: data.company || "",
        serviceType: data.serviceType || "",
        message: data.message || "",
        imageFileName: data.imageFileName || null,
        hasImage: !!data.imageBase64
      };
      const storedRequests = JSON.parse(localStorage.getItem('callbackRequests') || '[]');
      storedRequests.push({
        ...rowData,
        submittedAt: new Date().toISOString(),
        error: error instanceof Error ? error.message : String(error),
        method: 'failed'
      });
      localStorage.setItem('callbackRequests', JSON.stringify(storedRequests));
    } catch {}
    return false;
  }
}

function saveToLocalStorage(rowData: any, method: string) {
  try {
    const storedRequests = JSON.parse(localStorage.getItem('callbackRequests') || '[]');
    storedRequests.push({
      timestamp: rowData.timestamp,
      name: rowData.name,
      phone: rowData.phone,
      email: rowData.email,
      company: rowData.company,
      serviceType: rowData.serviceType,
      message: rowData.message,
      imageFileName: rowData.imageFileName,
      hasImage: !!rowData.imageBase64,
      submittedAt: new Date().toISOString(),
      method
    });
    localStorage.setItem('callbackRequests', JSON.stringify(storedRequests));
  } catch {}
}
