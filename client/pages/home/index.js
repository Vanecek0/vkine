import Head from 'next/head';
import React, { useEffect, useState } from 'react'
import HeroSlide from '../../components/hero-slide/HeroSlide';
import { mvtvType, movieType, tvType } from '../api/tmdbApi';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import d_translations from '../../public/locales/cs/translations.json'
import CategoriesMvTv from '../../components/categories-sections/CategoriesMvTv';
import TextArticle from '../../components/article/TextArticle';
import Link from 'next/link';
import { Github, Instagram } from 'react-bootstrap-icons';
import Socials from '../../components/socials/Socials';
import donateBackground from '../../assets/articles/fast_and_furious.jpg'

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
      <div className="container">
        <TextArticle backdrop_path={donateBackground} containerClass={"mb-3 mt-5"}>
            <h2>Podpořte nás a staňte se součástí projektu</h2>
            <p>Líbí se Vám tato stránka a chtěli byste nás podpořit ve vývoji? 
            <br/>Pomocí níže uvedeného tlačítka "Buy me a coffee" nám můžete zaslat peněžitý dar v libovolné hodnotě</p>
            <div>
            <Link className='w-0' href="https://www.buymeacoffee.com/vkinecz" target='_blank'><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=vkinecz&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00" /></Link>
            </div>
            <p className='pt-3'>Sledujte také náš GitHub a Instagram</p>
            <Socials darkMode={true} iconsSize={35}></Socials>
        </TextArticle>
      </div>
    </>
  );
}
