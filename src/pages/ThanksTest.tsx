import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";

const ThanksTest = () => {
  const [showThanks, setShowThanks] = useState(false);

  useEffect(() => {
    // Show modal immediately after component mounts
    const showTimer = setTimeout(() => {
      setShowThanks(true);
    }, 100);
    
    // Track conversion in analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-17829037355',
        'value': 1.0,
        'currency': 'USD'
      });
    }

    // Auto-close thanks modal after 3 seconds
    const closeTimer = setTimeout(() => {
      setShowThanks(false);
    }, 3300);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(closeTimer);
    };
  }, []);

  if (!showThanks) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center px-4 py-20">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Загрузка модального окна...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] animate-in fade-in-0"
        onClick={() => setShowThanks(false)}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="bg-background border-2 border-primary/20 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl pointer-events-auto animate-in fade-in-0 zoom-in-95"
          style={{
            animation: 'modalAppear 0.3s ease-out'
          }}
        >
          <div className="flex flex-col items-center">
            <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-4 mb-4">
              <CheckCircle2 className="w-16 h-16 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-primary">
              Thank You!
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-6">
              We've received your request and will contact you soon.
            </p>
            <p className="text-sm text-muted-foreground">
              This window will close automatically...
            </p>
          </div>
        </div>
      </div>

      {/* Background content */}
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center px-4 py-20">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Модальное окно "Thank You" должно быть видно выше.
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Оно автоматически закроется через 3 секунды.
          </p>
          <p className="text-xs text-muted-foreground">
            Статус: {showThanks ? "Открыто ✅" : "Закрыто ❌"}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes modalAppear {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default ThanksTest;
