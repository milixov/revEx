import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

import translationEN from './locales/en/translation.json';

const resources = {
  en: {
    translation: translationEN,
  },
};

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
