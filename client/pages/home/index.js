import Head from 'next/head';
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import HeroSlide from '../../components/hero-slide/HeroSlide';
import MovieList from '../../components/movie-list/MovieList';
import { mvtvType, movieType, tvType } from '../api/tmdbApi';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
/*import RandomGenerator from '../components/random-generator/RandomGenerator';
import ReactGA from 'react-ga4';*/


export default function Home() {
  const router = useRouter();
  const { locale } = router;
  const language = locale;
  const { t, ready } = useTranslation()
  //const [region, setRegion] = useState();

  /*const regionSelectedOption = () => {
    try {
      setRegion(JSON.parse(localStorage.getItem('REGION_SELECTED_OPTION')).value);
    }
    catch (e) {
      setRegion(null)
    }
  }*/


  /*useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    ReactGA.event({
      category: "test",
      action: "call action",
      label: "test label"
    })
    regionSelectedOption();
  }, [])*/

  return (
    <>
      <Head>
        <title>Vkine.cz – Databáze filmů a seriálů pro opravdové nadšence</title>
        <meta property="og:title" content="Vkine.cz – Databáze filmů a seriálů pro opravdové nadšence"></meta>
        <meta name='description' content='Databáze filmů a seriálů pro každého. Procházejte tisíce titulů, hledejte své oblíbené filmy nebo seriály a objevujte nové. Informace o filmech a seriálech, jejich obsazení, plakáty a trailers k dispozici jedním kliknutím.'></meta>
        <meta property="og:description" content='Databáze filmů a seriálů pro každého. Procházejte tisíce titulů, hledejte své oblíbené filmy nebo seriály a objevujte nové. Informace o filmech a seriálech, jejich obsazení, plakáty a trailers k dispozici jedním kliknutím.'></meta>
        <meta name='keywords' content='filmy, seriály, databáze filmů, databáze seriálů, vyhledávání filmů, vyhledávání seriálů, filmový katalog, seriálový katalog, informace o filmech, informace o seriálech, Vkine.cz, online filmy, online seriály, filmové novinky, seriálové novinky, filmy online, seriály online'></meta>
        <link rel="canonical" href="https://www.vkine.cz/"></link>
        <meta property="og:locale" content="cs_CZ"></meta>
        <meta property="og:locale:alternate" content="sk_SK"></meta>
        <meta property="og:locale:alternate" content="en_US"></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:url" content="https://www.vkine.cz/"></meta>
        <meta property="og:site_name" content="Vkine.cz – Databáze filmů a seriálů pro opravdové nadšence"></meta>
        <meta property="og:image" content="https://www.vkine.cz/static/meta_image.png"></meta>
        <meta property="og:image:secure_url" content="https://www.vkine.cz/static/meta_image.png"></meta>
        <meta property="og:image:width" content="1588"></meta>
        <meta property="og:image:height" content="1588"></meta>
        <meta property="og:image:alt" content="Vkine.cz – Databáze filmů a seriálů pro opravdové nadšence"></meta>
        <meta property="og:image:type" content="image/png"></meta>
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:image" content="https://www.vkine.cz/static/meta_image.png"></meta>
        <meta name="twitter:title" content="Vkine.cz – Databáze filmů a seriálů pro opravdové nadšence"></meta>
        <meta name="twitter:description" content="Databáze filmů a seriálů pro každého. Procházejte tisíce titulů, hledejte své oblíbené filmy nebo seriály a objevujte nové. Informace o filmech a seriálech, jejich obsazení, plakáty a trailers k dispozici jedním kliknutím."></meta>
      </Head>
      <div>test: {locale}</div>
      <HeroSlide mvtvType={mvtvType.movie} language={language} /*with_origin_country={region} *//>
      {/*<div className="container">
        <div className="section mb-5">
          <div className="mvtv-title mb-5">
            <h1 className="text-white">{t('common.movies')}</h1>
            <div className='divider'></div>
          </div>
          <div className="section_header mb-2">
            <h2>{t(['home.nowPlayingMovies'])}</h2>
            <Link href="/discover/movie">
              <button className='btn btn-outline-light'>{t(['common.showMore'])}</button>
            </Link>
          </div>
          {<MovieList mvtvType={mvtvType.movie} type={movieType.now_playing} with_original_language={process.env.LIST_ORIGINAL_LANGUAGES} language={language} with_origin_country={region}></MovieList>}
        </div>
        <div className="section mb-5">
          <div className="section_header mb-2">
            <h2>{t(['home.newest'])}</h2>
            <Link href="/discover/movie">
              <button className='btn btn-outline-light'>{t(['common.showMore'])}</button>
            </Link>
          </div>
          <MovieList mvtvType={mvtvType.movie} type={movieType.upcoming} with_original_language={process.env.LIST_ORIGINAL_LANGUAGES} language={language} with_origin_country={region}></MovieList>
        </div>

        <div className="section mb-5">
          <div className="mvtv-title mb-5">
            <h1 className="text-white">{t(['common.tvs'])}</h1>
            <div className='divider'></div>
          </div>
          <div className="section_header mb-2">
            <h2>{t(['home.nowInTV'])}</h2>
            <Link href="/discover/tv">
              <button className='btn btn-outline-light'>{t(['common.showMore'])}</button>
            </Link>
          </div>
          <MovieList mvtvType={mvtvType.tv} type={tvType.on_the_air} with_original_language={process.env.LIST_ORIGINAL_LANGUAGES} language={language} with_origin_country={region}></MovieList>
        </div>
        <div className="section mb-5">
          <div className="section_header mb-2">
            <h2>{t(['home.popular'])}</h2>
            <Link href="/discover/tv">
              <button className='btn btn-outline-light'>{t(['common.showMore'])}</button>
            </Link>
          </div>
          <MovieList mvtvType={mvtvType.tv} type={tvType.popular} with_original_language={process.env.LIST_ORIGINAL_LANGUAGES} language={language} with_origin_country={region}></MovieList>
        </div>
        <div className="section mb-5">
          <div className="section_header mb-2">
            <h2>{t(['home.bestRating'])}</h2>
            <Link href="/discover/tv">
              <button className='btn btn-outline-light'>{t(['common.showMore'])}</button>
            </Link>
          </div>
          <MovieList mvtvType={mvtvType.tv} type={tvType.top_rated} with_original_language={process.env.LIST_ORIGINAL_LANGUAGES} language={language} with_origin_country={region}></MovieList>
        </div>
        <RandomGenerator language={language} />
      </div>*/}
    </>
  );
}
