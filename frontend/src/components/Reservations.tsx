import { useState } from 'react';
import { Calendar, Clock, Users, Phone, Mail, User, MessageSquare, Check } from 'lucide-react';
import { supabase, Reservation } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';

export function Reservations() {
  const [formData, setFormData] = useState<Reservation>({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    party_size: 2,
    reservation_date: '',
    reservation_time: '',
    special_requests: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase.from('reservations').insert([formData]);

    setIsSubmitting(false);

    if (!error) {
      setIsSuccess(true);
      setFormData({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        party_size: 2,
        reservation_date: '',
        reservation_time: '',
        special_requests: '',
      });
      setTimeout(() => setIsSuccess(false), 5000);
    }
  };

  const timeSlots = [
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'
  ];

  return (
    <section id="reservations" className="py-20 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t('Reserve Your Table', 'अपनी टेबल बुक करें')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t(
                'Book ahead to secure your spot and enjoy a memorable dining experience',
                'अपनी जगह सुरक्षित करने और यादगार भोजन अनुभव का आनंद लेने के लिए पहले से बुक करें'
              )}
            </p>
          </div>

          {isSuccess && (
            <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-500 rounded-lg flex items-center space-x-2 text-green-800 dark:text-green-300">
              <Check size={20} />
              <span className="font-medium">
                {t('Reservation submitted successfully! We will confirm shortly.', 'आरक्षण सफलतापूर्वक सबमिट किया गया! हम जल्द ही पुष्टि करेंगे।')}
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <div className="flex items-center space-x-2">
                    <User size={16} />
                    <span>{t('Full Name', 'पूरा नाम')} *</span>
                  </div>
                </label>
                <input
                  type="text"
                  required
                  value={formData.customer_name}
                  onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder={t('Enter your name', 'अपना नाम दर्ज करें')}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <div className="flex items-center space-x-2">
                    <Mail size={16} />
                    <span>{t('Email', 'ईमेल')} *</span>
                  </div>
                </label>
                <input
                  type="email"
                  required
                  value={formData.customer_email}
                  onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder={t('your@email.com', 'your@email.com')}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <div className="flex items-center space-x-2">
                    <Phone size={16} />
                    <span>{t('Phone Number', 'फ़ोन नंबर')} *</span>
                  </div>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.customer_phone}
                  onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="+91 98106 35268"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <div className="flex items-center space-x-2">
                    <Users size={16} />
                    <span>{t('Party Size', 'लोगों की संख्या')} *</span>
                  </div>
                </label>
                <select
                  required
                  value={formData.party_size}
                  onChange={(e) => setFormData({ ...formData, party_size: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? t('person', 'व्यक्ति') : t('people', 'लोग')}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>{t('Date', 'तारीख')} *</span>
                  </div>
                </label>
                <input
                  type="date"
                  required
                  value={formData.reservation_date}
                  onChange={(e) => setFormData({ ...formData, reservation_date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <div className="flex items-center space-x-2">
                    <Clock size={16} />
                    <span>{t('Time', 'समय')} *</span>
                  </div>
                </label>
                <select
                  required
                  value={formData.reservation_time}
                  onChange={(e) => setFormData({ ...formData, reservation_time: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="">{t('Select time', 'समय चुनें')}</option>
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <div className="flex items-center space-x-2">
                    <MessageSquare size={16} />
                    <span>{t('Special Requests', 'विशेष अनुरोध')}</span>
                  </div>
                </label>
                <textarea
                  value={formData.special_requests}
                  onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder={t('Birthday celebration, window seat, dietary restrictions, etc.', 'जन्मदिन समारोह, खिड़की की सीट, आहार प्रतिबंध, आदि।')}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-6 px-8 py-4 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? t('Submitting...', 'सबमिट हो रहा है...') : t('Confirm Reservation', 'आरक्षण की पुष्टि करें')}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
