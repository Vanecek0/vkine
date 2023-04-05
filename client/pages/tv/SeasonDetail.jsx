import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import tmdbApi from '../../pages/api/tmdbApi';

const SeasonDetail = () => {
    const router = useRouter();
    const { query, isReady } = router;
    const { tv_id, season_number } = query;
    const [episodes, setEpisodes] = useState([]);

    useEffect(() => {
        const getSeasonDetail = async () => {
            const response = await tmdbApi.getSeasonEpisodes(tv_id, season_number, { params: {} })
            setEpisodes(response);
            window.scrollTo(0, 0)
        }

        getSeasonDetail();
    }, [tv_id, season_number])

    return (
        <>
            {
                (episodes.episodes != null ?
                    episodes.episodes.map((item, i) => (
                        <p key={i}>{item.episode_number}</p>
                    ))
                    : '')
            }
        </>
    )
}

export default SeasonDetail