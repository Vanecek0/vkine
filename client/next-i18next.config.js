import I18NextHttpBackend from "i18next-http-backend";
import resourcesToBackend from "i18next-resources-to-backend";

const isBrowser = typeof window !== 'undefined'

export const i18n = {
    defaultLocale: 'cs',
    localeDetection: true,
    locales: ['cs', 'sk', 'en'],
    domains: [
        {
            domain: 'www.vkine.cz',
            defaultLocale: 'cs',
        },
    ],
};
export const fallbackLng = 'cs';
export const nonExplicitSupportedLngs = true;
export const defaultNS = "translations";
export const localePath = 'client/public/locales/';
export const interpolation = {
    escapeValue: false,
};
export const serializeConfig = false;
export const use = isBrowser ? [I18NextHttpBackend] : [];
export const backend = {
    backends: isBrowser ? [I18NextHttpBackend, resourcesToBackend(["cs", "sk", "en"])] : [],
    backendOptions: [
        {
            loadPath: "/locales/{{lng}}/{{ns}}",
            addPath: '/locales/add/{{lng}}/{{ns}}',
        },
    ],
};