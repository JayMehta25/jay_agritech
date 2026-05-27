import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Analytics } from '@vercel/analytics/next';
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
import '../src/pages/solutions/Solutions.css';
import '../src/pages/legal/Legal.css';
import '../src/i18n/config';

const seoConfig = {
  en: {
    description: "Jay Agritech Pvt. Ltd. is India's leading agri-biotech company offering 60+ biological fertilizers, organic manures, bio-insecticides, and specialty nutrients for sustainable farming.",
    keywords: "Jay Agritech, biological fertilizers, bio fertilizers, organic manure, bio pesticides, bio insecticides, sustainable agriculture, agri-biotech, India, Valsad, Gujarat",
    ogTitle: "Jay Agritech Pvt. Ltd. | Innovating Agriculture, Nurturing Growth",
    ogDescription: "Science-backed biological and organic agricultural solutions for high crop yields and restored soil vitality."
  },
  hi: {
    description: "जय एग्रीटेक प्राइवेट लिमिटेड भारत की अग्रणी एग्री-बायोटेक कंपनी है जो टिकाऊ खेती के लिए 60+ जैविक उर्वरक, प्राकृतिक खाद, जैव-कीटनाशक और सूक्ष्म पोषक तत्व प्रदान करती है।",
    keywords: "जय एग्रीटेक, जैव उर्वरक, जैविक खाद, जैविक कीटनाशक, जैविक कृषि, टिकाऊ खेती, भारत, वलसाड, गुजरात",
    ogTitle: "जय एग्रीटेक प्राइवेट लिमिटेड | कृषि नवाचार, सतत विकास",
    ogDescription: "फसल की पैदावार बढ़ाने और मिट्टी की उर्वरता बहाल करने के लिए विज्ञान समर्थित जैविक कृषि समाधान।"
  },
  zh: {
    description: "杰亚农科 (Jay Agritech Pvt. Ltd.) 是印度领先的农业生物技术公司，提供60多种高效生物肥料、有机肥料、生物杀虫剂及微量元素，助力可持续农业发展。",
    keywords: "Jay Agritech, 杰亚农科, 生物肥料, 有机肥料, 生物杀虫剂, 农业生物技术, 印度, 瓦尔萨德, 古吉拉特邦, 可持续农业",
    ogTitle: "杰亚农科 (Jay Agritech) | 创新农业，绿色增长",
    ogDescription: "提供科学支撑的生物与有机农业解决方案，助力农作物高产与土壤活力恢复。"
  }
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Jay Agritech Pvt. Ltd.",
  "alternateName": "Jay Agritech",
  "url": "https://jay-agritech-7ma5.vercel.app/",
  "logo": "https://jay-agritech-7ma5.vercel.app/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-98251-42359",
    "contactType": "sales",
    "areaServed": "IN",
    "availableLanguage": ["en", "hi", "gu"]
  },
  "sameAs": [
    "https://www.linkedin.com/company/jay-agritech",
    "https://www.facebook.com/jayagritech"
  ]
};

export default function MyApp({ Component, pageProps }) {
  const { i18n } = useTranslation();
  const router = useRouter();

  // Safe client-side language detection and switching post-hydration
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('i18nextLng');
      if (savedLang && ['en', 'hi', 'zh'].includes(savedLang)) {
        if (i18n.language !== savedLang) {
          i18n.changeLanguage(savedLang);
        }
      } else {
        const browserLang = navigator.language || navigator.userLanguage;
        const shortLang = browserLang?.split('-')[0];
        const langToUse = ['en', 'hi', 'zh'].includes(shortLang) ? shortLang : 'en';
        if (i18n.language !== langToUse) {
          i18n.changeLanguage(langToUse);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentLang = i18n.language?.startsWith('zh') ? 'zh' : i18n.language?.startsWith('hi') ? 'hi' : 'en';
      document.documentElement.lang = currentLang;
      const titles = {
        en: 'Jay Agritech | Innovating Agriculture',
        hi: 'जय एग्रीटेक | कृषि नवाचार',
        zh: 'Jay Agritech | 创新农业'
      };
      document.title = titles[currentLang] || titles.en;
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

  const currentLang = i18n.language?.startsWith('zh') ? 'zh' : i18n.language?.startsWith('hi') ? 'hi' : 'en';
  const seo = seoConfig[currentLang] || seoConfig.en;

  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jay-agritech-7ma5.vercel.app/" />
        <meta property="og:title" content={seo.ogTitle} />
        <meta property="og:description" content={seo.ogDescription} />
        <meta property="og:image" content="https://jay-agritech-7ma5.vercel.app/logo.png" />
        <meta property="og:site_name" content="Jay Agritech" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://jay-agritech-7ma5.vercel.app/" />
        <meta property="twitter:title" content={seo.ogTitle} />
        <meta property="twitter:description" content={seo.ogDescription} />
        <meta property="twitter:image" content="https://jay-agritech-7ma5.vercel.app/logo.png" />

        {/* Canonical Link */}
        <link rel="canonical" href={`https://jay-agritech-7ma5.vercel.app${router.pathname}`} />

        {/* JSON-LD Schema Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
        <Analytics />
      </Layout>
    </>
  );
}
