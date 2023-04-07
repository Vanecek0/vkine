import React, { useRef, useState } from 'react'
import { useTranslation } from 'next-i18next';
import TvEpisodesList from '../tv-episodes-list/TvEpisodesList';
import TvSeasonCard from '../tv-seasons-card/TvSeasonCard'
import tvSeasonListStyle from "./TvSeasonsList.module.css";
import d_translations from '../../public/locales/cs/translations.json'

const TvSeasonsList = (props) => {
  const ref = useRef();
  const [visible, setVisible] = useState(1);
  const [episodesVisible, setEpisodesVisible] = useState(-1);
  const { t } = useTranslation('translations');

  const showEpisodes = (index) => {
    setEpisodesVisible(index);
    if (ref.current != null) {
      window.scrollTo({ top: ref.current.getBoundingClientRect().top + window.pageYOffset - 25, behavior: 'smooth' })
    }
  }

  const showMoreLess = () => {
    setVisible((prevValue) => prevValue + 8)
  }
  return (
    <>
      <div className={`${tvSeasonListStyle.tvseasonsList} mt-3 mb-5 d-flex justify-center flex-column`}>
        <div className={tvSeasonListStyle.tvseasonsContent}>
          {
            props.seasons.slice(0, visible).map((item, i) => (
              <div key={i} className='position-relative'>
                <TvSeasonCard item={item} tv_id={props.tv_id}></TvSeasonCard>
                {episodesVisible === i ?
                  <div ref={ref}>
                    <TvEpisodesList key={i} tv_id={props.tv_id} season_number={item.season_number}></TvEpisodesList>
                    <button className={`${tvSeasonListStyle.episodesBtn} btn btn-dark d-flex align-items-center justify-content-center rounded-bottom`} onClick={() => showEpisodes(-1)}>{t('common.showLess', d_translations.common.showLess)}</button>
                  </div>
                  : <button className={`${tvSeasonListStyle.episodesBtn} btn btn-dark d-flex align-items-center justify-content-center rounded-bottom`} onClick={() => showEpisodes(i)}>{t('common.showEpisodes', d_translations.common.showEpisodes)}</button>
                }
              </div>
            ))
          }
        </div>
        {props.seasons.length >= visible ? <button className={`${tvSeasonListStyle.btn} btn btn-dark d-flex align-items-center justify-content-center mt-4`} onClick={showMoreLess}>{t('common.showNextSeasons', d_translations.common.showNextSeasons)}</button> : ''}
      </div>
    </>
  )
}

export default TvSeasonsList