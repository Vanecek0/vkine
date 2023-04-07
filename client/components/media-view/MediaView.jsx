import React, { useEffect, useRef, useState } from 'react'
import mediaViewStyle from './mediaView.module.css'
import noImage from '../../assets/image.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css'
import { ChevronLeft, ChevronRight, Download, XLg } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import config from '../../pages/api/config';
import ProgressiveLoader from '../progressive-loader/ProgressiveLoader';

const MediaView = (props) => {
    const [mediaSource, setMediaSource] = useState(null);
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);
    const swiperMediaViewRef = useRef(null);
    const mediaViewRef = useRef(null);
    const iframeRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const closeModal = () => {
        props.setIsActive(false);
    }


    const downloadImage = (url) => {
        var filename = url.substring(url.lastIndexOf("/") + 1).split("?")[0];
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function () {
            var a = document.createElement('a');
            a.href = window.URL.createObjectURL(xhr.response);
            a.download = filename;
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
        };
        xhr.open('GET', url);
        xhr.send();
    }

    useEffect(() => {
        (swiperMediaViewRef.current) && swiperMediaViewRef.current.swiper.slideTo(props.startIndex)
    },[props.startIndex])

    useEffect(() => {
        if (props.isActive) {
            document.body.classList.add('no-scroll')

        } else {
            document.body.classList.remove('no-scroll')
            if (iframeRef.current != null)
                iframeRef.current.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        }
    }, [props.isActive])

    return (
        <>
            <div ref={mediaViewRef} className={`${mediaViewStyle.mediaViewModal} ${props.isActive ? mediaViewStyle.active : ''}`}>
                <div className={mediaViewStyle.content}>
                    <button className={`${mediaViewStyle.mediaViewClose} m-4`} onClick={closeModal}>
                        <XLg fontSize={25}></XLg>
                    </button>
                    <Swiper
                        ref={swiperMediaViewRef}
                        className={`${mediaViewStyle.mediaSwiper} mediaSwiper`}
                        wrapperClass={mediaViewStyle.swiperWrapper}
                        grabCursor={true}
                        onSlideChange={slide => setActiveIndex(slide.activeIndex)}
                        slidesPerView={1}
                        direction={'horizontal'}
                        mousewheel={{ enabled: true, invert: true, releaseOnEdges: true, thresholdTime: 50 }}
                        observer={true}
                        initialSlide={props.startIndex}
                        navigation={{
                            prevEl: navigationPrevRef.current,
                            nextEl: navigationNextRef.current
                        }}
                        onBeforeInit={(swiper) => {
                            swiper.params.navigation.prevEl = navigationPrevRef.current;
                            swiper.params.navigation.nextEl = navigationNextRef.current;
                        }}
                    >
                        <div className={mediaViewStyle.swiperWrapper}>
                            {
                                props.items.map((item, i) => (
                                    <SwiperSlide className={mediaViewStyle.swiperSlide} key={i}>
                                        {
                                            props.type == "images" ? (
                                                <>
                                                    <button className={`${mediaViewStyle.mediaViewDownload} m-4`} onClick={() => downloadImage(config.mainImage(item.file_path))}>
                                                        <Download fontSize={25}></Download>
                                                    </button>
                                                    <div className={`${mediaViewStyle.mediaContent} ${mediaViewStyle.mediaImage}`}>
                                                        <ProgressiveLoader
                                                            isBackground={false}
                                                            lowRes={(item.file_path != null) ? config.w185(item.file_path) : config.noImage(noImage)}
                                                            highRes={(item.file_path != null) ? config.mainImage(item.file_path) : config.noImage(noImage)}
                                                            blur={10}
                                                        />
                                                    </div>
                                                </>
                                            ) : (
                                                <div className={`${mediaViewStyle.mediaContent} ${mediaViewStyle.mediaVideo}`}>
                                                    {
                                                        (activeIndex == i) ? (
                                                            <iframe ref={iframeRef} allowscriptaccess="always" loading='lazy' src={`https://www.youtube.com/embed/${item.key}?enablejsapi=1&version=3&playerapiid=ytplayer`}
                                                                width="1120" height="630" allow="fullscreen; encrypted-media" title="trailer" allowFullScreen></iframe>
                                                        ) : ''
                                                    }
                                                </div>
                                            )
                                        }
                                    </SwiperSlide>
                                ))
                            }
                        </div>
                        <div className={`${mediaViewStyle.customMediaSwiperNavigation} custom-swiper-navigation swiper-navi-prev`} ref={navigationPrevRef}><ChevronLeft fontWeight={'bold'}></ChevronLeft></div>
                        <div className={`${mediaViewStyle.customMediaSwiperNavigation} custom-swiper-navigation swiper-navi-next`} ref={navigationNextRef}><ChevronRight></ChevronRight></div>
                    </Swiper>
                </div>
            </div>
        </>
    )
}
export default MediaView