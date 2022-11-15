import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ptBR from './pt-BR';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      pt: ptBR
    },
    lng: 'pt',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;