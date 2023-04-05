import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import tmdbApi, { mvtvType } from '../../pages/api/tmdbApi';
import config from '../../pages/api/config';
import tvDetailStyle from './TvDetail.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ArrowLeft } from 'react-bootstrap-icons';
import CastList from '../../components/cast-list/CastList';
import { NumericFormat } from 'react-number-format';
import TimeFormat from '../../components/time-format/TimeFormat';
import dateFormat, { masks } from "dateformat";
import Tabs, { Tab } from '../../components/Tabs/Tabs';
import VideoList from '../../components/media-list/VideoList';
import MovieList from '../../components/movie-list/MovieList';
import ImageList from '../../components/media-list/ImageList';
import TvSeasonsList from '../../components/tv-seasons-list/TvSeasonsList';
import noImage from '../../assets/image.svg'
import { useTranslation } from 'next-i18next';
import i18next from 'i18next';
import Rating from '../../components/rating/Rating';
import ProgressiveLoader from '../../components/progressive-loader/ProgressiveLoader';
import LanguageFallback from '../../components/universal_components/language-fallback/LanguageFallback';
import { CollectionBanner } from '../../components/collections/Collection';
import PageNotFound from '../page-not-found/PageNotFound';
import { useRouter } from 'next/router';

const Detail = (props) => {
  const router = useRouter();
  const { query, isReady } = router;
  const { tvID } = query;
  const [item, setItem] = useState();

  const path = router.pathname.split('/').filter(e => e);
  var bg = config.noImage(noImage);
  const language = router.locale;
  const { t } = useTranslation('translations');
  const [loading, setLoading] = useState(true);
  var titleDashed = '';

  const mvtypePath = path.find(e => 'tv');

  useEffect(() => {
    const getDetail = async () => {
      const params = { language: language }
      try {
        const response = await tmdbApi.detail(mvtvType.tv, tvID, { params })
        titleDashed = (response.title || response.name).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[\s:,]+/g, '-').replace(/[\/\\]+/g, '-');
        (tvID != (response.id + '-' + titleDashed)) ? router.push({ pathname: '../' + mvtypePath + '/' + response.id + '-' + titleDashed }) : null;
        setItem(response);
        setLoading(false)
      } catch (e) { setItem({ status_code: 34 }); setLoading(false) }
    }
    if (isReady) {
      getDetail();
      window.scrollTo(0, 0);
    }
  }, [isReady, tvID, mvtypePath, language])

  if (!isReady) {
    return null;
  }

  return (
    <div className={`${loading ? 'pending' : 'detailContent'}`}>
      {
        item && (
          <>
            {item.status_code !== 34 ? (
              <>
                {/*<Helmet>
                  <title>{item.title || item.name} – Vkine.cz</title>
                  <meta property="og:title" content={`${item.title || item.name} – Vkine.cz`}></meta>
                  <meta name='description' content='Databáze filmů a seriálů pro každého. Procházejte tisíce titulů, hledejte své oblíbené filmy nebo seriály a objevujte nové. Informace o filmech a seriálech, jejich obsazení, plakáty a trailers k dispozici jedním kliknutím.'></meta>
                  <meta property="og:description" content='Databáze filmů a seriálů pro každého. Procházejte tisíce titulů, hledejte své oblíbené filmy nebo seriály a objevujte nové. Informace o filmech a seriálech, jejich obsazení, plakáty a trailers k dispozici jedním kliknutím.'></meta>
                  <meta name='keywords' content='filmy, seriály, databáze filmů, databáze seriálů, vyhledávání filmů, vyhledávání seriálů, filmový katalog, seriálový katalog, informace o filmech, informace o seriálech, Vkine.cz, online filmy, online seriály, filmové novinky, seriálové novinky, filmy online, seriály online'></meta>
                  <link rel="canonical" href={`https://www.vkine.cz/${mvtypePath + '/' + id + '-' + titleDashed}`}></link>
                  <meta property="og:locale" content="cs_CZ"></meta>
                  <meta property="og:locale:alternate" content="sk_SK"></meta>
                  <meta property="og:locale:alternate" content="en_US"></meta>
                  <meta property="og:type" content="website"></meta>
                  <meta property="og:url" content={`https://www.vkine.cz/${mvtypePath + '/' + id + '-' + titleDashed}`}></meta>
                  <meta property="og:site_name" content={`${item.title || item.name} – Vkine.cz`}></meta>
                  <meta property="og:image" content="https://www.vkine.cz/static/meta_image.png"></meta>
                  <meta property="og:image:secure_url" content="https://www.vkine.cz/static/meta_image.png"></meta>
                  <meta property="og:image:width" content="1588"></meta>
                  <meta property="og:image:height" content="1588"></meta>
                  <meta property="og:image:alt" content={`${item.title || item.name} – Vkine.cz`}></meta>
                  <meta property="og:image:type" content="image/png"></meta>
                  <meta name="twitter:card" content="summary_large_image"></meta>
                  <meta name="twitter:image" content="https://www.vkine.cz/static/meta_image.png"></meta>
                  <meta name="twitter:title" content={`${item.title || item.name} – Vkine.cz`}></meta>
                  <meta name="twitter:description" content="Databáze filmů a seriálů pro každého. Procházejte tisíce titulů, hledejte své oblíbené filmy nebo seriály a objevujte nové. Informace o filmech a seriálech, jejich obsazení, plakáty a trailers k dispozici jedním kliknutím."></meta>
            </Helmet>*/}
                <ProgressiveLoader
                  isBackground={true}
                  otherClass={tvDetailStyle.banner}
                  lowRes={(item.backdrop_path) != null ? config.w300(item.backdrop_path ? item.backdrop_path : item.poster_path) : ''}
                  highRes={(item.backdrop_path) != null ? config.mainImage(item.backdrop_path ? item.backdrop_path : item.poster_path) : ''}
                  blur={5}
                />
                <div className={`mb-3 ${tvDetailStyle.tvContent} container`}>
                  <button className={`${tvDetailStyle.backArrow} ${tvDetailStyle.btn} btn`} onClick={() => router.back()}><ArrowLeft size={30}></ArrowLeft></button>
                  <div className={tvDetailStyle.tvContent__poster}>
                    <ProgressiveLoader
                      isBackground={true}
                      otherClass={tvDetailStyle.tvContent__poster__img}
                      lowRes={(item.poster_path || item.backdrop_path) != null ? config.w300(item.poster_path ? item.poster_path : item.backdrop_path) : null}
                      highRes={(item.poster_path || item.backdrop_path) != null ? config.w780(item.poster_path ? item.poster_path : item.backdrop_path) : bg}
                      blur={2}
                    />
                  </div>
                  <div className={tvDetailStyle.tvContent__info}>
                    <div className={tvDetailStyle.title}>
                      <h1>{item.title || item.name} <small className='text-small'>{item.release_date && `(${new Date(item.release_date).getUTCFullYear()})`}</small></h1>
                      <h3>{item.original_title || item.original_name}</h3>
                    </div>
                    <div className={tvDetailStyle.genres}>
                      {
                        item.genres && item.genres.slice(0, 5).map((genre, i) => (
                          <span key={i} className={`${tvDetailStyle.genres__item} badge`}>{genre.name}</span>
                        ))
                      }
                    </div>

                    <p className='mt-3 d-inline-flex align-items-center'>
                      <span className={`${tvDetailStyle.rating} d-block me-2`}>
                        <Rating rating={item.vote_average} vote_count={item.vote_count} />
                      </span>
                      <span className='pe-3'> {t(['common.ratingText'])} </span>
                    </p>
                    {item.runtime > 0 ? <p>{t(['detail.runtime'])} : <TimeFormat value={item.runtime} /></p> : ''}
                    <div className={`${tvDetailStyle.overview} mt-3 mb-3`}>
                      <LanguageFallback
                        language={language}
                        resKey={'overview'}
                        fetchData={tmdbApi.detail}
                        mainParams={[mvtypePath == 'movie' ? mvtvType.movie : mvtvType.tv, item.id]}
                        maxTextLength={510}
                        isString={true}
                        otherParams={{ language: 'en' }}
                      />
                    </div>
                    <p className='text-muted'><em>{item.tagline}</em></p>
                    <div className={tvDetailStyle.cast}>
                      <CastList title={t(['detail.cast'])} mvtvType={mvtypePath} id={tvID}></CastList>
                    </div>
                  </div>
                </div>
                <div className={`${tvDetailStyle.tvDetails} mb-3 container`}>
                  <div className='mvtv-title mb-3'>
                    <h2 className="text-white mt-3">{t(['common.seasons'])}</h2>
                    <div className='divider'></div>
                  </div>
                  <TvSeasonsList tv_id={item.id} seasons={item.seasons.reverse()} language='en_US' />
                  <div className='mvtv-title mb-3'>
                    <h2 className="text-white mt-3">{t(['detail.overview'])}</h2>
                    <div className='divider'></div>
                  </div>
                  <div className={tvDetailStyle.overview}>
                    {(item.original_title || item.original_name) != null && <p><b>{t(['detail.originalTitle'])}:</b> {item.original_title || item.original_name}</p>}
                    {item.original_language != null && <p><b>{t(['detail.originalLanguage'])}:</b> {item.original_language}</p>}
                    {item.release_date != null && <p><b>{t(['detail.released'])}:</b> {((item.release_date != null && item.release_date != '') ? dateFormat(new Date(item.release_date), "d. m. yyyy") : '-')}</p>}
                    {item.budget > 0 && <p><b>{t(['detail.budget'])}:</b> {item.budget > 0 ? <NumericFormat value={item.budget} displayType={'text'} thousandSeparator={true} prefix={'$'} /> : '-'}</p>}
                    {item.revenue > 0 && <p><b>{t(['detail.revenue'])}:</b> {item.revenue > 0 ? <NumericFormat value={item.revenue} displayType={'text'} thousandSeparator={true} prefix={'$'} /> : '-'}</p>}
                  </div>
                  <div className='mvtv-title mb-3 mt-3'>
                    <h2 className="text-white mt-3">{t(['detail.media'])}</h2>
                    <div className='divider'></div>
                  </div>
                  <Tabs>
                    <Tab title={`${t(['detail.videos'])}`}>
                      <VideoList original_language={item.original_language} id={item.id} mvtvType={mvtypePath == 'movie' ? mvtvType.movie : mvtvType.tv}></VideoList>
                    </Tab>
                    <Tab title={`${t(['detail.wallpapers'])}`}>
                      <ImageList id={item.id} mvtvType={mvtypePath == 'movie' ? mvtvType.movie : mvtvType.tv}></ImageList>
                    </Tab>
                  </Tabs>
                  {mvtypePath == 'movie' && item.belongs_to_collection != null ?
                    (
                      <CollectionBanner collection_id={item.belongs_to_collection != null ? item.belongs_to_collection.id : ''} language={language} />
                    )
                    : null}
                  <div className='mvtv-title mb-3 mt-3'>
                    <h2 className="text-white mt-3">{t(['common.similar'])}</h2>
                    <div className='divider'></div>
                  </div>
                  <MovieList id={item.id} type='recommended' language={language} mvtvType={mvtypePath == 'movie' ? mvtvType.movie : mvtvType.tv}></MovieList>
                </div>
              </>
            ) : <PageNotFound />}
          </>
        )
      }
    </div>
  )
}

export default Detail;