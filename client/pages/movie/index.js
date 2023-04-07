import React, { useEffect, useRef, useState } from 'react'
import { mvtvType as mvtv } from '../../pages/api/tmdbApi';
import HeroSlide from '../../components/hero-slide/HeroSlide';
import { MovieListByGenres } from '../../components/movie-list/MovieList';
import { GenresList } from '../../components/constants/genres/Genres';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import d_translations from '../../public/locales/cs/translations.json'

const Movies = () => {
  const { locale } = useRouter().locale;
  const language = locale;
  var addedPage = false;
  const ref = useRef(null)
  var [pageNum, setPageNum] = useState(1);
  const addPages = parseInt(process.env.LIST_ADD_COUNT);
  const scrollOffset = parseInt(process.env.LIST_SCROLL_OFFSET_Y);
  const addPagesDelay = parseInt(process.env.LIST_ADD_DELAY);
  const [region, setRegion] = useState();
  const genres = GenresList(mvtv.movie, language);
  const { t } = useTranslation('translations')

  const regionSelectedOption = () => {
    try {
      setRegion(JSON.parse(localStorage.getItem('REGION_SELECTED_OPTION')).value);
    }
    catch (e) {
      setRegion(null)
    }
  }

  const handleScroll = () => {
    try {
      if (document.documentElement.scrollTop + scrollOffset >= ref.current.clientHeight && !addedPage) {
        addedPage = !addedPage;
        setPageNum(pageNum => pageNum + addPages);

        setTimeout(() => {
          addedPage = !addedPage;
        }, addPagesDelay)
      }
    } catch (e) {
      window.removeEventListener('scroll', handleScroll);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  }, [addedPage])

  useEffect(() => {
    regionSelectedOption();
  }, [language, pageNum])

  return (
    <>
      <Head>
        <title>{t('head.moviesTitle', d_translations.head.moviesTitle)}</title>
        <meta property="og:title" content={t('head.moviesTitle', d_translations.head.moviesTitle)}></meta>
        <meta name='description' content={t('head.description', d_translations.head.description)}></meta>
        <meta property="og:description" content={t('head.description', d_translations.head.description)}></meta>
        <meta name='keywords' content={t('head.keywords', d_translations.head.keywords)}></meta>
        <link rel="canonical" href="https://www.vkine.cz/movie"></link>
        <meta property="og:locale" content="cs_CZ"></meta>
        <meta property="og:locale:alternate" content="sk_SK"></meta>
        <meta property="og:locale:alternate" content="en_US"></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:url" content="https://www.vkine.cz/movie"></meta>
        <meta property="og:site_name" content={t('head.moviesTitle', d_translations.head.moviesTitle)}></meta>
        <meta property="og:image" content="https://www.vkine.cz/meta_image.png"></meta>
        <meta property="og:image:secure_url" content="https://www.vkine.cz/meta_image.png"></meta>
        <meta property="og:image:width" content="1588"></meta>
        <meta property="og:image:height" content="1588"></meta>
        <meta property="og:image:alt" content={t('head.moviesTitle', d_translations.head.moviesTitle)}></meta>
        <meta property="og:image:type" content="image/png"></meta>
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:image" content="https://www.vkine.cz/meta_image.png"></meta>
        <meta name="twitter:title" content={t('head.moviesTitle', d_translations.head.moviesTitle)}></meta>
        <meta name="twitter:description" content={t('head.description', d_translations.head.description)}></meta>
      </Head>
      <HeroSlide mvtvType={mvtv.movie} with_original_language={process.env.LIST_ORIGINAL_LANGUAGES} language={language} with_origin_country={region} />
      <div ref={ref} className="container mb-5">
        {
          genres.slice(0, pageNum).map((genre, i) => (
            <MovieListByGenres key={i} genre={genre.id} with_original_language={process.env.LIST_ORIGINAL_LANGUAGES} language={language} mvtvType={mvtv.movie} with_origin_country={region}></MovieListByGenres>
          ))
        }
      </div>
    </>
  );
}

export default Movies;