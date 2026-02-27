import fs from 'fs'
import { useRouter } from 'next/router';
import TextArticle from '../../components/article/TextArticle';
import { useTranslation } from 'next-i18next';
import d_translations from '../../public/locales/cs/translations.json'
import Head from 'next/head';

export default function DirectoryListing({ legalDirectories }) {
  const router = useRouter();
  const { t } = useTranslation('translations')

  return (
    <>
      <Head>
        <title>{t(`legal.documents`, d_translations.legal.documents)} – Vkine.cz</title>
        <meta property="og:title" content={t('head.defaultTitle', d_translations.head.defaultTitle)}></meta>
        <meta name='description' content={t('head.description', d_translations.head.description)}></meta>
        <meta property="og:description" content={t('head.description', d_translations.head.description)}></meta>
        <meta name='keywords' content={t('head.keywords')}></meta>
        <link rel="canonical" href="https://www.vkine.cz/"></link>
        <meta property="og:locale" content="cs_CZ"></meta>
        <meta property="og:locale:alternate" content="sk_SK"></meta>
        <meta property="og:locale:alternate" content="en_US"></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:url" content="https://www.vkine.cz/"></meta>
        <meta property="og:site_name" content={t('head.defaultTitle', d_translations.head.defaultTitle)}></meta>
        <meta property="og:image" content="https://www.vkine.cz/vkine_meta.png"></meta>
        <meta property="og:image:secure_url" content="https://www.vkine.cz/vkine_meta.png"></meta>
        <meta property="og:image:width" content="1588"></meta>
        <meta property="og:image:height" content="1588"></meta>
        <meta property="og:image:alt" content={t('head.defaultTitle', d_translations.head.defaultTitle)}></meta>
        <meta property="og:image:type" content="image/png"></meta>
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:image" content="https://www.vkine.cz/vkine_meta.png"></meta>
        <meta name="twitter:title" content={t('head.defaultTitle', d_translations.head.defaultTitle)}></meta>
        <meta name="twitter:description" content={t('head.description', d_translations.head.description)}></meta>
      </Head>
      <TextArticle isBackgroundVisible={false} containerClass={"container"} innerContainerClass={"bg-dark mb-3 mt-5 p-4"}>
        <div>
          <h3>{t(`legal.documents`, d_translations.legal.documents)}</h3>
          <ul>
            {legalDirectories.map((directory) => (


              <li key={directory}>
                <a href={`${router.pathname}/${directory}`}>{t(`legal.${directory}`, d_translations.legal[directory])}</a>
              </li>

            ))}
          </ul>
        </div>
      </TextArticle>
    </>
  );
}

export async function getStaticProps() {
  const legalDirectories = fs.readdirSync('./client/pages/documents', { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
  return {
    props: {
      legalDirectories,
    },
  };
}
