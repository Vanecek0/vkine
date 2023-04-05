import React from 'react';
import movieCardStyle from './MovieCard.module.css';
import PropTypes from 'prop-types';
import { mvtvType } from '../../pages/api/tmdbApi';
import config from '../../pages/api/config';
import Link from 'next/link';
import { PlayFill } from 'react-bootstrap-icons';
import noImage from '../../assets/image.png';
import Rating from '../rating/Rating';
import ProgressiveLoader from '../progressive-loader/ProgressiveLoader';

const MovieCard = (props) => {
    const item = props.item;
    const with_title = props.with_title == null ? true : props.with_title
    const with_rating = props.with_rating == null ? true : props.with_rating
    const nameDashed = (item.title || item.name) != null ? (item.title || item.name).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[\s:,]+/g, '-').replace(/[\/\\]+/g, '-') : '';
    const link = '/' + mvtvType[props.mvtvType] + '/' + item.id + '-' + nameDashed;

    return (
        <Link href={link} className={`${movieCardStyle.movieLink} movie-link`}>
            <div className={`${movieCardStyle.movieCard} movieCard`}>
                <div className={movieCardStyle.movieCardImage}>
                    <ProgressiveLoader
                        isBackground={false}
                        lowRes={item.poster_path || item.backdrop_path != null ? config.w92(item.poster_path || item.backdrop_path) : null}
                        highRes={item.poster_path || item.backdrop_path != null ? config.w400(item.poster_path || item.backdrop_path) : config.noImage(noImage).src}
                        blur={2} />
                </div>

                <button className={`${movieCardStyle.btn} btn btn-primary`}>
                    <PlayFill size={40}></PlayFill>
                </button>
                {with_rating ? (
                    <div className={`${movieCardStyle.rating} rating`}>
                        <Rating rating={item.vote_average} vote_count={item.vote_count} />
                    </div>
                ) : null}
            </div>
            {with_title ? (<h3 className={`${movieCardStyle.title} title text-light`}>{item.title || item.name}</h3>) :
                null}
        </Link>
    )
}

MovieCard.propTypes = {
    item: PropTypes.object,
}

export default MovieCard
