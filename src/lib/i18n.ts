import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const jpModules = import.meta.glob('@/locales/jp/*.json', { eager: true });
const enModules = import.meta.glob('@/locales/en/*.json', { eager: true });

const buildNamespace = (modules: Record<string, unknown>) => {
  const ns: Record<string, Record<string, string>> = {};
  for (const path in modules) {
    const fileName = path.split('/').pop()?.replace('.json', ''); // lấy tên file làm namespace
    if (fileName) {
      ns[fileName] = (modules[path] as { default: Record<string, string> }).default;
    }
  }
  return ns;
};

i18n.use(initReactI18next).init({
  resources: {
    jp: buildNamespace(jpModules),
    en: buildNamespace(enModules),
  },
  lng: 'jp',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
