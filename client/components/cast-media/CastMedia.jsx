import React, { useEffect, useState } from 'react';
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import castMediaStyle from "./CastMedia.module.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import tmdbApi from '../../pages/api/tmdbApi';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import MovieCard from '../movie-card/MovieCard';

const CastMedia = (props) => {
  const id = props.personId;
  const [items, setItems] = useState([])
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);

  useEffect(() => {
    const getCastMedia = async () => {
      const response = await tmdbApi.getPeopleCreditsCombined(id, { params: {} })
      setItems(response.cast);
    }
    getCastMedia();
  }, [id])
  return (
    <>
      <div className={castMediaStyle.movieList}>
        <Swiper
          grabCursor={true}
          spaceBetween={10}
          className={'castMediaSwiper'}
          wrapperClass={'castMediaSwiperWrapper'}
          slidesPerGroup={2}
          slidesPerView={'auto'}
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
            items.map((item, i) => (
              <SwiperSlide key={i} className={castMediaStyle.castMediaSlide}>
                <MovieCard item={item} mvtvType={item.media_type}></MovieCard>
              </SwiperSlide>
            ))
          }
          <div className='custom-swiper-navigation swiper-navi-prev' ref={navigationPrevRef}><ChevronLeft fontWeight={'bold'}></ChevronLeft></div>
          <div className='custom-swiper-navigation swiper-navi-next' ref={navigationNextRef}><ChevronRight></ChevronRight></div>
        </Swiper>
      </div>
    </>
  )
}

export default CastMedia