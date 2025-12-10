import { useEffect, useState } from 'react';
import { CalendarDays, Users, DollarSign, Sparkles } from 'lucide-react';
import { supabase, Event } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';

export function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const { language, t } = useLanguage();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('is_active', true)
      .order('event_date', { ascending: true });

    if (data && !error) {
      setEvents(data);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <section id="events" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('Special Events & Private Dining', 'विशेष कार्यक्रम और निजी भोजन')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t(
              'Host your special occasions with us - from intimate gatherings to grand celebrations',
              'हमारे साथ अपने विशेष अवसरों की मेजबानी करें - अंतरंग समारोहों से लेकर भव्य उत्सवों तक'
            )}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {events.map(event => (
            <div
              key={event.id}
              className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:scale-105"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image_url}
                  alt={language === 'en' ? event.title : event.title_hi}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-amber-600 text-white px-3 py-1 rounded-full flex items-center space-x-1">
                  <Sparkles size={14} />
                  <span className="text-xs font-semibold">{t('Special', 'विशेष')}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {language === 'en' ? event.title : event.title_hi || event.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {language === 'en' ? event.description : event.description_hi || event.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                    <CalendarDays size={16} className="text-amber-600" />
                    <span>{formatDate(event.event_date)}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                    <Users size={16} className="text-amber-600" />
                    <span>{t('Up to', 'तक')} {event.max_capacity} {t('guests', 'मेहमान')}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                    <DollarSign size={16} className="text-amber-600" />
                    <span>₹{event.price_per_person} {t('per person', 'प्रति व्यक्ति')}</span>
                  </div>
                </div>

                <a
                  href="#reservations"
                  className="block w-full text-center px-4 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-semibold"
                >
                  {t('Book Now', 'अभी बुक करें')}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-8 md:p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              {t('Corporate Events & Private Parties', 'कॉर्पोरेट इवेंट और प्राइवेट पार्टियां')}
            </h3>
            <p className="text-lg mb-6 opacity-90">
              {t(
                'Planning a birthday, kitty party, or corporate event? We offer customizable menus and dedicated service for your special day.',
                'जन्मदिन, किट्टी पार्टी या कॉर्पोरेट इवेंट की योजना बना रहे हैं? हम आपके विशेष दिन के लिए अनुकूलन योग्य मेनू और समर्पित सेवा प्रदान करते हैं।'
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+919810635268"
                className="px-8 py-3 bg-white text-amber-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
              >
                {t('Call Us', 'हमें कॉल करें')}
              </a>
              <a
                href="https://wa.me/919810635268"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                {t('WhatsApp Inquiry', 'WhatsApp पूछताछ')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
