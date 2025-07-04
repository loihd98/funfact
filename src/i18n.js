import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
// don't want to use this?
// have a look at the Quick start guide 
// for passing in lng and translations on init
import translationEN from '../public/locales/en/value.json';
import translationVI from '../public/locales/vi/value.json';
import translationJP from '../public/locales/ja/value.json';
import translationKO from '../public/locales/ko/value.json';



i18n
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'ja',
    debug: true,
    resources: {
        en: {
            translation: translationEN
        },
        vi: {
            translation: translationVI
        },
        ja: {
            translation: translationJP
        },
        ko: {
          translation: translationKO
      }
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
    
  });


export default i18n;