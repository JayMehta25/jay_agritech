import React, { useEffect, useState, startTransition } from 'react';
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
import logoImgAsset from '../src/assets/new_title.png';
import { assetSrc } from '../src/utils/assetSrc';

const logoImg = assetSrc(logoImgAsset);

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

const getFaqSchema = (lang) => {
  const faqs = {
    en: [
      { q: "What is Jay Agritech?", a: "Jay Agritech Pvt. Ltd. is a pioneering agri-biotech company based in Valsad, Gujarat, India. We manufacture high-efficacy bio-fertilizers, organic manures, bio-insecticides, and micronutrients." },
      { q: "What products do you offer?", a: "We offer 60+ premium agricultural solutions across categories: Bio Fertilizers, Biostimulants, Organic Nutrients, Bio Insecticides, and Micronutrients." },
      { q: "Where is your company located?", a: "Our corporate headquarters and manufacturing facilities are based in Valsad, Gujarat, India, offering excellent logistical connectivity across West India." }
    ],
    hi: [
      { q: "जय एग्रीटेक क्या है?", a: "जय एग्रीटेक प्राइवेट लिमिटेड वलसाड, गुजरात में स्थित एक अग्रणी कृषि-बायोटेक कंपनी है जो जैविक उर्वरक, प्राकृतिक खाद, जैव-कीटनाशक और सूक्ष्म पोषक तत्व प्रदान करती है।" },
      { q: "आप कौन से उत्पाद प्रदान करते हैं?", a: "हम जैविक उर्वरक, बायोसिटमुलेंट्स, प्राकृतिक पोषक तत्व, जैविक कीटनाशक और सूक्ष्म पोषक तत्वों सहित 60+ प्रीमियम कृषि समाधान प्रदान करते हैं।" },
      { q: "आपकी कंपनी कहाँ स्थित है?", a: "हमारा मुख्यालय और उन्नत विनिर्माण संयंत्र वलसाड, गुजरात, भारत में स्थित हैं।" }
    ],
    zh: [
      { q: "什么是 Jay Agritech？", a: "杰亚农科 (Jay Agritech Pvt. Ltd.) 是印度领先的农业生物技术公司，提供60多种高效生物肥料、有机肥料、生物杀虫剂及微量元素，助力可持续农业发展。" },
      { q: "你们提供哪些产品？", a: "我们生产5大类60余种优质农业解决方案：生物肥料、生物刺激素、有机营养物、生物杀虫剂以及微量元素。" },
      { q: "你们公司总部在哪里？", a: "我们的公司总部与现代化生态工厂均位于印度古吉拉特邦瓦尔萨德 (Valsad, Gujarat, India)。" }
    ]
  };
  const list = faqs[lang] || faqs.en;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": list.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };
};


export default function MyApp({ Component, pageProps }) {
  const { i18n } = useTranslation();
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    const handleStart = (url) => {
      const currentPath = router.pathname;
      const newPath = url.split('?')[0].split('#')[0];
      if (newPath !== currentPath) {
        setLoading(true);
      }
    };
    
    const handleComplete = () => {
      setLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  // Safe client-side language detection and switching post-hydration
  useEffect(() => {
    if (!hydrated || typeof window === 'undefined') {
      return;
    }

    const savedLang = localStorage.getItem('i18nextLng');
    const browserLang = navigator.language || navigator.userLanguage;
    const shortLang = browserLang?.split('-')[0];
    const langToUse = savedLang && ['en', 'hi', 'zh'].includes(savedLang)
      ? savedLang
      : ['en', 'hi', 'zh'].includes(shortLang)
        ? shortLang
        : 'en';

    if (i18n.language !== langToUse) {
      startTransition(() => {
        i18n.changeLanguage(langToUse);
      });
    }
  }, [hydrated, i18n]);

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqSchema(currentLang)) }}
        />
      </Head>
      {loading && (
        <div className="global-route-loader">
          <style dangerouslySetInnerHTML={{ __html: `
            .global-route-loader {
              position: fixed;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              background: rgba(255, 255, 255, 0.95);
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 99999;
              backdrop-filter: blur(8px);
              animation: loaderFadeIn 0.3s ease-out;
              cursor: wait;
              user-select: none;
              -webkit-user-select: none;
            }
            .loader-content {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              pointer-events: none;
            }
            .loader-logo {
              width: 96px;
              height: 96px;
              object-fit: contain;
              animation: logo-rotate 1.8s linear infinite;
              filter: drop-shadow(0 4px 12px rgba(46, 125, 50, 0.2));
              pointer-events: none;
            }
            @keyframes logo-rotate {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes loaderFadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
          `}} />
          <div className="loader-content">
            <img src={logoImg} alt="Loading..." className="loader-logo" />
          </div>
        </div>
      )}
      <Layout>
        <Component {...pageProps} />
        <Analytics />
      </Layout>
    </>
  );
}
