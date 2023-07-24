import React, { useCallback, useEffect, useRef, useState } from 'react'
import multiSearchStyle from './MultiSearch.module.css'
import { X, XLg } from 'react-bootstrap-icons';
import tmdbApi from '../../pages/api/tmdbApi';
import MovieCard from '../movie-card/MovieCard';
import { IconButton, TextField } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import People from '../people/People';
import { useTranslation } from 'next-i18next';
import d_translations from '../../public/locales/cs/translations.json'
import { useRouter } from 'next/router';

const MultiSearch = (props) => {
  const inputRef = useRef();
  const multiSearchRef = useRef();
  const [searchItems, setSearchItems] = useState([]);
  const router = useRouter();
  const [inputSearch, setInputSearch] = useState(props.inputSearch ? props.inputSearch : '');
  const { t } = useTranslation('translations');

  setTimeout(() => {
    try {
      inputRef.current.focus();
    } catch (e) {
      return e;
    }
  }, 100)

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push({pathname: '/search' ,query: { query: inputSearch } })
    closeSearchHandler();
  }

  const goToSearch = useCallback(async () => {
    let response = null;
    const items_count = props.count != null ? props.count : 60;
    const params = {
      language: props.language,
      region: props.region,
      query: inputSearch
    };
    response = await tmdbApi.getMultiSearch({ params });
    setSearchItems(response.results.slice(0, items_count));
  }, [inputSearch])


  const closeSearchHandler = () => {
    props.setIsActive(!props.isActive)
  }

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const handleClearInput = (e) => {
    setInputSearch("");
  }

  useEffect(() => {
    let enterEvent = setTimeout(() => {
      if (inputSearch) {
        goToSearch();
      }
    }, 350)


    return () => {
      clearTimeout(enterEvent)
    }

  }, [inputSearch, goToSearch])

  return (
    <div ref={multiSearchRef} className='multi-search-wrapper'>
      <>
        <div className={`${multiSearchStyle.multiSearchContent} ${props.isActive ? multiSearchStyle.active : ''}`}>
          <button className={`${multiSearchStyle.searchContentClose} m-5`} onClick={closeSearchHandler}>
            <XLg fontSize={25} className='text-white'></XLg>
          </button>
          <div tabIndex={0} className={`container ${multiSearchStyle.content}`}>
            <div className={`${multiSearchStyle.searchBox} mt-5 mb-5 ${searchItems.length <= 0 ? multiSearchStyle.fullscreen : ''}`}>
              <form onSubmit={handleSubmit}>
                <ThemeProvider theme={darkTheme}>
                  <TextField
                    size='small'
                    inputRef={inputRef}
                    value={inputSearch}
                    onChange={(e) => setInputSearch(e.target.value)}
                    id="search-input"
                    className={multiSearchStyle.searchInput}
                    label={t("search.searchLabel", d_translations.search.searchLabel)}
                    variant="standard"
                    InputLabelProps={{ style: { fontSize: 20 } }}
                    InputProps={
                      {
                        style: { fontSize: 20 },
                        endAdornment: (
                          <IconButton onClick={handleClearInput}><X /></IconButton>
                        )
                      }
                    }
                  />
                </ThemeProvider>
              </form>
            </div>
            <div className={`${multiSearchStyle.movieGrid} ${searchItems.length <= 0 ? 'empty' : ''}`}>
              <div className={multiSearchStyle.media}>
                <div className={multiSearchStyle.mediaGrid}>
                  {
                    searchItems.map((item, i) => (
                      item.media_type != 'person' && (
                        <div key={i} onClick={closeSearchHandler}>
                          {<MovieCard key={i} item={item} mvtvType={item.media_type} />}
                        </div>
                      )
                    ))
                  }
                </div>
              </div>
              {searchItems.some(e => e.profile_path) ? (
                <div className={multiSearchStyle.people}>
                  <div className={`${multiSearchStyle.mvtvTitle} mt-5 mb-4`}>
                    <h2 className="text-white">{t('search.people', d_translations.search.people)}</h2>
                    <div className="divider"></div>
                  </div>
                  <div className={multiSearchStyle.peopleGrid}>
                    {
                      searchItems.map((item, i) => (
                        item.media_type == 'person' && (
                          <div key={i} onClick={closeSearchHandler}>
                            <People key={i} item={item}></People>
                          </div>
                        )
                      ))
                    }
                  </div>
                </div>) : null}
            </div>
          </div>
        </div>
      </>
    </div>
  )
}

export default MultiSearch