import { useEffect, useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import ProgressiveLoader from '../../components/progressive-loader/ProgressiveLoader';
import listStyle from './list.module.css'
import config from '../api/config';
import MovieList from '../../components/movie-list/MovieList';
import tmdbApi, { mvtvType } from '../api/tmdbApi';
import { LockFill } from 'react-bootstrap-icons';
import ShowMoreLess from '../../components/universal_components/show-more-less/ShowMoreLess';
import { withI18n } from '../../helper/with18n';

const List = (listData) => {
    if (!listData?.data?.length) {
        return null;
    }
    const item = listData.data[0];
    const router = useRouter();
    const language = router.locale;
    const [mtvData, setMtvData] = useState({ movies: [], tvs: [] });

    async function fetchMVTVData(type, id) {
        switch (type) {
            case mvtvType.movie:
                return await tmdbApi.getMovieById(id, { params: {} });
            case mvtvType.tv:
                return await tmdbApi.getTvById(id, { params: {} });
            default:
                console.error("Invalid type:", type);
                return null;
        }
    }

    useEffect(() => {
        async function fetchAndRenderItems() {
            try {
                const mvIds = item.movies ? JSON.parse(item.movies)?.ids || [] : [];
                const tvIds = JSON.parse(listData.data[0].tvs)?.ids || [];

                const mvResponseArray = await Promise.all(mvIds.map(id => fetchMVTVData(mvtvType.movie, id)));
                const tvResponseArray = await Promise.all(tvIds.map(id => fetchMVTVData(mvtvType.tv, id)));

                setMtvData({ movies: mvResponseArray, tvs: tvResponseArray });
            } catch (error) {
                console.error(`Error fetching data:`, error);
            }
        }
        fetchAndRenderItems();

    }, [listData]);

    return (
        <>
            <ProgressiveLoader
                isBackground={true}
                otherClass={listStyle.banner}
                lowRes={item.listWallpaper ? config.w300(item.listWallpaper) : null}
                highRes={item.listWallpaper ? config.mainImage(item.listWallpaper) : ''}
                blur={5}
            />
            <div className={`${listStyle.listWrapper}`}>
                <div className={`mb-3 container ${listStyle.listContainer}`}>
                    <div className={listStyle.listInfo}>
                        <h2 className='mb-3 d-flex align-items-center'>{item.isPrivate && <LockFill className='me-1' alt={"private"}></LockFill>}{item.title}</h2>
                        <div className={`${listStyle.author}`}>
                            <div className={`${listStyle.profilePhotoWrapper}`}>
                                {item.author.profileImage != "" ?
                                    (<Link href={`/u/${item.author.nickname}`}><ProgressiveLoader
                                        isBackground={true}
                                        lowRes={null}
                                        otherClass={`rounded-circle ${listStyle.profileImage}`}
                                        highRes={item.author.profileImage}
                                        blur={2}
                                    /></Link>)
                                    :
                                    (<div className={`rounded-circle ${listStyle.profileDefaultLogo}`}>
                                        <Link href={`/u/${item.author.nickname}`}><span>{item.author.nickname[0].toUpperCase()}</span></Link>
                                    </div>)
                                }
                            </div>
                            <p className={listStyle.authorNickname}><b>Autor:</b><br /><Link href={`/u/${item.author.nickname}`}>{item.author.nickname}</Link></p>
                            <div className='mx-3'>
                                <button className='btn mx-2 btn-outline-light'>Upravit</button>
                                <button className='btn mx-2 btn-outline-light'>Seřadit</button>
                                <button className='btn mx-2 btn-outline-light'>Sdílet</button>
                            </div>
                        </div>
                        <div className={`mt-2 ${listStyle.description}`}>
                            <span><b>Popis</b> </span><br />
                            <ShowMoreLess
                                text={item.description}
                                maxLength={150}
                                showButton={true}
                            />
                        </div>
                    </div>
                    <div className={`py-3 ${listStyle.listContent}`}>
                        {
                            mtvData.movies.length != 0 && (
                                <>
                                    <h2 className='mb-3 mt-3'>Filmy</h2>
                                    <div className='moviesList'>
                                        <MovieList language={language} mvtvType={mvtvType.movie} items={mtvData.movies}></MovieList>
                                    </div>
                                </>
                            )
                        }
                        {
                            mtvData.tvs.length != 0 && (
                                <>
                                    <h2 className='mb-3 mt-3'>Seriály</h2>
                                    <div className='tvsList'>
                                        <MovieList language={language} mvtvType={mvtvType.movie} items={mtvData.tvs}></MovieList>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps = withI18n();
export default List