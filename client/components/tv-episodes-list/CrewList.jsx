import React, { useEffect, useState } from 'react'
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore,{ Navigation} from 'swiper';
import config from '../../pages/api/config';
import noImagePerson from '../../assets/noimage_person.png';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import crewListStyle from './crewList.module.css';
import Link from 'next/link';

const CrewList = (props) => {
    const navigationPrevRef = React.useRef(null);
    const navigationNextRef = React.useRef(null);

  return (
    <div className={crewListStyle.crew}>
        <Swiper
                grabCursor={true} 
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
             props.crew_list.map((cast, i) => (
                <SwiperSlide key={i}>
                    <div className={crewListStyle.crew__item}>
                        <Link href={'/people/' + cast.id}>
                            <div className={crewListStyle.crew__item__img} style={{backgroundImage: `url(${(cast.profile_path != null) ? config.mainImage(cast.profile_path) : config.noImage(noImagePerson)})`}}></div>
                            <p className={crewListStyle.crew__item__name}>{cast.name}</p>
                            <p className={crewListStyle.crew__item__character}>{cast.job}</p>
                        </Link>
                    </div> 
                </SwiperSlide>
            ))
        }
        <div className={`${crewListStyle.customSwiperNavigation} ${crewListStyle.swiperNaviPrev}`} ref={navigationPrevRef}><ChevronLeft fontWeight={'bold'}></ChevronLeft></div>
        <div className={`${crewListStyle.customSwiperNavigation} ${crewListStyle.swiperNaviNext}`} ref={navigationNextRef}><ChevronRight></ChevronRight></div>
        </Swiper>
    </div>
  )
}

export default CrewList