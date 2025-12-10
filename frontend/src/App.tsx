import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ChefSpecial } from './components/ChefSpecial';
import { Menu } from './components/Menu';
import { Reservations } from './components/Reservations';
import { Events } from './components/Events';
import { Reviews } from './components/Reviews';
import { Gallery } from './components/Gallery';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { WelcomePopup } from './components/WelcomePopup';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
          <Header />
          <main>
            <Hero />
            <ChefSpecial />
            <Menu />
            <Reservations />
            <Events />
            <Reviews />
            <Gallery />
            <About />
          </main>
          <Footer />
          <WhatsAppButton />
          <WelcomePopup />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
