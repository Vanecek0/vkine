import { IconButton, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import d_translations from '../../public/locales/cs/translations.json'
import React, { useState } from 'react'
import SearchGrid from '../../components/search-grid/SearchGrid'
import searchStyle from './search.module.css'
import { useTranslation } from 'next-i18next';
import { Search, X } from 'react-bootstrap-icons';

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
        router.push({query: {query: inputSearch}})
    }
    
    const handleClearInput = (e) => {
        setInputSearch("");
    }

    return (
        <div className={searchStyle.searchContainer}>
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
        </div>
    )
}

export default multiSearch