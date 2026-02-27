import path from 'path';
import fs from 'fs';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import TextArticle from '../../components/article/TextArticle';
import { withI18n } from '../../helper/with18n';

export default function DirectoryListing({ legalDirectories }) {
  const router = useRouter();
  const { t } = useTranslation('translations');

  return (
    <>
      <Head>
        <title>{t('legal.documents')} – Vkine.cz</title>
        <meta property="og:title" content={t('head.defaultTitle')} />
        <meta name='description' content={t('head.description')} />
        <meta property="og:description" content={t('head.description')} />
        <meta name='keywords' content={t('head.keywords')} />
        <link rel="canonical" href="https://www.vkine.cz/" />
        <meta property="og:locale" content="cs_CZ" />
        <meta property="og:locale:alternate" content="sk_SK" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.vkine.cz/" />
        <meta property="og:site_name" content={t('head.defaultTitle')} />
        <meta property="og:image" content="https://www.vkine.cz/vkine_meta.png" />
        <meta property="og:image:secure_url" content="https://www.vkine.cz/vkine_meta.png" />
        <meta property="og:image:width" content="1588" />
        <meta property="og:image:height" content="1588" />
        <meta property="og:image:alt" content={t('head.defaultTitle')} />
        <meta property="og:image:type" content="image/png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://www.vkine.cz/vkine_meta.png" />
        <meta name="twitter:title" content={t('head.defaultTitle')} />
        <meta name="twitter:description" content={t('head.description')} />
      </Head>

      <TextArticle
        isBackgroundVisible={false}
        containerClass={"container"}
        innerContainerClass={"bg-dark mb-3 mt-5 p-4"}
      >
        <div>
          <h3>{t('legal.documents')}</h3>
          <ul>
            {legalDirectories.map((directory) => (
              <li key={directory}>
                <a href={`${router.pathname}/${directory}`}>
                  {t(`legal.${directory}`)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </TextArticle>
    </>
  );
}

export const getStaticProps = withI18n(async () => {
  const legalDirPath = path.join(process.cwd(), 'client/pages/documents');

  const legalDirectories = fs.readdirSync(legalDirPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  return {
    props: {
      legalDirectories,
    },
  };
});