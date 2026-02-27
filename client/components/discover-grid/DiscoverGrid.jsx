import { useEffect, useRef, useState } from 'react'
import tmdbApi from '../../pages/api/tmdbApi'
import useVisible from '../../components/universal_components/viewport-rendering/useVisible'
import MovieCard from '../../components/movie-card/MovieCard'
import discoverGridStyle from "./DiscoverGrid.module.css"

const DiscoverGrid = (props) => {
    const [items, setItems] = useState([])
    var [pageNum, setPageNum] = useState(1);
    const ref = useRef(null)
    const isVisible = useVisible(ref);
    var addedPage = false;

    const handleScroll = () => {
        try {
            if (document.documentElement.scrollTop + 300 >= ref.current.clientHeight && !addedPage) {
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
        const getDiscover = async () => {
            const params = { page: pageNum, language: props.language, ...props.filterParams };
            let response = await tmdbApi.discover(props.mvtvType, { params });
            setItems(prev => [...prev, ...response.results]);
        }
        getDiscover();
    }, [pageNum, props.language])

    useEffect(() => {
        const getDiscover = async () => {
            pageNum = 1
            const params = { page: pageNum, language: props.language, ...props.filterParams };
            let response = await tmdbApi.discover(props.mvtvType, { params });
            setItems(response.results);
        }
        getDiscover();
    }, [props.filterParams, props.language])

    return (
        <div ref={ref} className={discoverGridStyle.discoverGrid}>
            {isVisible ?
                items.map((item, i) => (
                    <MovieCard key={i} item={item} mvtvType={props.mvtvType} />
                ))
            : null}
        </div>
    )
}

export default DiscoverGrid