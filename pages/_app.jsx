import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import Layout from '../src/components/layout/Layout';
import '../src/styles/index.css';
import '../src/components/layout/Footer.css';
import '../src/components/layout/Navbar.css';
import '../src/components/ui/Bottle3D.css';
import '../src/components/ui/ChatBot.css';
import '../src/components/ui/GenericPage.css';
import '../src/components/ui/GrowthSystemVisual.css';
import '../src/components/ui/ProcessFlow.css';
import '../src/pages/about/About.css';
import '../src/pages/home/Home.css';
import '../src/pages/business/Business.css';
import '../src/i18n/config';

export default function MyApp({ Component, pageProps }) {
  const { i18n } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = i18n.language;
      const titles = {
        en: 'Jay Agritech | Innovating Agriculture',
        hi: 'जय एग्रीटेक | कृषि नवाचार',
        zh: 'Jay Agritech | 创新农业'
      };
      document.title = titles[i18n.language] || titles.en;
    }
  }, [i18n.language]);

  useEffect(() => {
    const handleScrollToHash = () => {
      const { asPath } = router;
      if (asPath.includes('#')) {
        const hash = asPath.split('#').pop();
        const element = document.getElementById(hash);
        if (element) {
          setTimeout(() => {
            const navbar = document.getElementById('main-navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 80;
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - navbarHeight - 20; // 20px extra breathing room!

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }, 180);
        }
      } else {
        window.scrollTo({ top: 0, left: 0 });
      }
    };

    // Run on initial mount
    handleScrollToHash();

    // Register route events for Next.js transitions
    router.events.on('routeChangeComplete', handleScrollToHash);
    router.events.on('hashChangeComplete', handleScrollToHash);

    return () => {
      router.events.off('routeChangeComplete', handleScrollToHash);
      router.events.off('hashChangeComplete', handleScrollToHash);
    };
  }, [router]);

  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
