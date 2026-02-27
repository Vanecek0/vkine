import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react'
import tmdbApi, { mvtvType } from '../../pages/api/tmdbApi';
import MovieCard from '../movie-card/MovieCard';
import searchGridStyle from './SearchGrid.module.css'

const SearchGrid = (props) => {
    const [items, setItems] = useState([])
    const ref = useRef(null)
    var [pageNum, setPageNum] = useState(1);
    var addedPage = false;
    const router = useRouter();
    const { query, isReady } = router;

    const handleScroll = () => {
        try {
            if (document.documentElement.scrollTop + 1000 >= ref.current.clientHeight && !addedPage) {
                addedPage = !addedPage;
                setPageNum(pageNum => pageNum + 1);

                setTimeout(() => {
                    addedPage = !addedPage;
                }, 500)
            }
        } catch (e) {
            window.removeEventListener('scroll', handleScroll);
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
    }, [addedPage])

    useEffect(() => {
        const getMulti = async () => {
            const params = { page: pageNum, language: props.language, query: query.query };
            let response = {};
            if (props.type === 'movie') {
                response = await tmdbApi.search(mvtvType.movie, { params });
                setItems(prev => [...prev, ...response.results]);
            } else if (props.type === 'tv') {
                response = await tmdbApi.search(mvtvType.tv, { params });
                setItems(prev => [...prev, ...response.results]);
            } else if (props.type === 'person') {
                response = await tmdbApi.searchPeople({ params });
                setItems(prev => [...prev, ...response.results]);
            }
            else if (props.type === 'collection') {
                response = await tmdbApi.searchCollection({ params });
                setItems(prev => [...prev, ...response.results]);
            } else {
                response = await tmdbApi.search(mvtvType.movie, { params });
                setItems(prev => [...prev, ...response.results]);
            }
        }
        if (isReady) {
            getMulti();
        }
    }, [isReady, pageNum, props.language])

    useEffect(() => {
        const getMulti = async () => {
            pageNum = 1
            const params = { page: pageNum, language: props.language, query: query.query };
            let response = {};
            if (props.type === 'movie') {
                response = await tmdbApi.search(mvtvType.movie, { params });
                setItems(response.results);
            } else if (props.type === 'tv') {
                response = await tmdbApi.search(mvtvType.tv, { params });
                setItems(response.results);
            } else if (props.type === 'person') {
                response = await tmdbApi.searchPeople({ params });
                setItems(response.results);
            }
            else if (props.type === 'collection') {
                response = await tmdbApi.searchCollection({ params });
                setItems(response.results);
            } else {
                response = await tmdbApi.search(mvtvType.movie, { params });
                setItems(response.results);
            }
        }
        if (isReady) {
            getMulti();
        }
    }, [isReady, props.language, query.query])


    if (!isReady) {
        return null;
    }
    return (

        items.length > 0 ? (
            <div ref={ref} className={searchGridStyle.searchGrid}>
                {
                    items.map((item, i) => (
                        <div key={i}>
                            <MovieCard key={i} item={item} mvtvType={'movie'} />
                        </div>
                    ))
                }
            </div>
        )
        : (<p className={`d-flex text-white justify-content-center w-100 align-items-center ${searchGridStyle.noResults}`}>Vašemu dotazu neodpovídají žádné filmy.</p>)

    )
}

export default SearchGrid