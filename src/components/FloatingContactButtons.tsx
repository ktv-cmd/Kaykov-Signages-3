import { useState } from "react";
import { Phone, Send } from "lucide-react";

export default function FloatingContactButtons() {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "19179033458";
  
  const handlePhoneClick = () => {
    window.open(`tel:+${phoneNumber}`, '_self');
  };

  const handleWhatsAppClick = () => {
    const message = "Hello! I'm interested in your signage services.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleTelegramClick = () => {
    const message = "Hello! I'm interested in your signage services.";
    const telegramUrl = `https://t.me/+${phoneNumber}`;
    window.open(telegramUrl, '_blank');
  };

  const handleSMSClick = () => {
    const message = "Hello! I'm interested in your signage services.";
    const smsUrl = `sms:+${phoneNumber}?body=${encodeURIComponent(message)}`;
    window.open(smsUrl, '_self');
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3 sm:gap-4">
      {/* Contact Options - shown when isOpen is true */}
      {isOpen && (
        <div className="flex flex-col gap-3 mb-2 animate-in fade-in slide-in-from-bottom-4 duration-300" style={{ animation: 'slideUpFadeIn 0.3s ease-out' }}>
          {/* Phone Button */}
          <button
            onClick={handlePhoneClick}
            className="group flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 active:bg-primary/80 text-primary-foreground rounded-lg w-14 h-14 min-w-[56px] min-h-[56px] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 touch-manipulation"
            aria-label="Call"
            title="Call Us"
          >
            <Phone className="w-5 h-5" />
          </button>

          {/* WhatsApp Button */}
          <button
            onClick={handleWhatsAppClick}
            className="group flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#25D366]/90 active:bg-[#25D366]/80 text-white rounded-lg w-14 h-14 min-w-[56px] min-h-[56px] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 touch-manipulation"
            aria-label="WhatsApp"
            title="WhatsApp"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </button>

          {/* Telegram Button */}
          <button
            onClick={handleTelegramClick}
            className="group flex items-center justify-center gap-3 bg-[#0088cc] hover:bg-[#0088cc]/90 active:bg-[#0088cc]/80 text-white rounded-lg w-14 h-14 min-w-[56px] min-h-[56px] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 touch-manipulation"
            aria-label="Telegram"
            title="Telegram"
          >
            <Send className="w-5 h-5" />
          </button>

          {/* SMS Button */}
          <button
            onClick={handleSMSClick}
            className="group flex items-center justify-center gap-3 bg-[#34C759] hover:bg-[#34C759]/90 active:bg-[#34C759]/80 text-white rounded-lg w-14 h-14 min-w-[56px] min-h-[56px] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 touch-manipulation"
            aria-label="SMS"
            title="Send SMS"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </button>
        </div>
      )}

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center rounded-lg w-16 h-16 min-w-[64px] min-h-[64px] shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 active:scale-95 relative touch-manipulation ${
          isOpen 
            ? 'bg-accent hover:bg-accent/90 active:bg-accent/80 text-white' 
            : 'bg-accent hover:bg-accent/90 active:bg-accent/80 text-white animate-bounce-subtle pulse-glow'
        }`}
        aria-label="Contact Options"
        title="Contact Us"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>
      
      {/* CSS Animations */}
      <style>{`
        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(225, 29, 72, 0.7);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(225, 29, 72, 0);
          }
        }
        
        @keyframes slideUpFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        
        .pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        /* Hover effect to stop animation and scale up */
        button:hover .animate-bounce-subtle,
        button:hover .pulse-glow {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
