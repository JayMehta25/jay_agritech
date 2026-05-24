import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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

  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
