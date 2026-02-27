import path from 'path'

const nextI18NextConfig = {
  i18n: {
    defaultLocale: 'cs',
    locales: ['cs', 'sk', 'en'],
  },
  defaultNS: 'translations',
  fallbackLng: 'cs',
  localePath: path.resolve('client/public/locales'),
}

export default nextI18NextConfig