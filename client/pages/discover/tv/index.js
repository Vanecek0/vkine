import { useState } from 'react'
import HeroSlide from '../../../components/hero-slide/HeroSlide'
import DiscoverGrid from '../../../components/discover-grid/DiscoverGrid';
import FilterPanel from '../../../components/filter-panel/FilterPanel';
import discoverStyle from "../discover.module.css"
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import { withI18n } from '../../../helper/with18n';

const Discover = (props) => {
  const [filterParams, setFilterParams] = useState();
  const router = useRouter();
  const { locale } = router;
  const language = locale;
  const { t } = useTranslation('translations')

  return (
    <>
      <Head>
        <title>{t('head.discoverTitle')}</title>
        <meta property="og:title" content={t('head.discoverTitle')}></meta>
        <meta name='description' content={t('head.description')}></meta>
        <meta property="og:description" content={t('head.description')}></meta>
        <meta name='keywords' content={t('head.keywords')}></meta>
        <link rel="canonical" href={`https://www.vkine.cz/`}></link>
        <meta property="og:locale" content="cs_CZ"></meta>
        <meta property="og:locale:alternate" content="sk_SK"></meta>
        <meta property="og:locale:alternate" content="en_US"></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:url" content={`https://www.vkine.cz/`}></meta>
        <meta property="og:site_name" content={t('head.discoverTitle')}></meta>
        <meta property="og:image" content="https://www.vkine.cz/vkine_meta.png"></meta>
        <meta property="og:image:secure_url" content="https://www.vkine.cz/vkine_meta.png"></meta>
        <meta property="og:image:width" content="1588"></meta>
        <meta property="og:image:height" content="1588"></meta>
        <meta property="og:image:alt" content={t('head.discoverTitle')}></meta>
        <meta property="og:image:type" content="image/png"></meta>
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:image" content="https://www.vkine.cz/vkine_meta.png"></meta>
        <meta name="twitter:title" content={t('head.discoverTitle')}></meta>
        <meta name="twitter:description" content={t('head.description')}></meta>
      </Head>
      <HeroSlide mvtvType={'tv'} language={language}></HeroSlide>
      <div className={`${discoverStyle.discoverWrapper} container-xxl d-flex`}>
        <FilterPanel setParams={setFilterParams} mvtvType={props.mvtvType} language={language}></FilterPanel>
        <DiscoverGrid filterParams={filterParams} mvtvType={'tv'} language={language} />
      </div>
    </>
  )
}

export const getStaticProps = withI18n();
export default Discover