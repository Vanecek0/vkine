const I18NextHttpBackend = require("i18next-http-backend");
const resourcesToBackend = require("i18next-resources-to-backend");

const isBrowser = typeof window !== 'undefined'

module.exports = {
    i18n: {
        defaultLocale: 'cs',
        localeDetection: true,
        locales: ['cs', 'sk', 'en'],
        domains: [
            {
                domain: 'www.vkine.cz',
                defaultLocale: 'cs',
            },
        ],
    },
    fallbackLng: 'cs',
    nonExplicitSupportedLngs: true,
    defaultNS: "translations",
    localePath: 'client/public/locales/',
    interpolation: {
        escapeValue: false,
    },
    serializeConfig: false,
    use: isBrowser ? [I18NextHttpBackend] : [],
    backend: {
        //backends: [resourcesToBackend(["cs", "sk", "en"])],
        backends: isBrowser ? [I18NextHttpBackend, resourcesToBackend(["cs", "sk", "en"])] : [],
        backendOptions: [
            {
                loadPath: "/locales/{{lng}}/{{ns}}",
                addPath: '/locales/add/{{lng}}/{{ns}}',
            },
        ],
    },
}