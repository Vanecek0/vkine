import { IconButton, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import d_translations from '../../public/locales/cs/translations.json'
import React, { useState } from 'react'
import SearchGrid from '../../components/search-grid/SearchGrid'
import searchStyle from './search.module.css'
import { useTranslation } from 'next-i18next';
import { Search, X } from 'react-bootstrap-icons';
import Head from 'next/head';
import HeroSlide from '../../components/hero-slide/HeroSlide';

const multiSearch = () => {
    const router = useRouter();
    const { locale } = router;
    const { query } = router.query;
    const language = locale;
    const { t } = useTranslation('translations');
    const [inputSearch, setInputSearch] = useState(query ? query : '');

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        router.push({ query: { query: inputSearch } })
    }

    const handleClearInput = (e) => {
        setInputSearch("");
    }

    return (
        <>
            <Head>
                <title>{`${query} – Vkine.cz`}</title>
                <meta property="og:title" content={`${query} – Vkine.cz`}></meta>
                <meta name='description' content={t('head.description', d_translations.head.description)}></meta>
                <meta property="og:description" content={t('head.description', d_translations.head.description)}></meta>
                <meta name='keywords' content={t('head.keywords', d_translations.head.keywords)}></meta>
                <link rel="canonical" href={`https://www.vkine.cz/`}></link>
                <meta property="og:locale" content="cs_CZ"></meta>
                <meta property="og:locale:alternate" content="sk_SK"></meta>
                <meta property="og:locale:alternate" content="en_US"></meta>
                <meta property="og:type" content="website"></meta>
                <meta property="og:url" content={`https://www.vkine.cz/`}></meta>
                <meta property="og:site_name" content={`${query} – Vkine.cz`}></meta>
                <meta property="og:image" content="https://www.vkine.cz/meta_image.png"></meta>
                <meta property="og:image:secure_url" content="https://www.vkine.cz/meta_image.png"></meta>
                <meta property="og:image:width" content="1588"></meta>
                <meta property="og:image:height" content="1588"></meta>
                <meta property="og:image:alt" content={`${query} – Vkine.cz`}></meta>
                <meta property="og:image:type" content="image/png"></meta>
                <meta name="twitter:card" content="summary_large_image"></meta>
                <meta name="twitter:image" content="https://www.vkine.cz/meta_image.png"></meta>
                <meta name="twitter:title" content={`${query} – Vkine.cz`}></meta>
                <meta name="twitter:description" content={t('head.description', d_translations.head.description)}></meta>
            </Head>
            <HeroSlide mvtvType={'movie'} language={language}></HeroSlide>
            <div className={`${searchStyle.searchWrapper} container-xxl d-flex`}>
                <form onSubmit={handleSubmit} className={`${searchStyle.searchForm} d-flex flex-column`}>
                    <ThemeProvider theme={darkTheme}>
                        <TextField
                            size='small'
                            id="search-input"
                            value={inputSearch}
                            onChange={(e) => setInputSearch(e.target.value)}
                            className={searchStyle.searchInput}
                            label={t("search.searchLabel", d_translations.search.searchLabel)}
                            variant="standard"
                            InputLabelProps={{ style: { fontSize: 15 } }}
                            InputProps={
                                {
                                    style: { fontSize: 15 },
                                    endAdornment: (
                                        <>
                                            <IconButton onClick={handleClearInput}><X /></IconButton>
                                            <IconButton onClick={handleSubmit}><Search size={15} /></IconButton>
                                        </>
                                    )
                                }
                            }
                        />
                    </ThemeProvider>
                </form>
                <SearchGrid type={'movie'} language={language} />
            </div>
        </>
    )
}

export default multiSearch