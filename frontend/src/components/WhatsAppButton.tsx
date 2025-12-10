import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function WhatsAppButton() {
  const { t } = useLanguage();

  return (
    <a
      href="https://wa.me/919810635268?text=Hello! I would like to inquire about..."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all group"
      aria-label={t('Chat on WhatsApp', 'WhatsApp पर चैट करें')}
    >
      <MessageCircle size={28} />
      <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {t('Chat with us!', 'हमसे चैट करें!')}
      </span>
      <span className="absolute top-0 right-0 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
      </span>
    </a>
  );
}
