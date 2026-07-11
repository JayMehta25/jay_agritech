import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from './locales/en.json';
import hiTranslations from './locales/hi.json';
import zhTranslations from './locales/zh.json';
import guTranslations from './locales/gu.json';
import mrTranslations from './locales/mr.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      hi: { translation: hiTranslations },
      zh: { translation: zhTranslations },
      gu: { translation: guTranslations },
      mr: { translation: mrTranslations }
    },
    supportedLngs: ['en', 'hi', 'zh', 'gu', 'mr'],
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    lng: 'en', // Force English initially on both server and client to prevent hydration mismatches
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

// Override i18n.t to avoid developer-provided English fallbacks leaking into Hindi UI.
// Many components call t('key', 'English text') — that string becomes the defaultValue.
// When the active language is Hindi, we want to ignore those string fallbacks and
// return an empty defaultValue instead so untranslated keys don't show English.
const _origT = i18n.t.bind(i18n);
i18n.t = (key, options) => {
  try {
    const lang = i18n.language || '';
    const isHiOrGuOrMr = lang.startsWith('hi') || lang.startsWith('gu') || lang.startsWith('mr');

    // If options is a plain string (common developer pattern), treat it as defaultValue
    if (typeof options === 'string') {
      if (isHiOrGuOrMr) return _origT(key, { defaultValue: '' });
      return _origT(key, { defaultValue: options });
    }

    // If options is an object that contains defaultValue, and we're on Hindi, Gujarati, or Marathi, strip it
    if (options && typeof options === 'object' && Object.prototype.hasOwnProperty.call(options, 'defaultValue')) {
      if (isHiOrGuOrMr) {
        const cloned = { ...options, defaultValue: '' };
        return _origT(key, cloned);
      }
      return _origT(key, options);
    }

    // Fallback: delegate to original
    return _origT(key, options);
  } catch (e) {
    // In case of unexpected errors, fall back to original behavior to avoid breaking UI
    return _origT(key, options);
  }
};

export default i18n;
