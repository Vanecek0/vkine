import React, { useEffect, useState } from 'react'
import tmdbApi, { mvtvType } from '../../pages/api/tmdbApi';
import config from '../../pages/api/config';
import tvDetailStyle from './TvDetail.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ArrowLeft, Facebook, Film, Instagram, Link45deg, Twitter } from 'react-bootstrap-icons';
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
import d_translations from '../../public/locales/cs/translations.json'
import Rating from '../../components/rating/Rating';
import ProgressiveLoader from '../../components/progressive-loader/ProgressiveLoader';
import LanguageFallback from '../../components/universal_components/language-fallback/LanguageFallback';
import { CollectionBanner } from '../../components/collections/Collection';
import PageNotFound from '../page-not-found/PageNotFound';
import { useRouter } from 'next/router';
import Head from 'next/head';
import MediaView from '../../components/media-view/MediaView';

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
  const [trailerModalActive, setTrailerModalActive] = useState(false);
  const [trailerItems, setTrailerItems] = useState({});
  const [social, setSocial] = useState({});

  const mvtypePath = path.find(e => 'tv');

  useEffect(() => {
    const getDetail = async () => {
      const params = { language: language }
      try {
        const response = await tmdbApi.detail(mvtvType.tv, tvID, { params })
        titleDashed = (response.title || response.name).toLowerCase().normalize("NFD")
          .replace(/[\u0300-\u036f]+/g, '')
          .replace(/\s+/g, '-')
          .replace(/–/g, '-')
          .replace(/[\/\\"':;,\.\-\!\?\(\)\[\]\{\}\+\*\/=<>\|%~^&#@$€£¥]+/g, '-')
          .replace(/\.{2,}/g, '-')
          .replace(/-{2,}/g, '-')
          .replace(/-+$/g, '');
        (tvID != (response.id + '-' + titleDashed)) ? router.push({ pathname: '../' + mvtypePath + '/' + response.id + '-' + titleDashed }) : null;
        setItem(response);
        setLoading(false)
      } catch (e) { setItem({ status_code: 34 }); setLoading(false) }
    }

    const getSocial = async () => {
      const response = await tmdbApi.getDetailSocial(mvtvType.tv, tvID, { params: {} })
      setSocial(response);
    }

    const getVideos = async () => {
      const videos = await tmdbApi.getVideos(mvtvType.tv, tvID, { params: {} });
      console.log(videos.results)
      setTrailerItems(videos.results);
    }

    if (isReady) {
      getDetail();
      getVideos();
      getSocial();
    }
  }, [isReady, tvID, mvtypePath, language])

  const onTrailerHandler = () => {
    setTrailerModalActive(true);
  }

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
                <Head>
                  <title>{item.title || item.name} – Vkine.cz</title>
                  <meta property="og:title" content={`${item.title || item.name} – Vkine.cz`}></meta>
                  <meta name='description' content={t('head.description')}></meta>
                  <meta property="og:description" content={t('head.description')}></meta>
                  <meta name='keywords' content={t('head.keywords')}></meta>
                  <link rel="canonical" href={`https://www.vkine.cz/${mvtypePath + '/' + tvID + '-' + titleDashed}`}></link>
                  <meta property="og:locale" content="cs_CZ"></meta>
                  <meta property="og:locale:alternate" content="sk_SK"></meta>
                  <meta property="og:locale:alternate" content="en_US"></meta>
                  <meta property="og:type" content="website"></meta>
                  <meta property="og:url" content={`https://www.vkine.cz/${mvtypePath + '/' + tvID + '-' + titleDashed}`}></meta>
                  <meta property="og:site_name" content={`${item.title || item.name} – Vkine.cz`}></meta>
                  <meta property="og:image" content="https://www.vkine.cz/vkine_meta.png"></meta>
                  <meta property="og:image:secure_url" content="https://www.vkine.cz/vkine_meta.png"></meta>
                  <meta property="og:image:width" content="1588"></meta>
                  <meta property="og:image:height" content="1588"></meta>
                  <meta property="og:image:alt" content={`${item.title || item.name} – Vkine.cz`}></meta>
                  <meta property="og:image:type" content="image/png"></meta>
                  <meta name="twitter:card" content="summary_large_image"></meta>
                  <meta name="twitter:image" content="https://www.vkine.cz/vkine_meta.png"></meta>
                  <meta name="twitter:title" content={`${item.title || item.name} – Vkine.cz`}></meta>
                  <meta name="twitter:description" content={t('head.description')}></meta>
                </Head>
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
                    <div onClick={onTrailerHandler} className='mb-4'>
                      <ProgressiveLoader
                        isBackground={true}
                        otherClass={tvDetailStyle.tvContent__poster__img}
                        lowRes={(item.poster_path || item.backdrop_path) != null ? config.w300(item.poster_path ? item.poster_path : item.backdrop_path) : null}
                        highRes={(item.poster_path || item.backdrop_path) != null ? config.w780(item.poster_path ? item.poster_path : item.backdrop_path) : bg.src}
                        blur={2}
                      >
                        <button className={`${tvDetailStyle.btn} btn btn-primary`}>
                          <Film size={40}></Film>
                        </button>
                      </ProgressiveLoader>
                    </div>
                    <div className={`${tvDetailStyle.social} mb-4`}>
                      {social.facebook_id != null && <a target="_blank" rel="noopener noreferrer" href={"https://www.facebook.com/" + social.facebook_id}><Facebook /></a>}
                      {social.twitter_id != null && <a target="_blank" rel="noopener noreferrer" href={"https://www.twitter.com/" + social.twitter_id}><Twitter /></a>}
                      {social.instagram_id != null && <a target="_blank" rel="noopener noreferrer" href={"https://www.instagram.com/" + social.instagram_id}><Instagram /></a>}
                      {item.homepage != null && <a target="_blank" rel="noopener noreferrer" href={item.homepage}><Link45deg /></a>}
                    </div>
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
                      <span className='pe-3'> {t('common.ratingText', d_translations.common.ratingText)} </span>
                    </p>
                    {item.runtime > 0 ? <p>{t('detail.runtime', d_translations.detail.runtime)} : <TimeFormat value={item.runtime} /></p> : ''}
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
                      <CastList title={t('detail.cast', d_translations.detail.cast)} mvtvType={mvtypePath} id={tvID}></CastList>
                    </div>
                  </div>
                </div>
                <div className={`${tvDetailStyle.tvDetails} mb-3 container`}>
                  <div className='mvtv-title mb-3'>
                    <h2 className="text-white mt-3">{t('common.seasons', d_translations.common.seasons)}</h2>
                    <div className='divider'></div>
                  </div>
                  <TvSeasonsList tv_id={item.id} seasons={item.seasons.reverse()} language='en_US' />
                  <div className='mvtv-title mb-3'>
                    <h2 className="text-white mt-3">{t('detail.overview', d_translations.detail.overview)}</h2>
                    <div className='divider'></div>
                  </div>
                  <div className={tvDetailStyle.overview}>
                    {(item.original_title || item.original_name) != null && <p><b>{t('detail.originalTitle', d_translations.detail.originalTitle)}:</b> {item.original_title || item.original_name}</p>}
                    {item.original_language != null && <p><b>{t('detail.originalLanguage', d_translations.detail.originalLanguage)}:</b> {item.original_language}</p>}
                    {item.release_date != null && <p><b>{t('detail.released', d_translations.detail.released)}:</b> {((item.release_date != null && item.release_date != '') ? dateFormat(new Date(item.release_date), "d. m. yyyy") : '-')}</p>}
                    {item.budget > 0 && <p><b>{t('detail.budget', d_translations.detail.budget)}:</b> {item.budget > 0 ? <NumericFormat value={item.budget} displayType={'text'} thousandSeparator={true} prefix={'$'} /> : '-'}</p>}
                    {item.revenue > 0 && <p><b>{t('detail.revenue', d_translations.detail.revenue)}:</b> {item.revenue > 0 ? <NumericFormat value={item.revenue} displayType={'text'} thousandSeparator={true} prefix={'$'} /> : '-'}</p>}
                  </div>
                  <div className='mvtv-title mb-3 mt-3'>
                    <h2 className="text-white mt-3">{t('detail.media', d_translations.detail.media)}</h2>
                    <div className='divider'></div>
                  </div>
                  <Tabs>
                    <Tab title={`${t('detail.videos', d_translations.detail.videos)}`}>
                      <VideoList original_language={item.original_language} id={item.id} mvtvType={mvtypePath == 'movie' ? mvtvType.movie : mvtvType.tv}></VideoList>
                    </Tab>
                    <Tab title={`${t('detail.wallpapers', d_translations.detail.wallpapers)}`}>
                      <ImageList id={item.id} mvtvType={mvtypePath == 'movie' ? mvtvType.movie : mvtvType.tv}></ImageList>
                    </Tab>
                  </Tabs>
                  {mvtypePath == 'movie' && item.belongs_to_collection != null ?
                    (
                      <CollectionBanner collection_id={item.belongs_to_collection != null ? item.belongs_to_collection.id : ''} language={language} />
                    )
                    : null}
                  <div className='mvtv-title mb-3 mt-3'>
                    <h2 className="text-white mt-3">{t('common.similar', d_translations.common.similar)}</h2>
                    <div className='divider'></div>
                  </div>
                  <MovieList id={item.id} type='recommended' language={language} mvtvType={mvtypePath == 'movie' ? mvtvType.movie : mvtvType.tv}></MovieList>
                </div>
                {trailerItems.length > 0 ? (<MediaView items={trailerItems} type='videos' isActive={trailerModalActive} setIsActive={setTrailerModalActive} startIndex={0} />) : ''}
              </>
            ) : <PageNotFound />}
          </>
        )
      }
    </div>
  )
}

export default Detail;