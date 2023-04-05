import React, { useEffect, useRef, useState } from 'react'
import { mvtvType as mvtv } from '../../pages/api/tmdbApi';
import HeroSlide from '../../components/hero-slide/HeroSlide';
import { MovieListByGenres } from '../../components/movie-list/MovieList';
import i18next from 'i18next';
import { GenresList } from '../../components/constants/genres/Genres';
import { useRouter } from 'next/router';

const TVs = () => {
  const router = useRouter();
  const language = router.locale;
  var addedPage = false;
  const ref = useRef(null)
  var [pageNum, setPageNum] = useState(1);
  const [region, setRegion] = useState();
  const genres = GenresList(mvtv.tv, language);

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
      if (document.documentElement.scrollTop + process.env.LIST_SCROLL_OFFSET_Y >= ref.current.clientHeight && !addedPage) {
        addedPage = !addedPage;
        setPageNum(pageNum => pageNum + process.env.LIST_ADD_COUNT);

        setTimeout(() => {
          addedPage = !addedPage;
        }, process.env.LIST_ADD_DELAY)
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
      {/*<Helmet>
        <title>Seriály – Vkine.cz</title>
        <meta property="og:title" content="Seriály – Vkine.cz"></meta>
        <meta name='description' content='Databáze filmů a seriálů pro každého. Procházejte tisíce titulů, hledejte své oblíbené filmy nebo seriály a objevujte nové. Informace o filmech a seriálech, jejich obsazení, plakáty a trailers k dispozici jedním kliknutím.'></meta>
        <meta property="og:description" content='Databáze filmů a seriálů pro každého. Procházejte tisíce titulů, hledejte své oblíbené filmy nebo seriály a objevujte nové. Informace o filmech a seriálech, jejich obsazení, plakáty a trailers k dispozici jedním kliknutím.'></meta>
        <meta name='keywords' content='filmy, seriály, databáze filmů, databáze seriálů, vyhledávání filmů, vyhledávání seriálů, filmový katalog, seriálový katalog, informace o filmech, informace o seriálech, Vkine.cz, online filmy, online seriály, filmové novinky, seriálové novinky, filmy online, seriály online'></meta>
        <link rel="canonical" href="https://www.vkine.cz/tv"></link>
        <meta property="og:locale" content="cs_CZ"></meta>
        <meta property="og:locale:alternate" content="sk_SK"></meta>
        <meta property="og:locale:alternate" content="en_US"></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:url" content="https://www.vkine.cz/tv"></meta>
        <meta property="og:site_name" content="Seriály – Vkine.cz"></meta>
        <meta property="og:image" content="https://www.vkine.cz/static/meta_image.png"></meta>
        <meta property="og:image:secure_url" content="https://www.vkine.cz/static/meta_image.png"></meta>
        <meta property="og:image:width" content="1588"></meta>
        <meta property="og:image:height" content="1588"></meta>
        <meta property="og:image:alt" content="Seriály – Vkine.cz"></meta>
        <meta property="og:image:type" content="image/png"></meta>
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:image" content="https://www.vkine.cz/static/meta_image.png"></meta>
        <meta name="twitter:title" content="Seriály – Vkine.cz"></meta>
        <meta name="twitter:description" content="Databáze filmů a seriálů pro každého. Procházejte tisíce titulů, hledejte své oblíbené filmy nebo seriály a objevujte nové. Informace o filmech a seriálech, jejich obsazení, plakáty a trailers k dispozici jedním kliknutím."></meta>
  </Helmet>*/}
      <HeroSlide mvtvType={mvtv.tv} with_original_language={process.env.LIST_ORIGINAL_LANGUAGES} language={language} with_origin_country={region}/>
      <div ref={ref} className="container mb-5">
        {
          genres.slice(0, pageNum).map((genre, i) => (
            <MovieListByGenres key={i} genre={genre.id} with_original_language={process.env.LIST_ORIGINAL_LANGUAGES} language={language} mvtvType={mvtv.tv} with_origin_country={region}></MovieListByGenres>
          ))
        }
      </div>
    </>
  );
}

export default TVs;