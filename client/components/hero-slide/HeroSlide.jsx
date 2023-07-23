import React, { useEffect, useState, useRef } from 'react';
import tmdbApi, { mvtvType, movieType, tvType } from '../../pages/api/tmdbApi';
import config from '../../pages/api/config';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.css'
import Rating from '../rating/Rating';
import heroStyle from '../hero-slide/HeroSlide.module.css'
import noImage from '../../assets/image.png'
import noBackground from '../../assets/default_background1.png';
import { useTranslation } from 'react-i18next';
import { Genres, GenresList } from '../constants/genres/Genres';
import ProgressiveLoader from '../progressive-loader/ProgressiveLoader';
import LanguageFallback from '../universal_components/language-fallback/LanguageFallback';
import ShowMoreLess from '../universal_components/show-more-less/ShowMoreLess';
import languagesByRegion from '../constants/LanguagesByRegions.json'
import MediaView from '../media-view/MediaView';
import d_translations from '../../public/locales/cs/translations.json'

export default function HeroSlide(props) {
    const [mvtvItems, setmvtvItems] = useState();
    const genres = GenresList(props.mvtvType, props.language);
    const [trailerModalActive, setTrailerModalActive] = useState(false);
    const [trailerItems, setTrailerItems] = useState({});
    const [randomInitialSlide, setRandomInitialSlide] = useState(0);

    useEffect(() => {
        const getMvtv = async () => {
            const params = {
                page: 1,
                language: props.language,
                with_original_language: `${(props.with_origin_country) ? languagesByRegion[props.with_origin_country].join("|") : process.env.LIST_ORIGINAL_LANGUAGES}`,
                without_keywords: process.env.LIST_HIDDEN_GENRES
            }
            const universalParams = {
                page: 1,
                language: props.language,
                with_original_language: process.env.LIST_ORIGINAL_LANGUAGES,
                without_keywords: process.env.LIST_HIDDEN_GENRES
            }
            try {
                const method = (props.mvtvType === mvtvType.movie) ? tmdbApi.getMoviesList : tmdbApi.getTvList;
                var response = await method((props.mvtvType === mvtvType.movie) ? movieType.upcoming : tvType.on_the_air, { params });
                if (response.results.length <= 0) {
                    response = await method((props.mvtvType === mvtvType.movie) ? movieType.upcoming : tvType.on_the_air, { universalParams });
                }
                setmvtvItems(response.results)
                setRandomInitialSlide(Math.floor(Math.random() * response.results.length))
            } catch (e) {
                setmvtvItems([{ error: e }])
            }
        }

        getMvtv();
    }, [props.mvtvType, props.language, props.region, props.with_origin_country, props.with_original_language]);

    return (
        <>
            <div className={heroStyle.heroSlide}>
                <div className={heroStyle.heroSlideBody}>
                    {
                        mvtvItems && (
                            <>
                                <div className={heroStyle.heroSlideContent}>
                                    <Swiper
                                        modules={[Autoplay]}
                                        grabCursor={true}
                                        spaceBetween={0}
                                        slidesPerView={1}
                                        className={heroStyle.heroSlideSwiper}
                                        wrapperClass={heroStyle.heroSlideSwiperWrapper}
                                        initialSlide={randomInitialSlide}
                                        loop={false}
                                        speed={1000}
                                        autoplay={{
                                            delay: 10000,
                                            pauseOnMouseEnter: true,
                                        }}
                                        fadeEffect={{ crossFade: true }}
                                        effect={'fade'}
                                        watchSlidesProgress
                                    >
                                        {
                                            mvtvItems != null && mvtvItems.map((item, i) => (
                                                <SwiperSlide key={i} className={heroStyle.heroSwiperSlide}>
                                                    {({ isActive }) => (
                                                        <HeroSlideItem setTrailerItems={setTrailerItems} setIsTrailerModalActive={setTrailerModalActive} mvtvType={props.mvtvType} genres={genres} language={props.language} item={item} className={`${isActive ? heroStyle.active : ''}`} />
                                                    )}
                                                </SwiperSlide>
                                            ))
                                        }
                                    </Swiper>
                                </div>
                                {trailerItems && trailerItems.length ? (
                                    <>
                                        <MediaView items={trailerItems} type='videos' isActive={trailerModalActive} setIsActive={setTrailerModalActive} startIndex={0} />
                                    </>
                                ) : ''}
                            </>
                        )
                    }
                </div>
            </div>
        </>
    );
};

const HeroSlideItem = (props) => {
    let history = useRouter();
    const item = props.item;
    var bg = config.noImage(noImage);
    const ref = useRef(null)
    const { t } = useTranslation();
    const [trailerItems, setTrailerItems] = useState();
    const nameDashed = (item.title || item.name) != null ? (item.title || item.name).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[\s:,]+/g, '-').replace(/[\/\\]+/g, '-') : '';
    const link = '/' + mvtvType[props.mvtvType] + '/' + item.id + '-' + nameDashed;

    const onTrailerItemsHandle = async () => {
        props.setTrailerItems(trailerItems);
        props.setIsTrailerModalActive(true);
    }

    useEffect(() => {
        const trailerItems = async () => {
            const videos = (props.mvtvType === mvtvType.movie ? await tmdbApi.getVideos(mvtvType.movie, item.id, { params: {} }) : await tmdbApi.getVideos(mvtvType.tv, item.id, { params: {} }));
            setTrailerItems(videos.results);
        }
        trailerItems();
    }, [item])

    return (
        <>
            <div ref={ref} className={`${heroStyle.heroSlide__item} ${props.className}`}>
                <>
                    <ProgressiveLoader
                        isBackground={true}
                        otherClass={heroStyle.heroSlide__bac}
                        lowRes={item.backdrop_path ? config.w300(item.backdrop_path) : null}
                        highRes={item.backdrop_path ? config.mainImage(item.backdrop_path) : config.noBac(noBackground)}
                        blur={5}
                    />
                    <div className={`${heroStyle.heroSlide__item__content} container-fluid pt-4`}>
                        <div className={`${heroStyle.heroSlide__content__wrapper} container`}>
                            <div className={heroStyle.heroSlide__item__content__info}>
                                <div onClick={() => history.push(link)}>
                                    <h2 className={heroStyle.title}>{item.title == null ? item.name : item.title}</h2>
                                    <div className={`mt-3 d-flex flex-wrap ${heroStyle.genres}`}><Genres genresList={props.genres} genres={item.genre_ids} language={props.language} mvtvType={props.mvtvType}></Genres></div>
                                    {item.runtime > 0 ? <p className='mt-3'>{item.runtime}</p> : ''}
                                    <div className={heroStyle.overview}>
                                        {

                                            item.overview.length <= 0 || item.overview == null ?
                                                <LanguageFallback
                                                    language={props.language}
                                                    resKey={'overview'}
                                                    fetchData={tmdbApi.detail}
                                                    mainParams={[props.mvtvType, item.id]}
                                                    maxTextLength={225}
                                                    isString={true}
                                                    showMoreLessButton={false}
                                                    otherParams={{ language: props.language }}
                                                />
                                                : (<ShowMoreLess text={item.overview} maxLength={225} showButton={false} />)
                                        }
                                    </div>
                                </div>
                                <div className={heroStyle.btns}>
                                    <button className='btn btn-lg btn-primary' onClick={() => history.push(link)}>
                                        {t('common.findMore', d_translations.common.findMore)}
                                    </button>
                                    <button className='btn btn-outline-light btn-lg' onClick={onTrailerItemsHandle}>
                                        {t('hero.playTrailer', d_translations.hero.playTrailer)}
                                    </button>
                                </div>
                            </div>
                            <div onClick={() => history.push(link)}>
                                <div className={heroStyle.heroSlide__item__content__poster}>
                                    <ProgressiveLoader
                                        isBackground={false}
                                        lowRes={(item.poster_path || item.backdrop_path) != null ? config.w92(item.poster_path ? item.poster_path : item.backdrop_path) : null}
                                        highRes={(item.poster_path || item.backdrop_path) != null ? config.w780(item.poster_path ? item.poster_path : item.backdrop_path) : bg}
                                        blur={5}
                                    />
                                    <div className={heroStyle.rating}>
                                        <Rating rating={item.vote_average} vote_count={item.vote_count} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {item.title}
                </>
            </div>
        </>
    )
}