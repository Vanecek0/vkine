import React, { useEffect, useRef } from 'react'
import config from '../../pages/api/config';
import noImage from '../../assets/image.svg';
import dateFormat, { masks } from "dateformat";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import tvSeasonCardStyle from './tvSeasonCard.module.css'
import { useTranslation } from 'next-i18next';

const TvSeasonCard = (props) => {
    const item = props.item;
    var bg = config.noImage(noImage);
    const {t}  = useTranslation('translations');

    if(item.poster_path != null) {
        bg = config.mainImage(item.poster_path)
    }
  return (
    <>
    <div className={`${tvSeasonCardStyle.tvseason} rounded-top mt-4`}>
            <div className={tvSeasonCardStyle.tvseasonCard}>
                <LazyLoadImage
                    wrapperClassName={tvSeasonCardStyle.tvseasonCardImage}
                    effect="blur"
                    src={bg}
                />
            </div>
            <div className={`${tvSeasonCardStyle.tvseasonContent} ms-4 me-4 mt-4 mb-4`}>
                <h3 className={`${tvSeasonCardStyle.title} text-light`}>{item.title || item.name}</h3>
                <p className="text-muted">{dateFormat(new Date(item.air_date), 'yyyy-mm-dd')} | {item.episode_count} {t(['common.episodes'])}</p>
                <p>{item.overview}</p>
            </div>
        </div>
    </>
  )
}

export default TvSeasonCard