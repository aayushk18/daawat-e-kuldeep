import { useEffect, useState } from 'react';
import { ChefHat, Star, Calendar } from 'lucide-react';
import { supabase, ChefSpecial as ChefSpecialType } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';

export function ChefSpecial() {
  const [special, setSpecial] = useState<ChefSpecialType | null>(null);
  const { language, t } = useLanguage();

  useEffect(() => {
    loadTodaysSpecial();
  }, []);

  const loadTodaysSpecial = async () => {
    const today = new Date().getDay();

    const { data, error } = await supabase
      .from('chef_specials')
      .select('*')
      .eq('day_of_week', today)
      .eq('is_active', true)
      .maybeSingle();

    if (data && !error) {
      setSpecial(data);
    }
  };

  if (!special) return null;

  const dayNames = [
    t('Sunday', 'रविवार'),
    t('Monday', 'सोमवार'),
    t('Tuesday', 'मंगलवार'),
    t('Wednesday', 'बुधवार'),
    t('Thursday', 'गुरुवार'),
    t('Friday', 'शुक्रवार'),
    t('Saturday', 'शनिवार'),
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-amber-600 text-white px-4 py-2 rounded-full mb-4">
              <ChefHat size={20} />
              <span className="font-semibold">{t("Today's Special", 'आज की विशेष')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              {t("Chef's Recommendation", 'शेफ की सिफारिश')}
            </h2>
          </div>

          <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-auto">
                <img
                  src={special.image_url}
                  alt={language === 'en' ? special.dish_name : special.dish_name_hi}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-amber-600 text-white px-4 py-2 rounded-lg shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Calendar size={18} />
                    <span className="font-semibold">{dayNames[special.day_of_week]}</span>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full">
                    <Star className="text-amber-500 fill-amber-500" size={24} />
                  </div>
                </div>
              </div>

              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {language === 'en' ? special.dish_name : special.dish_name_hi || special.dish_name}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {language === 'en' ? special.description : special.description_hi || special.description}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      {t('Special Price', 'विशेष मूल्य')}
                    </p>
                    <p className="text-4xl font-bold text-amber-600">₹{special.price}</p>
                  </div>
                  <a
                    href="#reservations"
                    className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-semibold"
                  >
                    {t('Order Now', 'अभी ऑर्डर करें')}
                  </a>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 italic">
                  {t('Available today only - Limited quantity', 'केवल आज उपलब्ध - सीमित मात्रा')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
