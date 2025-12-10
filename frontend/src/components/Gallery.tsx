import { useEffect, useState } from 'react';
import { Instagram, Camera } from 'lucide-react';
import { supabase, GalleryPhoto } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';

export function Gallery() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    const { data, error } = await supabase
      .from('gallery_photos')
      .select('*')
      .eq('is_featured', true)
      .order('created_at', { ascending: false });

    if (data && !error) {
      setPhotos(data);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('Customer Gallery', 'ग्राहक गैलरी')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            {t(
              'Share your dining experience with us! Tag @daawat_e_kuldeep on Instagram',
              'हमारे साथ अपना भोजन अनुभव साझा करें! Instagram पर @daawat_e_kuldeep टैग करें'
            )}
          </p>
          <a
            href="https://instagram.com/daawat_e_kuldeep"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all hover:scale-105 font-semibold"
          >
            <Instagram size={20} />
            <span>{t('Follow Us on Instagram', 'Instagram पर फॉलो करें')}</span>
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map(photo => (
            <div
              key={photo.id}
              className="relative group overflow-hidden rounded-lg aspect-square cursor-pointer hover:scale-105 transition-transform"
            >
              <img
                src={photo.image_url}
                alt={photo.caption}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="font-semibold mb-1">{photo.customer_name}</p>
                  <p className="text-sm opacity-90">{photo.caption}</p>
                  {photo.instagram_handle && (
                    <p className="text-xs mt-2 flex items-center space-x-1 text-pink-300">
                      <Instagram size={12} />
                      <span>{photo.instagram_handle}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-8 text-center">
          <Camera size={48} className="mx-auto text-amber-600 mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            {t('Get Featured!', 'फीचर हो जाएं!')}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            {t(
              'Share your favorite moments at Daawat-e-Kuldeep on Instagram and tag us. The best photos will be featured on our website and social media!',
              'Instagram पर Daawat-e-Kuldeep में अपने पसंदीदा पलों को साझा करें और हमें टैग करें। सर्वश्रेष्ठ तस्वीरें हमारी वेबसाइट और सोशल मीडिया पर फीचर की जाएंगी!'
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
