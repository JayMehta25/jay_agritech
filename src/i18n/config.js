import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from './locales/en.json';
import hiTranslations from './locales/hi.json';
import zhTranslations from './locales/zh.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      hi: { translation: hiTranslations },
      zh: { translation: zhTranslations }
    },
    supportedLngs: ['en', 'hi', 'zh'],
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    lng: 'en', // Force English initially on both server and client to prevent hydration mismatches
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
