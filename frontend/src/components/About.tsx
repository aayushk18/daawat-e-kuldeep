import { useEffect, useState } from 'react';
import { BookOpen, Heart, Award, ChefHat } from 'lucide-react';
import { supabase, BlogPost } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';

export function About() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const { language, t } = useLanguage();

  useEffect(() => {
    loadBlogPosts();
  }, []);

  const loadBlogPosts = async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('published_at', { ascending: false })
      .limit(2);

    if (data && !error) {
      setBlogPosts(data);
    }
  };

  const features = [
    {
      icon: Heart,
      title: t('Made with Love', 'प्यार से बनाया'),
      description: t('Every dish prepared with passion and authenticity', 'हर व्यंजन जुनून और प्रामाणिकता के साथ तैयार'),
    },
    {
      icon: Award,
      title: t('30+ Years Legacy', '30+ वर्ष की विरासत'),
      description: t('Three decades of culinary excellence', 'तीन दशकों की पाक उत्कृष्टता'),
    },
    {
      icon: ChefHat,
      title: t('Expert Chefs', 'विशेषज्ञ शेफ'),
      description: t('Trained in traditional cooking methods', 'पारंपरिक खाना पकाने के तरीकों में प्रशिक्षित'),
    },
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('Our Story', 'हमारी कहानी')}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-800 hover:shadow-xl transition-all hover:scale-105"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-4">
                <feature.icon className="text-amber-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map(post => (
            <div
              key={post.id}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="relative h-64">
                <img
                  src={post.image_url}
                  alt={language === 'en' ? post.title : post.title_hi}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-amber-600 text-white px-3 py-1 rounded-full flex items-center space-x-2">
                  <BookOpen size={14} />
                  <span className="text-xs font-semibold">{t('Story', 'कहानी')}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {language === 'en' ? post.title : post.title_hi || post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-4">
                  {language === 'en' ? post.content : post.content_hi || post.content}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-medium">{post.author}</span>
                  <span>{new Date(post.published_at).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            {t('Join Our VIP Loyalty Club', 'हमारे VIP लॉयल्टी क्लब में शामिल हों')}
          </h3>
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            {t(
              'Earn points on every visit, get exclusive discounts, and be the first to know about special events!',
              'हर यात्रा पर अंक अर्जित करें, विशेष छूट प्राप्त करें, और विशेष कार्यक्रमों के बारे में सबसे पहले जानें!'
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#reservations"
              className="px-8 py-3 bg-white text-amber-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              {t('Sign Up Now', 'अभी साइन अप करें')}
            </a>
            <span className="px-8 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-lg font-semibold">
              {t('Get 10% Off Your Next Visit', 'अपनी अगली यात्रा पर 10% की छूट पाएं')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
