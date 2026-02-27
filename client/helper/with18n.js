import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import nextI18NextConfig from '../next-i18next.config.js'

export const withI18n = (gsp) => {
  return async (context) => {
    const locale = context.locale || 'cs'

    const i18nProps = await serverSideTranslations(
      locale,
      ['translations'],
      nextI18NextConfig
    )

    if (!gsp) {
      return {
        props: {
          ...i18nProps,
        },
      }
    }

    const pageProps = await gsp(context)

    return {
      ...pageProps,
      props: {
        ...pageProps.props,
        ...i18nProps,
      },
    }
  }
}