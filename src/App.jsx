import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from './components/layout/Layout';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Solutions from './pages/solutions/Solutions';
import Products from './pages/products/Products';
import ProductDetail from './pages/products/ProductDetail';
import ProductEnquiry from './pages/products/ProductEnquiry';
import Business from './pages/business/Business';
import Research from './pages/research/Research';
import Partners from './pages/partners/Partners';
import FarmerZone from './pages/farmerzone/FarmerZone';
import Blog from './pages/blog/Blog';
import Careers from './pages/careers/Careers';
import Contact from './pages/contact/Contact';
import GrowthSystem from './pages/usp/GrowthSystem';
import { PrivacyPolicy, Terms } from './pages/legal/Legal';

// Component to handle scrolling to top on route change OR scrolling to hash ID
function ScrollToTopAndHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const currentLang = i18n.language?.startsWith('zh')
      ? 'zh'
      : i18n.language?.startsWith('hi')
        ? 'hi'
        : i18n.language?.startsWith('gu')
          ? 'gu'
          : i18n.language?.startsWith('mr')
            ? 'mr'
            : i18n.language?.startsWith('kn')
              ? 'kn'
              : 'en';
    document.documentElement.lang = currentLang;
    // Update document title for SEO if needed
    const titles = {
      en: 'Jay Agritech | Innovating Agriculture',
      hi: 'जय एग्रीटेक | कृषि नवाचार',
      zh: 'Jay Agritech | 创新农业',
      gu: 'જય એગ્રીટેક | કૃષિમાં નવીનતા',
      mr: 'जय ॲग्रीटेक | कृषीमध्ये नवसंशोधन',
      kn: 'ಜಯ್ ಅಗ್ರಿಟೆಕ್ | ಕೃಷಿಯಲ್ಲಿ ನಾವೀನ್ಯತೆ'
    };
    document.title = titles[currentLang] || titles.en;
  }, [i18n.language]);

  return (
    <>
      <BrowserRouter>
        <ScrollToTopAndHash />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            {/* About / About Us */}
            <Route path="aboutus" element={<About />} />
            <Route path="aboutus/journey" element={<About />} />
            <Route path="aboutus/vision-mission" element={<About />} />
            <Route path="aboutus/leadership" element={<About />} />
            <Route path="aboutus/manufacturing" element={<About />} />
            <Route path="aboutus/certifications" element={<About />} />
            <Route path="aboutus/sustainability" element={<About />} />
            <Route path="aboutus/milestones" element={<About />} />

            {/* Solutions */}
            <Route path="solutions" element={<Solutions />} />
            <Route path="solutions/:slug" element={<Solutions />} />

            {/* Products */}
            <Route path="products" element={<Products />} />
            <Route path="products/:category" element={<Products />} />
            <Route path="products/:category/:slug" element={<ProductDetail />} />
            <Route path="products/:category/:slug/enquire" element={<ProductEnquiry />} />

            {/* Business */}
            <Route path="business" element={<Business />} />
            <Route path="business/contract-mfg" element={<Business />} />
            <Route path="business/research" element={<Business />} />
            <Route path="business/white-label" element={<Business />} />
            <Route path="business/exports" element={<Business />} />

            {/* Research */}
            <Route path="research" element={<Research />} />
            <Route path="research/:slug" element={<Research />} />

            {/* Raw Materials */}
            <Route path="raw-materials" element={<Products />} />

            {/* Presence */}
            <Route path="presence" element={<About />} />

            {/* Partners */}
            <Route path="partners" element={<Partners />} />
            <Route path="partners/dealer" element={<Partners />} />
            <Route path="partners/distributor" element={<Partners />} />
            <Route path="partners/export" element={<Partners />} />

            {/* Blog */}
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<Blog />} />



            {/* Careers */}
            <Route path="careers" element={<Careers />} />

            {/* Contact */}
            <Route path="contact" element={<Contact />} />

            {/* Growth System USP */}
            <Route path="growth-system" element={<GrowthSystem />} />

            {/* Legal */}
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms" element={<Terms />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
