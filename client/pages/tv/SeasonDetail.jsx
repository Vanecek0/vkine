import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import tmdbApi from '../../pages/api/tmdbApi';
import { withI18n } from '../../helper/with18n';

const SeasonDetail = () => {
    const router = useRouter();
    const { query } = router;
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

export const getStaticProps = withI18n();
export default SeasonDetail