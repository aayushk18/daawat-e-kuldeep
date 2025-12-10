import { useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { supabase, Review } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';

export function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
      .limit(6);

    if (data && !error) {
      setReviews(data);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={18}
            className={i < rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  const platformColors: Record<string, string> = {
    google: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    zomato: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    website: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  };

  return (
    <section id="reviews" className="py-20 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('What Our Guests Say', 'हमारे मेहमान क्या कहते हैं')}
          </h2>
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={24} className="text-amber-500 fill-amber-500" />
              ))}
            </div>
            <span className="text-3xl font-bold text-gray-900 dark:text-white">{averageRating}</span>
            <span className="text-gray-600 dark:text-gray-400">({reviews.length}+ {t('reviews', 'समीक्षाएं')})</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map(review => (
            <div
              key={review.id}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all relative"
            >
              <Quote className="absolute top-4 right-4 text-amber-200 dark:text-amber-900/30" size={40} />

              <div className="flex items-center justify-between mb-4">
                {renderStars(review.rating)}
                <span className={`text-xs px-2 py-1 rounded-full ${platformColors[review.platform] || platformColors.website}`}>
                  {review.platform}
                </span>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-4 italic">
                "{review.comment}"
              </p>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  {review.customer_name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{review.customer_name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(review.created_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://g.page/r/YOUR_GOOGLE_PLACE_ID/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-semibold"
          >
            <Star size={20} />
            <span>{t('Write a Review', 'समीक्षा लिखें')}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
