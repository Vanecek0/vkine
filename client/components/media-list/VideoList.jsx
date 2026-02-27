import React, { useEffect, useRef, useState } from 'react'
import tmdbApi from '../../pages/api/tmdbApi'
import { Swiper, SwiperSlide } from 'swiper/react';
import { CameraVideoOffFill, ChevronLeft, ChevronRight, PlayFill } from 'react-bootstrap-icons';
import mediaListStyle from "./mediaList.module.css"
import MediaView from '../media-view/MediaView';
import ProgressiveLoader from '../progressive-loader/ProgressiveLoader';
import { useTranslation } from 'next-i18next';

const VideoList = (props) => {
    const [items, setItems] = useState([]);
    const [itemIndex, setItemIndex] = useState();
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);
    const [isModalActive, SetIsModalActive] = useState(false)
    const { t } = useTranslation('translations');

    useEffect(() => {
        const getVideos = async () => {
            const params = { language: props.original_language };
            const response = await tmdbApi.getVideos(props.mvtvType, props.id, { params })
            setItems(response.results);
        }
        getVideos();
    }, [props.id])

    return (
        <>
            {
                items.length != 0 ? (
                    <>
                        <Swiper
                            grabCursor={true}
                            slidesPerView={'auto'}
                            observer={true}
                            touchEventsTarget={'container'}
                            spaceBetween={10}
                            className={'videoSwiper'}
                            wrapperClass={'videoSwiperWrapper'}
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
                                    <SwiperSlide className={`${mediaListStyle.mediaSlide} ${mediaListStyle.videoSlide}`} key={i} onClick={(e) => { SetIsModalActive(true); setItemIndex(i) }}>
                                        <div className={mediaListStyle.mediaContent}>
                                            <div className={mediaListStyle.mediaThumbnail}>
                                                <ProgressiveLoader
                                                    isBackground={false}
                                                    lowRes={`https://i.ytimg.com/vi/${item.key}/default.jpg`}
                                                    highRes={`https://i.ytimg.com/vi/${item.key}/hqdefault.jpg`}
                                                    blur={2}
                                                />
                                                <button className={`${mediaListStyle.btn} btn`}>
                                                    <PlayFill size={40}></PlayFill>
                                                </button>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))
                            }
                            <div className='custom-swiper-navigation swiper-navi-prev' ref={navigationPrevRef}><ChevronLeft fontWeight={'bold'}></ChevronLeft></div>
                            <div className='custom-swiper-navigation swiper-navi-next' ref={navigationNextRef}><ChevronRight></ChevronRight></div>
                        </Swiper>
                        <MediaView items={items} type='videos' isActive={isModalActive} setIsActive={SetIsModalActive} startIndex={itemIndex} />
                    </>
                ) : (
                    <div className={mediaListStyle.noResults}>
                        <div>
                            <CameraVideoOffFill size={40}></CameraVideoOffFill>
                            <p className='pt-2 m-0'>{t('common.dataNotAvailable')}</p>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default VideoList