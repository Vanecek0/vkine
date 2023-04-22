import React from 'react'
import { useTranslation } from 'next-i18next';
import d_translations from '../../public/locales/cs/translations.json'
import MovieList from '../movie-list/MovieList';
import Link from 'next/link';

const CategoriesMvTv = (props) => {
    const { t } = useTranslation('translations')

    return (
        <>
                <div className="section_header mb-2">
                    <h2>{props.title}</h2>
                    <Link href="/discover/movie">
                        <button className='btn btn-outline-light'>{t('common.showMore', d_translations.common.showMore)}</button>
                    </Link>
                </div>
                <MovieList mvtvType={props.mvtvType} type={props.type} with_original_language={process.env.LIST_ORIGINAL_LANGUAGES} language={props.language} with_origin_country={props.region}></MovieList>
        </>
    )
}

export default CategoriesMvTv