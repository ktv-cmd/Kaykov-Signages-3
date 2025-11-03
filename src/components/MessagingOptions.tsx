import { useState } from "react";
import { MessageCircle, Send, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MessagingOptionsProps {
  buttonText?: string;
  buttonVariant?: "default" | "outline" | "cta" | "hero";
  buttonSize?: "sm" | "default" | "lg";
  className?: string;
  showModal?: boolean;
  onModalOpen?: () => void;
}

export default function MessagingOptions({ 
  buttonText = "Get Quote", 
  buttonVariant = "default",
  buttonSize = "default",
  className = "",
  showModal = false,
  onModalOpen
}: MessagingOptionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsAppClick = () => {
    const message = "Please get me a free quote";
    const whatsappUrl = `https://wa.me/19179033458?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  const handleTelegramClick = () => {
    const message = "Please get me a free quote";
    const telegramUrl = `https://t.me/+19179033458?text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, '_blank');
    setIsOpen(false);
  };

  const handleSMSClick = () => {
    const message = "Please get me a free quote";
    const smsUrl = `sms:+19179033458?body=${encodeURIComponent(message)}`;
    window.open(smsUrl, '_self');
    setIsOpen(false);
  };

  const handleMainClick = () => {
    if (showModal && onModalOpen) {
      onModalOpen();
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Options Menu */}
      {isOpen && (
        <div 
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 flex flex-col gap-3 transition-all duration-300"
          style={{
            animation: 'fadeInUp 0.3s ease-out forwards'
          }}
        >
          <style>{`
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
          {/* WhatsApp Option */}
          <button
            onClick={handleWhatsAppClick}
            className="group flex items-center gap-3 bg-[#25D366] hover:bg-[#25D366]/90 text-white rounded-full px-5 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 min-w-[180px]"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium">WhatsApp</span>
          </button>

          {/* Telegram Option */}
          <button
            onClick={handleTelegramClick}
            className="group flex items-center gap-3 bg-[#0088cc] hover:bg-[#0088cc]/90 text-white rounded-full px-5 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 min-w-[180px]"
            aria-label="Telegram"
          >
            <Send className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium">Telegram</span>
          </button>

          {/* SMS Option */}
          <button
            onClick={handleSMSClick}
            className="group flex items-center gap-3 bg-gradient-to-r from-accent to-neon hover:from-accent/90 hover:to-neon/90 text-white rounded-full px-5 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 min-w-[180px]"
            aria-label="SMS"
          >
            <Phone className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium">SMS</span>
          </button>
        </div>
      )}

      {/* Main Button */}
      <Button
        onClick={handleMainClick}
        variant={buttonVariant}
        size={buttonSize}
        className={`group relative ${isOpen ? 'bg-accent' : ''} transition-all duration-300 hover:scale-105`}
        aria-label={isOpen ? "Close menu" : "Open messaging options"}
      >
        {isOpen ? (
          <X className="w-5 h-5 transition-transform duration-300" />
        ) : (
          <MessageCircle className="w-5 h-5 transition-transform duration-300" />
        )}
        {!isOpen && <span className="ml-2">{buttonText}</span>}
      </Button>
    </div>
  );
}


