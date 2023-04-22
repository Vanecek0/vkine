import Head from 'next/head';
import React, { useEffect, useState } from 'react'
import HeroSlide from '../../components/hero-slide/HeroSlide';
import { mvtvType, movieType, tvType } from '../api/tmdbApi';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import d_translations from '../../public/locales/cs/translations.json'
import CategoriesMvTv from '../../components/categories-sections/CategoriesMvTv';

export default function Home() {
  const router = useRouter();
  const { locale } = router;
  const language = locale;
  const { t, ready } = useTranslation('translations')
  const [region, setRegion] = useState();


  useEffect(() => {
    const regionSelectedOption = () => {
      try {
        setRegion(JSON.parse(localStorage.getItem('REGION_SELECTED_OPTION')).value);
      }
      catch (e) {
        setRegion(null)
      }
    }
    regionSelectedOption();
  }, [region])

  return (
    <>
      <Head>
        <title>{t('head.defaultTitle', d_translations.head.defaultTitle)}</title>
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
        <meta property="og:image" content="https://www.vkine.cz/meta_image.png"></meta>
        <meta property="og:image:secure_url" content="https://www.vkine.cz/meta_image.png"></meta>
        <meta property="og:image:width" content="1588"></meta>
        <meta property="og:image:height" content="1588"></meta>
        <meta property="og:image:alt" content={t('head.defaultTitle', d_translations.head.defaultTitle)}></meta>
        <meta property="og:image:type" content="image/png"></meta>
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:image" content="https://www.vkine.cz/meta_image.png"></meta>
        <meta name="twitter:title" content={t('head.defaultTitle', d_translations.head.defaultTitle)}></meta>
        <meta name="twitter:description" content={t('head.description', d_translations.head.description)}></meta>
      </Head>
      <HeroSlide mvtvType={mvtvType.movie} language={language} with_origin_country={region} />
      <div className="container">
        <div className="section mb-5">
          <div className="mvtv-title mb-5">
            <h1 className="text-white">{t('common.movies', d_translations.common.movies)}</h1>
            <div className='divider'></div>
          </div>
          <CategoriesMvTv mvtvType={mvtvType.movie} title={t('home.nowPlayingMovies', d_translations.home.nowPlayingMovies)} type={movieType.upcoming} language={language} region={region}></CategoriesMvTv>
        </div>
        <div className="section mb-5">
          <CategoriesMvTv mvtvType={mvtvType.movie} title={t('home.newest', d_translations.home.newest)} type={movieType.now_playing} language={language} region={region}></CategoriesMvTv>
        </div>
        <div className="section mb-5">
          <CategoriesMvTv mvtvType={mvtvType.movie} title={t('home.popular', d_translations.home.popular)} type={movieType.popular} language={language} region={region}></CategoriesMvTv>
        </div>
        <div className="section mb-5">
          <CategoriesMvTv mvtvType={mvtvType.movie} title={t('home.bestRating', d_translations.home.bestRating)} type={movieType.top_rated} language={language} region={region}></CategoriesMvTv>
        </div>

        <div className="section mb-5">
          <div className="mvtv-title mb-5">
            <h1 className="text-white">{t('common.tvs', d_translations.common.tvs)}</h1>
            <div className='divider'></div>
          </div>
          <CategoriesMvTv mvtvType={mvtvType.tv} title={t('home.nowInTV', d_translations.home.nowInTV)} type={tvType.on_the_air} language={language} region={region}></CategoriesMvTv>
        </div>
        <div className="section mb-5">
          <CategoriesMvTv mvtvType={mvtvType.tv} title={t('home.popular', d_translations.home.popular)} type={tvType.popular} language={language} region={region}></CategoriesMvTv>
        </div>
        <div className="section mb-5">
          <CategoriesMvTv mvtvType={mvtvType.tv} title={t('home.bestRating', d_translations.home.bestRating)} type={tvType.top_rated} language={language} region={region}></CategoriesMvTv>
        </div>
      </div>
    </>
  );
}
