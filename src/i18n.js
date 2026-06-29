import i18next from 'i18next';
import es from './locales/es.js';

const initI18n = () => i18next.init({
  lng: 'es',
  debug: false,
  resources: {
    es,
  },
});

export default initI18n;
