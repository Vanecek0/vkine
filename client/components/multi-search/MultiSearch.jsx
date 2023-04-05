import React, { useCallback, useEffect, useRef, useState } from 'react'
import multiSearchStyle from './MultiSearch.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Search, X, XLg } from 'react-bootstrap-icons';
import tmdbApi from '../../pages/api/tmdbApi';
import MovieCard from '../movie-card/MovieCard';
//import './../movie-card/movie-card.css';
import { Box, IconButton, TextField } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import People from '../people/People';

const MultiSearch = (props) => {
  const inputRef = useRef();
  const multiSearchRef = useRef();
  const [searchItems, setSearchItems] = useState([]);
  const [inputSearch, setInputSearch] = useState(props.inputSearch ? props.inputSearch : '');

  setTimeout(() => {
    try {
      inputRef.current.focus();
    } catch (e) {
      return e;
    }
  }, 100)

  /*if (props.isActive) {
    document.body.classList.add('no-scroll')
  } else {
    document.body.classList.remove('no-scroll')
  }*/

  const goToSearch = useCallback(async () => {
    let response = null;
    const items_count = props.count != null ? props.count : 60;
    const params = {
      language: props.language,
      without_keywords: '248841|210024|210024-anime|290799',
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
    }, 300)


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
                <>
                  <ThemeProvider theme={darkTheme}>

                    <TextField
                      size='small'
                      inputRef={inputRef}
                      value={inputSearch}
                      onChange={(e) => setInputSearch(e.target.value)}
                      id="search-input"
                      className={multiSearchStyle.searchInput}
                      label="Hledat film, seriál, osobu, ..." //Translate!
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
                </>
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
                      <h2 className="text-white">Lidé</h2>
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