import { useState, useEffect } from 'react';
import { X, Gift, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function WelcomePopup() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('welcomePopupSeen');

    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('welcomePopupSeen', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md mx-4 overflow-hidden animate-scale-in">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          aria-label="Close"
        >
          <X size={20} className="text-gray-600 dark:text-gray-300" />
        </button>

        <div className="relative h-48 bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-white rounded-full animate-pulse delay-75"></div>
          </div>
          <div className="relative z-10 text-center">
            <Gift size={64} className="text-white mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-white flex items-center justify-center space-x-2">
              <Sparkles size={20} />
              <span>{t('Welcome!', 'स्वागत है!')}</span>
              <Sparkles size={20} />
            </h3>
          </div>
        </div>

        <div className="p-8 text-center">
          <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            {t('First Time Here?', 'पहली बार यहाँ आए हैं?')}
          </h4>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {t(
              'Get a complimentary dessert on orders above ₹800!',
              '₹800 से ऊपर के ऑर्डर पर मुफ्त मिठाई पाएं!'
            )}
          </p>

          <div className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-300 dark:border-amber-700 rounded-lg p-4 mb-6">
            <p className="text-lg font-bold text-amber-800 dark:text-amber-300 mb-1">
              {t('Use Code:', 'कोड का उपयोग करें:')}
            </p>
            <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 tracking-wider">
              WELCOME10
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#reservations"
              onClick={handleClose}
              className="flex-1 px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-semibold"
            >
              {t('Book Now', 'अभी बुक करें')}
            </a>
            <a
              href="#menu"
              onClick={handleClose}
              className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-semibold"
            >
              {t('View Menu', 'मेनू देखें')}
            </a>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
            {t('Valid for first-time customers only', 'केवल पहली बार के ग्राहकों के लिए मान्य')}
          </p>
        </div>
      </div>
    </div>
  );
}
