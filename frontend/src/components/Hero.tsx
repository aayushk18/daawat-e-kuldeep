import { Calendar, UtensilsCrossed, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Hero() {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg"
          alt="Restaurant ambiance"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
      </div>

      <div className="container mx-auto px-4 z-10 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-amber-600/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Sparkles size={16} className="text-amber-400" />
            <span className="text-amber-300 text-sm font-medium">
              {t('Authentic North Indian Cuisine Since 1995', '1995 से प्रामाणिक उत्तर भारतीय व्यंजन')}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {t('Experience the Royal', 'शाही का अनुभव करें')}
            <br />
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              {t('Feast of Flavors', 'स्वादों की दावत')}
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed">
            {t(
              'Indulge in traditional recipes passed down through generations, crafted with love and served with pride.',
              'पीढ़ियों से चली आ रही पारंपरिक रेसिपी का आनंद लें, प्यार से बनाई और गर्व के साथ परोसी गई।'
            )}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#menu"
              className="group flex items-center space-x-2 px-8 py-4 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-all hover:scale-105 shadow-lg"
            >
              <UtensilsCrossed size={20} />
              <span className="font-semibold">{t('View Menu', 'मेनू देखें')}</span>
            </a>
            <a
              href="#reservations"
              className="group flex items-center space-x-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-lg hover:bg-white/20 transition-all hover:scale-105"
            >
              <Calendar size={20} />
              <span className="font-semibold">{t('Book Table', 'टेबल बुक करें')}</span>
            </a>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-400 mb-2">30+</div>
              <div className="text-gray-300 text-sm">{t('Years Experience', 'वर्ष का अनुभव')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-400 mb-2">50+</div>
              <div className="text-gray-300 text-sm">{t('Signature Dishes', 'विशेष व्यंजन')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-400 mb-2">10k+</div>
              <div className="text-gray-300 text-sm">{t('Happy Customers', 'खुश ग्राहक')}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
    </section>
  );
}
