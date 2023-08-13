import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Mousewheel } from 'swiper';
import movieListStyle from './MovieList.module.css';
import tmdbApi, { mvtvType } from '../../pages/api/tmdbApi';
import MovieCard from '../movie-card/MovieCard';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import 'swiper/swiper.min.css'
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import languagesByRegion from '../constants/LanguagesByRegions.json'
import d_translations from '../../public/locales/cs/translations.json'
import { useSession } from 'next-auth/react';

SwiperCore.use([Navigation, Mousewheel]);

const MovieList = (props) => {
    const [items, setItems] = useState();
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);
    const movieListRef = useRef();
    const session = useSession();
    console.log(session)
    const user = session.status != 'loading' && session.data ? session.data.user : null;
    const [loading, setLoading] = useState(true);
    //const [isFavourite, setIsFavourite] = useState(Object.keys(favourites).length !== 0)
    const { t } = useTranslation('translations');

    const getFavourite = async (mvtvType, userId, mvtvId) => {
        const response = await fetch(`/api/user_fav_mvtv/${mvtvType}/${userId}/${mvtvId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return response;

    };

    useEffect(() => {
        const getMovieTVList = async () => {
            let response = null;
            const params = {
                language: props.language,
                with_original_language: `${(props.with_origin_country) ? languagesByRegion[props.with_origin_country].join("|") : process.env.LIST_ORIGINAL_LANGUAGES}`,
                without_keywords: process.env.LIST_HIDDEN_GENRES,
                region: props.region,
            };
            try {
                if (props.type !== 'recommended') {
                    switch (props.mvtvType) {
                        case mvtvType.movie:
                            response = await tmdbApi.getMoviesList(props.type, { params });
                            break;
                        default:
                            response = await tmdbApi.getTvList(props.type, { params });
                            break;
                    }
                } else {
                    response = await tmdbApi.recommended(props.mvtvType, props.id, { params });
                    if (response.results.length <= 0) { response = await tmdbApi.similar(props.mvtvType, props.id, { params }); }
                }
                setItems(response.results);
                setLoading(false)
            } catch (e) {
                console.error(e);
                setLoading(false)
            }
        }
        props.items == null ? getMovieTVList() : setItems(props.items);
    }, [props.language, props.mvtvType, props.with_origin_country, props.with_original_language]);

    return (
        <div ref={movieListRef} className={movieListStyle.movieList} tabIndex={1}>
            {
                items &&
                (
                    <div className={`${loading ? 'pending' : 'MovieListContent'}`}>
                        {items.length > 0 ? (
                            <Swiper
                                grabCursor={true}
                                tabIndex={1}
                                slidesPerGroup={2}
                                spaceBetween={10}
                                direction={'horizontal'}
                                touchEventsTarget={'container'}
                                slidesPerView={'auto'}
                                navigation={{
                                    prevEl: navigationPrevRef.current,
                                    nextEl: navigationNextRef.current
                                }}
                                onBeforeInit={(swiper) => {
                                    swiper.params.navigation.prevEl = navigationPrevRef.current;
                                    swiper.params.navigation.nextEl = navigationNextRef.current;
                                }}
                            >
                                {
                                    items.map((item, i) => (
                                        <SwiperSlide className={movieListStyle.swiperSlide} key={i}>
                                            <MovieCard isFavourite={getFavourite(props.mvtvType, user != null ? user.id : null, item.id).then(response => response)} item={item} mvtvType={props.mvtvType}></MovieCard>
                                        </SwiperSlide>
                                    ))
                                }
                                <div className={`${movieListStyle.customSwiperNavigation} ${movieListStyle.swiperNaviPrev}`} ref={navigationPrevRef}><ChevronLeft fontWeight={'bold'} /></div>
                                <div className={`${movieListStyle.customSwiperNavigation} ${movieListStyle.swiperNaviNext}`} ref={navigationNextRef}><ChevronRight /></div>
                            </Swiper>
                        ) : (<div className={`${movieListStyle.noResults} text-white`}>{t('common.dataNotAvailable', d_translations.common.dataNotAvailable)}</div>)}
                    </div>
                )
            }
        </div>
    )
}

export const MovieListByGenres = (props) => {
    const [items, setItems] = useState();
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);
    const movieListRef = useRef();
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        const getMovieTVGenresList = async () => {
            let response = null;
            const params = {
                language: props.language,
                with_original_language: `${(props.with_origin_country) ? languagesByRegion[props.with_origin_country].join("|") : process.env.LIST_ORIGINAL_LANGUAGES}`,
                without_keywords: process.env.LIST_HIDDEN_GENRES,
                with_genres: props.genre,
                region: props.region,
            };
            try {
                switch (props.mvtvType) {
                    case mvtvType.movie:
                        response = await tmdbApi.getMoviesListByGenres({ params });
                        break;
                    default:
                        response = await tmdbApi.getTvListByGenres({ params })
                        break;
                }
                setItems(response.results);
                setLoading(false)
            } catch (e) {
                console.error(e);
                setLoading(false)
            }
        }
        getMovieTVGenresList();
    }, [props.mvtvType, props.language]);

    return (
        <div className={`${loading ? 'pending' : 'MovieListGenresContent'}`}>

            {items && items.length ? (
                <div ref={movieListRef} className="section mb-5 pt-5">
                    <div className="section_header mb-2">
                        <h2>{t(`genres.${props.genre}`, d_translations.genres[props.genre])}</h2>
                        <Link href={"/discover/" + props.mvtvType}>
                            <button className='btn btn-outline-light'>{t('common.showMore', d_translations.common.showMore)}</button>
                        </Link>
                    </div>
                    <div className={movieListStyle.movieList}>
                        <Swiper
                            grabCursor={true}
                            spaceBetween={10}
                            direction={'horizontal'}
                            slidesPerView={'auto'}
                            navigation={{
                                prevEl: navigationPrevRef.current,
                                nextEl: navigationNextRef.current
                            }}
                            onBeforeInit={(swiper) => {
                                swiper.params.navigation.prevEl = navigationPrevRef.current;
                                swiper.params.navigation.nextEl = navigationNextRef.current;
                            }}
                        >
                            {
                                items.map((item, i) => (
                                    <SwiperSlide className={movieListStyle.swiperSlide} key={i}>
                                        <MovieCard item={item} mvtvType={props.mvtvType}></MovieCard>
                                    </SwiperSlide>
                                ))
                            }
                            <div className={`${movieListStyle.customSwiperNavigation} ${movieListStyle.swiperNaviPrev}`} ref={navigationPrevRef}><ChevronLeft fontWeight={'bold'} /></div>
                            <div className={`${movieListStyle.customSwiperNavigation} ${movieListStyle.swiperNaviNext}`} ref={navigationNextRef}><ChevronRight /></div>
                        </Swiper>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

MovieList.propTypes = {
    mvtvType: PropTypes.string.isRequired,
    region: PropTypes.string,
}

MovieListByGenres.propTypes = {
    mvtvType: PropTypes.string.isRequired,
    genre: PropTypes.number,
    region: PropTypes.string,
}

export default MovieList