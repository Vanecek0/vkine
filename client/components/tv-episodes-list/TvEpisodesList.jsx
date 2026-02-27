import { useEffect, useState } from 'react'
import tmdbApi from '../../pages/api/tmdbApi'
import TimeFormat from '../time-format/TimeFormat';
import dateFormat from "dateformat";
import { StarFill } from 'react-bootstrap-icons';
import tvEpisodesListStyle from './TvEpisodesList.module.css'

const TvEpisodesList = (props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getEpisodes = async () => {
      const response = await tmdbApi.getSeasonEpisodes(props.tv_id, props.season_number, { params: {} })
      setItems(response);
    }
    getEpisodes();
  }, [props.tv_id, props.season_number])

  return (
    <>
      <div className={`${tvEpisodesListStyle.episodesList} p-4 rounded-top`}>
        {
          (items.episodes != null ?

            items.episodes.map((item, i) => (
              <div key={i}>
                <div className={`${tvEpisodesListStyle.episodeTitle} pb-2`}>
                  <div className='d-flex text-light align-items-center'>
                    <p>{item.episode_number}. {item.name}</p>
                    <div className={`${tvEpisodesListStyle.ratingPill} text-light badge badge-secondary ms-2`}><StarFill size={12} />{item.vote_average}</div>
                  </div>
                  <p><span className={`${tvEpisodesListStyle.episodeDateRuntime} text-muted`}>{(item.air_date != null ? dateFormat(new Date(item.air_date), "yyyy-mm-dd") : '0h 00min')} {item.runtime > 0 ? <><span>| </span> <TimeFormat value={item.runtime} /></> : ''}</span></p>
                </div>
                <p className={`${tvEpisodesListStyle.episodeOverview} text-muted`}>{item.overview}</p>
                <hr />
              </div>
            ))
            : '')
        }
      </div>
    </>
  )
}

export default TvEpisodesList