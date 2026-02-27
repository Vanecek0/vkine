import config from '../../pages/api/config';
import noImage from '../../assets/image.svg';
import dateFormat from "dateformat";
import tvSeasonCardStyle from './tvSeasonCard.module.css'
import { useTranslation } from 'next-i18next';
import ProgressiveLoader from '../progressive-loader/ProgressiveLoader';

const TvSeasonCard = (props) => {
    const item = props.item;
    const { t } = useTranslation('translations');

    return (
        <>
            <div className={`${tvSeasonCardStyle.tvseason} rounded-top mt-4`}>
                <div className={`${tvSeasonCardStyle.tvseasonCard}`}>
                    <span className={tvSeasonCardStyle.tvseasonCardImage}>
                        <ProgressiveLoader
                            isBackground={false}
                            lowRes={item.poster_path || item.backdrop_path != null ? config.w92(item.poster_path || item.backdrop_path) : null}
                            highRes={item.poster_path || item.backdrop_path != null ? config.w400(item.poster_path || item.backdrop_path) : config.noImage(noImage).src}
                            blur={2} />
                    </span>

                </div>
                <div className={`${tvSeasonCardStyle.tvseasonContent} ms-4 me-4 mt-4 mb-4`}>
                    <h3 className={`${tvSeasonCardStyle.title} text-light`}>{item.title || item.name}</h3>
                    <p className="text-secondary">{dateFormat(new Date(item.air_date), 'yyyy-mm-dd')} | {item.episode_count} {t('common.episodes')}</p>
                    <p>{item.overview}</p>
                </div>
            </div>
        </>
    )
}

export default TvSeasonCard