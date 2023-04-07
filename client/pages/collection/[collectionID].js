import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import i18next from 'i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ArrowLeft } from 'react-bootstrap-icons';
import config from '../api/config';
import tmdbApi from '../api/tmdbApi';
import noImage from '../../assets/image.svg';
import collectionDetailStyle from './collectionDetail.module.css';
import ProgressiveLoader from '../../components/progressive-loader/ProgressiveLoader';
import Rating from '../../components/rating/Rating';
import LanguageFallback from '../../components/universal_components/language-fallback/LanguageFallback';
import TimeFormat from '../../components/time-format/TimeFormat';
import MovieList from '../../components/movie-list/MovieList';
//import { Helmet } from 'react-helmet-async';
import d_translations from '../../public/locales/cs/translations.json'
import PageNotFound from '../page-not-found/PageNotFound';
import Head from 'next/head';

const Collection = () => {
    const router = useRouter();
    const { query, isReady } = router;
    const { collectionID } = router.query;
    const [item, setItem] = useState();
    const [backdrops, setBackdrops] = useState();
    var bg = config.noImage(noImage);
    const language = i18next.language;
    const { t } = useTranslation('translations');

    useEffect(() => {
        const getCollectionDetail = async () => {
            const params = { language: language }
            try {
                const response = await tmdbApi.getMovieCollection(collectionID, { params })
                setItem(response);
                const titleDashed = (response.name).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[\s:,]+/g, '-');
                (collectionID != (response.id + '-' + titleDashed)) ? router.push({ pathname: '../collection/' + response.id + '-' + titleDashed }) : null;
            } catch (e) { setItem({ status_code: 34 }) }
        }
        const getCollectionBackdrops = async () => {
            const params = { language: language }
            const response = await tmdbApi.getMovieCollectionImages(collectionID, { params })
            setBackdrops(response.backdrops);
        }
        if (isReady) {
            getCollectionDetail();
            getCollectionBackdrops();
        }
    }, [isReady, collectionID, language])

    if (!isReady) {
        return null;
    }

    return (
        item && (
            <>
                {item.status_code !== 34 ? (
                    <>
                        <Head>
                            <title>{item.title || item.name} – Vkine.cz</title>
                            <meta property="og:title" content={`${item.title || item.name} – Vkine.cz`}></meta>
                            <meta name='description' content={t('head.description', d_translations.head.description)}></meta>
                            <meta property="og:description" content={t('head.description', d_translations.head.description)}></meta>
                            <meta name='keywords' content={t('head.keywords', d_translations.head.keywords)}></meta>
                            <link rel="canonical" href={`https://www.vkine.cz/`}></link>
                            <meta property="og:locale" content="cs_CZ"></meta>
                            <meta property="og:locale:alternate" content="sk_SK"></meta>
                            <meta property="og:locale:alternate" content="en_US"></meta>
                            <meta property="og:type" content="website"></meta>
                            <meta property="og:url" content={`https://www.vkine.cz/`}></meta>
                            <meta property="og:site_name" content={`${item.title || item.name} – Vkine.cz`}></meta>
                            <meta property="og:image" content="https://www.vkine.cz/meta_image.png"></meta>
                            <meta property="og:image:secure_url" content="https://www.vkine.cz/meta_image.png"></meta>
                            <meta property="og:image:width" content="1588"></meta>
                            <meta property="og:image:height" content="1588"></meta>
                            <meta property="og:image:alt" content={`${item.title || item.name} – Vkine.cz`}></meta>
                            <meta property="og:image:type" content="image/png"></meta>
                            <meta name="twitter:card" content="summary_large_image"></meta>
                            <meta name="twitter:image" content="https://www.vkine.cz/meta_image.png"></meta>
                            <meta name="twitter:title" content={`${item.title || item.name} – Vkine.cz`}></meta>
                            <meta name="twitter:description" content={t('head.description', d_translations.head.description)}></meta>
                        </Head>
                        <ProgressiveLoader
                            isBackground={true}
                            otherClass={collectionDetailStyle.banner}
                            lowRes={(item.backdrop_path) != null ? config.w300(item.backdrop_path ? item.backdrop_path : item.poster_path) : ''}
                            highRes={(item.backdrop_path) != null ? config.mainImage(item.backdrop_path ? item.backdrop_path : item.poster_path) : ''}
                            blur={5}
                        />
                        <div className={`mb-3 ${collectionDetailStyle.movieContent} container`}>
                            <button className={`${collectionDetailStyle.backArrow} ${collectionDetailStyle.btn} btn`} onClick={() => router.back()}><ArrowLeft size={30}></ArrowLeft></button>
                            <div className={collectionDetailStyle.movieContent__poster}>
                                <ProgressiveLoader
                                    isBackground={true}
                                    otherClass={collectionDetailStyle.movieContent__poster__img}
                                    lowRes={(item.poster_path || item.backdrop_path) != null ? config.w300(item.poster_path ? item.poster_path : item.backdrop_path) : null}
                                    highRes={(item.poster_path || item.backdrop_path) != null ? config.w780(item.poster_path ? item.poster_path : item.backdrop_path) : bg}
                                    blur={2}
                                />
                            </div>
                            <div className={collectionDetailStyle.movieContent__info}>
                                <div className={collectionDetailStyle.title}>
                                    <h1>{item.title || item.name} <small className='text-small'>{item.release_date && `(${new Date(item.release_date).getUTCFullYear()})`}</small></h1>
                                    <h3>{item.original_title || item.original_name}</h3>
                                </div>
                                <div className={collectionDetailStyle.genres}>
                                    {
                                        item.genres && item.genres.slice(0, 5).map((genre, i) => (
                                            <span key={i} className={`${collectionDetailStyle.genres__item} badge`}>{genre.name}</span>
                                        ))
                                    }
                                </div>

                                <p className='mt-3 d-inline-flex align-items-center'>
                                    <span className={`${collectionDetailStyle.rating} d-block me-2`}>
                                        <Rating rating={item.vote_average} vote_count={item.vote_count} />
                                    </span>
                                    <span className='pe-3'> {t('common.ratingText', d_translations.common.ratingText)} </span>
                                </p>
                                {item.runtime > 0 ? <p>{t('detail.runtime', d_translations.detail.runtime)} : <TimeFormat value={item.runtime} /></p> : ''}
                                <div className={`${collectionDetailStyle.overview} mt-3 mb-3`}>
                                    <LanguageFallback
                                        language={language}
                                        resKey={'overview'}
                                        fetchData={tmdbApi.getMovieCollection}
                                        mainParams={[item.id]}
                                        maxTextLength={510}
                                        isString={true}
                                        otherParams={{ language: 'en' }}
                                    />
                                </div>
                                <p><b>{t('collection.partsTitle', d_translations.collection.partsTitle)}:</b> {item.parts.length}</p>
                                <MovieList items={item.parts} mvtvType={'movie'}></MovieList>
                            </div>
                        </div>
                    </>
                ) : <PageNotFound />}
            </>
        )
    )
}

export default Collection