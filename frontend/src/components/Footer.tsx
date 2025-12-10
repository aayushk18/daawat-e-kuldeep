import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/daawat_e_kuldeep', label: 'Instagram' },
    { icon: Facebook, href: 'https://facebook.com/daawatekuldeep', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/daawatekuldeep', label: 'Twitter' },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-4">
              Daawat-e-Kuldeep
            </h3>
            <p className="text-gray-400 mb-4">
              {t(
                'Serving authentic North Indian cuisine with love and tradition since 1995.',
                '1995 से प्यार और परंपरा के साथ प्रामाणिक उत्तर भारतीय व्यंजन परोस रहे हैं।'
              )}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-amber-600 rounded-full flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{t('Quick Links', 'त्वरित लिंक')}</h4>
            <ul className="space-y-2">
              {[
                { label: t('Menu', 'मेनू'), href: '#menu' },
                { label: t('Reservations', 'आरक्षण'), href: '#reservations' },
                { label: t('Events', 'इवेंट्स'), href: '#events' },
                { label: t('Gallery', 'गैलरी'), href: '#gallery' },
                { label: t('About Us', 'हमारे बारे में'), href: '#about' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{t('Contact Info', 'संपर्क जानकारी')}</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-gray-400">
                <MapPin size={18} className="mt-1 flex-shrink-0 text-amber-400" />
                <span>123, Old Delhi Road, Connaught Place, New Delhi - 110001</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Phone size={18} className="flex-shrink-0 text-amber-400" />
                <a href="tel:+919810635268" className="hover:text-amber-400 transition-colors">
                  +91 98106 35268
                </a>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Mail size={18} className="flex-shrink-0 text-amber-400" />
                <a href="mailto:info@daawatekuldeep.com" className="hover:text-amber-400 transition-colors">
                  info@daawatekuldeep.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{t('Opening Hours', 'खुलने का समय')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start space-x-3">
                <Clock size={18} className="mt-1 flex-shrink-0 text-amber-400" />
                <div>
                  <p className="font-semibold text-white">{t('Lunch', 'दोपहर का भोजन')}</p>
                  <p>12:00 PM - 3:00 PM</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Clock size={18} className="mt-1 flex-shrink-0 text-amber-400" />
                <div>
                  <p className="font-semibold text-white">{t('Dinner', 'रात का खाना')}</p>
                  <p>7:00 PM - 11:00 PM</p>
                </div>
              </li>
              <li className="text-sm mt-2">
                <span className="text-amber-400">{t('Open 7 Days a Week', 'सप्ताह के 7 दिन खुला')}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>© 2025 Daawat-e-Kuldeep. {t('All rights reserved.', 'सर्वाधिकार सुरक्षित।')}</p>
          <p className="mt-2">
            {t('Developed by', 'आयुष')} {t('Aayush', 'द्वारा निर्मित')}
          </p>
        </div>
      </div>
    </footer>
  );
}
