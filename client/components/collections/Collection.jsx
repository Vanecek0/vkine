import React, { useEffect, useRef, useState } from 'react'
import config from '../../pages/api/config';
import tmdbApi, { mvtvType } from '../../pages/api/tmdbApi';
import LanguageFallback from '../../components/universal_components/language-fallback/LanguageFallback';
import noImage from '../../assets/image.svg';
import ProgressiveLoader from '../progressive-loader/ProgressiveLoader';
import collectionStyle from './Collection.module.css'
import MovieList from '../movie-list/MovieList';
import MovieCard from '../movie-card/MovieCard';
import Link from 'next/link';
import useVisible from '../../components/universal_components/viewport-rendering/useVisible';
import ShowMoreLess from '../../components/universal_components/show-more-less/ShowMoreLess';

const Collection = () => {
    return (
        <div>Collection</div>
    )
}

export const CollectionBanner = ({ collection_name, collection_id, language }) => {
    const [collection, setCollection] = useState();
    var bg = config.noImage(noImage);
    const collectionRef = useRef();
    const isVisible = useVisible(collectionRef);

    const nameDashed = collection_name != null ? collection_name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[\s:,]+/g, '-').replace(/[\/\\]+/g, '-') : '';
    const link = '/collection/' + collection_id + '-' + nameDashed;

    useEffect(() => {
        const getCollection = async () => {
            const params = {
                language: language
            }
            const response = await tmdbApi.getMovieCollection(collection_id, { params })
            setCollection(response)
        }
        getCollection();
    }, [language, collection_id])

    return (
        <div ref={collectionRef} className={`${collectionStyle.collection_banner} mb-3 mt-5`}>
            {collection != null && isVisible ? (
                <>
                    <ProgressiveLoader
                        isBackground={true}
                        otherClass={`${collectionStyle.collection_banner_img}`}
                        lowRes={(collection.poster_path || collection.backdrop_path) != null ? config.w300(collection.poster_path ? collection.backdrop_path : collection.poster_path) : null}
                        highRes={(collection.poster_path || collection.backdrop_path) != null ? config.w780(collection.poster_path ? collection.backdrop_path : collection.poster_path) : bg}
                        blur={2}
                    />
                    <div className={`container p-5`}>
                        <h3>{collection.name}</h3>
                        <div className={`${collectionStyle.overview} mb-1`}>
                            {collection.overview <= 0 ? (
                                <LanguageFallback
                                    language={language}
                                    resKey={'overview'}
                                    fetchData={tmdbApi.getMovieCollection}
                                    mainParams={[collection_id]}
                                    maxTextLength={500}
                                    isString={true}
                                    otherParams={{ language: language }}
                                />
                            ) : 
                            <ShowMoreLess 
                                text={collection.overview}
                                maxLength={350}
                            />
                            }
                        </div>
                        <div className={`${collectionStyle.collection_parts} mt-3`}>
                            <p>Obsahuje:</p>
                            <div className={collectionStyle.collection_content}>
                                {collection.parts.slice(0, 15).map((item, i) => (
                                    <MovieCard key={i} item={item} mvtvType={mvtvType.movie}></MovieCard>
                                ))}
                            </div>
                        </div>
                        <Link href={link} className={"btn btn-lg btn-primary"}>Zobrazit kolekci</Link> {/**Translate!!! */}
                    </div>
                </>
            ) : null}
        </div >
    )
}

export default Collection