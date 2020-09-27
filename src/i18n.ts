import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const loadPath = () => {
  const baseUrl = process.env.PUBLIC_URL;
  if (baseUrl?.endsWith('/')) {
    return `${baseUrl}/locales/{{lng}}/{{ns}}.json`;
  }
  return `${baseUrl}/locales/{{lng}}/{{ns}}.json`;
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',

    load: 'languageOnly',

    backend: {
      loadPath: loadPath(),
    },

    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',

    debug: process.env.NODE_ENV === 'development',

    interpolation: {
      escapeValue: false, // not needed for react!!
    },

    react: {
      defaultTransParent: 'div', // needed for preact
      wait: true,
    },
  });

export default i18n;
