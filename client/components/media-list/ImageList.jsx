import React, { useEffect, useRef, useState } from 'react'
import tmdbApi from '../../pages/api/tmdbApi'
import { Swiper, SwiperSlide } from 'swiper/react';
import { CameraVideoOffFill, ChevronLeft, ChevronRight, Image } from 'react-bootstrap-icons';
import noImage from '../../assets/image.png';
import config from '../../pages/api/config';
import mediaListStyle from "./mediaList.module.css";
import MediaView, { ViewModal } from '../media-view/MediaView';
import ProgressiveLoader from '../progressive-loader/ProgressiveLoader';
import { useTranslation } from 'next-i18next';
import d_translations from '../../public/locales/cs/translations.json'

const ImageList = (props) => {
    const [items, setItems] = useState([]);
    const [itemIndex, setItemIndex] = useState();
    const [isModalActive, SetIsModalActive] = useState(false)
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);
    const { t } = useTranslation('translations');

    useEffect(() => {
        const getImages = async () => {
            const response = await tmdbApi.getImages(props.mvtvType, props.id, { params: {} })
            setItems(response.backdrops);
        }
        props.items == null ? getImages() : setItems(props.items);
    }, [props.id, itemIndex])

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
                            className={'imageSwiper'}
                            wrapperClass={'imageSwiperWrapper'}
                            spaceBetween={10}
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
                                    <SwiperSlide className={`${mediaListStyle.mediaSlide} ${mediaListStyle.imageSlide}`} key={i} onClick={(e) => { SetIsModalActive(true); setItemIndex(i) }}>
                                        <div className={mediaListStyle.mediaContent}>
                                            <div className={mediaListStyle.mediaImage}>
                                                <ProgressiveLoader
                                                    isBackground={false}
                                                    lowRes={(item.file_path != null) ? config.w185(item.file_path) : config.noImage(noImage)}
                                                    highRes={(item.file_path != null) ? config.w780(item.file_path) : config.noImage(noImage)}
                                                    blur={2}
                                                />
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))
                            }
                            <div className='custom-swiper-navigation swiper-navi-prev' ref={navigationPrevRef}><ChevronLeft fontWeight={'bold'}></ChevronLeft></div>
                            <div className='custom-swiper-navigation swiper-navi-next' ref={navigationNextRef}><ChevronRight></ChevronRight></div>
                        </Swiper>
                        <MediaView items={items} type='images' isActive={isModalActive} setIsActive={SetIsModalActive} startIndex={itemIndex} />
                    </>
                ) : (
                    <div className={mediaListStyle.noResults}>
                        <div>
                            <Image size={40}></Image>
                            <p className='pt-2 m-0'>{t('common.dataNotAvailable', d_translations.common.dataNotAvailable)}</p>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default ImageList