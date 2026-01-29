import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/5a6fa346-9ad6-4f2f-b0df-b5a2e515c9f9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ScrollToTop.tsx:8',message:'Route changed',data:{pathname,windowPath:window.location.pathname},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}





