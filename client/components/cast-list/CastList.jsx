import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import tmdbApi from '../../pages/api/tmdbApi';
import castListStyle from './CastList.module.css';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import People from '../people/People';

const CastList = (props) => {
    const [casts, setCasts] = useState([]);
    const navigationPrevRef = React.useRef(null);
    const navigationNextRef = React.useRef(null);
    const castListRef = useRef();

    useEffect(() => {
        const getCredits = async () => {
            const response = await tmdbApi.credits(props.mvtvType, props.id);
            setCasts(response.cast);
        }

        getCredits();
    }, [props.mvtvType, props.id])

    return (
        <div ref={castListRef} className={`${castListStyle.casts} casts`}>
            {casts.length > 0 && (
                <>
                    <div className="mvtv-title mb-2">
                        <h2 className="text-white">{props.title}</h2>
                        <div className='divider'></div>
                    </div>
                    <Swiper
                        grabCursor={true}
                        slidesPerView={'auto'}
                        slidesPerGroup={2}
                        className={'castSwiper'}
                        wrapperClass={'castSwiperWrapper'}
                        direction={'horizontal'}
                        mousewheel={{ enabled: true, invert: true, thresholdTime: 50 }}
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
                            casts.map((cast, i) => (

                                <SwiperSlide key={i}>
                                    <People item={cast}></People>
                                </SwiperSlide>
                            ))
                        }
                        <div className='custom-swiper-navigation swiper-navi-prev' ref={navigationPrevRef}><ChevronLeft fontWeight={'bold'}></ChevronLeft></div>
                        <div className='custom-swiper-navigation swiper-navi-next' ref={navigationNextRef}><ChevronRight></ChevronRight></div>
                    </Swiper>
                </>
            )
            }
        </div>
    )
}
export default CastList