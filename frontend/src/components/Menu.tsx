import { useState, useEffect } from 'react';
import { Flame, Leaf, ShieldAlert, Activity, Filter } from 'lucide-react';
import { supabase, MenuItem } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';

export function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCalories, setShowCalories] = useState(false);
  const [vegOnly, setVegOnly] = useState(false);
  const { language, t } = useLanguage();

  useEffect(() => {
    loadMenuItems();
  }, []);

  const loadMenuItems = async () => {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('is_available', true)
      .order('category', { ascending: true });

    if (data && !error) {
      setMenuItems(data);
    }
  };

  const categories = [
    { id: 'all', label: t('All Items', 'सभी व्यंजन') },
    { id: 'appetizer', label: t('Appetizers', 'स्टार्टर') },
    { id: 'main_course', label: t('Main Course', 'मुख्य व्यंजन') },
    { id: 'breads', label: t('Breads', 'रोटी') },
    { id: 'dessert', label: t('Desserts', 'मिठाई') },
    { id: 'beverages', label: t('Beverages', 'पेय') },
  ];

  const filteredItems = menuItems.filter(item => {
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
    const vegMatch = !vegOnly || item.is_veg;
    return categoryMatch && vegMatch;
  });

  const renderSpicyLevel = (level: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Flame
            key={i}
            size={14}
            className={i < level ? 'text-red-500 fill-red-500' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  return (
    <section id="menu" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('Our Menu', 'हमारा मेनू')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t(
              'Discover our selection of authentic dishes, prepared with the finest ingredients',
              'बेहतरीन सामग्री से तैयार हमारे प्रामाणिक व्यंजनों का चयन खोजें'
            )}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-600 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-gray-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 mb-8 justify-center items-center">
          <button
            onClick={() => setVegOnly(!vegOnly)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all ${
              vegOnly
                ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
            }`}
          >
            <Leaf size={18} />
            <span>{t('Vegetarian Only', 'केवल शाकाहारी')}</span>
          </button>

          <button
            onClick={() => setShowCalories(!showCalories)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all ${
              showCalories
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
            }`}
          >
            <Activity size={18} />
            <span>{t('Show Calories', 'कैलोरी दिखाएं')}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:scale-105"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image_url}
                  alt={language === 'en' ? item.name : item.name_hi}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 flex space-x-2">
                  {item.is_veg && (
                    <span className="bg-green-500 text-white p-1.5 rounded-full">
                      <Leaf size={16} />
                    </span>
                  )}
                  {item.is_vegan && (
                    <span className="bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      {t('Vegan', 'वीगन')}
                    </span>
                  )}
                </div>
                {showCalories && (
                  <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                    {item.calories} {t('cal', 'कैल')}
                  </div>
                )}
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {language === 'en' ? item.name : item.name_hi || item.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {language === 'en' ? item.description : item.description_hi || item.description}
                </p>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-amber-600">₹{item.price}</span>
                  {item.spicy_level > 0 && renderSpicyLevel(item.spicy_level)}
                </div>

                {item.allergens && item.allergens.length > 0 && (
                  <div className="flex items-start space-x-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-600 p-2 rounded">
                    <ShieldAlert size={14} className="mt-0.5 flex-shrink-0" />
                    <span>
                      {t('Contains:', 'शामिल है:')} {item.allergens.join(', ')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Filter size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {t('No items found with current filters', 'वर्तमान फ़िल्टर के साथ कोई व्यंजन नहीं मिला')}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
