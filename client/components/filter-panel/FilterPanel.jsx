import { useEffect, useRef, useState, useId } from 'react'
import filterPanelStyle from "./FilterPanel.module.css"
import { GenresList } from '../../components/constants/genres/Genres'
import Select from 'react-select'
import tmdbApi from '../../pages/api/tmdbApi'
import { Slider, TextField, List, ListItemButton, ListItemText, Collapse, Paper, Box } from "@mui/material"
import 'dayjs/locale/cs'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { BrowserView, MobileView } from 'react-device-detect'
import dateFormat from "dateformat"
import TagInput from '../tag-input/TagInput'
import { useTranslation } from 'next-i18next'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ChevronDown, ChevronUp } from 'react-bootstrap-icons'
import Sorting from '../../components/constants/Sorting'
import d_translations from '../../public/locales/cs/translations.json'

const FilterPanel = (props) => {
  const refButton = useRef();
  const refFilterPanel = useRef();
  const [selectedGenres, setSelectedGenres] = useState({})
  const [selectedSorting, setSelectedSorting] = useState(null)
  const [selectedMediaLength, setSelectedMediaLength] = useState({})
  const [selectedReviewRange, setSelectedReviewRange] = useState({})
  const [selectedReviewCountRange, setSelectedReviewCountRange] = useState({})
  const [selectedReleaseDate, setSelectedReleaseDate] = useState({})
  const [selectedPrimaryReleaseDate, setSelectedPrimaryReleaseDate] = useState({})
  const [selectedAirDate, setSelectedAirDate] = useState({})
  const [selectedFirstAirDate, setSelectedFirstAirDate] = useState({})
  const [selectedTags, setSelectedTags] = useState({})
  const [changing, setChanging] = useState(false);
  const {t}  = useTranslation('translations');
  const [open, setOpen] = useState([]);

  useEffect(() => {
    setChanging(true)
    },[
      selectedGenres, 
      selectedSorting, 
      selectedMediaLength, 
      selectedReviewRange, 
      selectedReviewCountRange, 
      selectedReleaseDate,
      selectedPrimaryReleaseDate,
      selectedAirDate, 
      selectedFirstAirDate, 
      selectedTags,
    ])

  const fixedButton = () => {
    try {
      if (refFilterPanel.current.getBoundingClientRect().top + 100 - window.innerHeight <= 0 && refFilterPanel.current.getBoundingClientRect().bottom - window.innerHeight >= 0) {
        refButton.current.classList.add(filterPanelStyle.fixed)
      } else {
        refButton.current.classList.remove(filterPanelStyle.fixed)
      }
    } catch(e) {
      window.removeEventListener('scroll', fixedButton);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', fixedButton)
  }, [])

  const handleClick = () => {
    const params =
      {
        with_genres: selectedGenres, 
        sort_by: selectedSorting,
        'with_runtime.gte': selectedMediaLength.with_runtime_gte,
        'with_runtime.lte': selectedMediaLength.with_runtime_lte,
        'vote_average.gte': selectedReviewRange.vote_average_gte,
        'vote_average.lte': selectedReviewRange.vote_average_lte,
        'vote_count.gte': selectedReviewCountRange.vote_count_gte,
        'release_date.gte': selectedReleaseDate.release_date_gte,
        'release_date.lte': selectedReleaseDate.release_date_lte,
        'primary_release_date.gte': selectedPrimaryReleaseDate.primary_release_date_gte,
        'primary_release_date.lte': selectedPrimaryReleaseDate.primary_release_date_lte,
        'air_date.gte': selectedAirDate.air_date_gte,
        'air_date.lte': selectedAirDate.air_date_lte,
        'first_air_date.gte': selectedFirstAirDate.first_air_date_gte,
        'first_air_date.lte': selectedFirstAirDate.first_air_date_lte,
        'with_keywords': selectedTags,
      }

      function cleanObject(obj) {
        for (var propName in obj) {
          if (obj[propName] === null || obj[propName] === undefined || obj[propName].length <= 0) {
            delete obj[propName];
          }
        }
        return obj
      }
   
    if(changing){
      props.setParams(cleanObject(params))
      setChanging(false)
    }
   
  }
    
  const handleListClick = (clickedIndex) => {
      if(open.includes(clickedIndex)){
        const openCopy = open.filter((element) => {return element !== clickedIndex});
        setOpen(openCopy);
      } else {
        const openCopy = [...open];
        openCopy.push(clickedIndex);
        setOpen(openCopy);
      }
  }
 
  return (
    <form className={filterPanelStyle.filterPanel} ref={refFilterPanel}>
      <div className={filterPanelStyle.filterContent}>
        <Box sx={{ display: 'flex' }}>
          <ThemeProvider
            theme={createTheme({
              components: {
                MuiListItemButton: {
                  defaultProps: {
                    disableTouchRipple: true,
                  },
                },
              },
              palette: {
                mode: 'dark',
                primary: { main: 'rgb(102, 157, 246)' },
                background: { paper: '#212529' },
              },
            })}
          >
            <Paper elevation={0} sx={{ width: '100%'}}>
              <List>
                <ListItemButton onClick={() => handleListClick(0)}>
                    <ListItemText primary={t('filters.order', d_translations.filters.order)} />
                    {open.includes(0) ? <ChevronUp /> : <ChevronDown />}
                  </ListItemButton>
                  <Collapse in={!open.includes(0)} timeout='auto' unmountOnExit>
                    <FilterSorting setSelectedSorting={setSelectedSorting} title={t('filters.sortOrdersTitle', d_translations.filters.sortOrdersTitle)}/>
                  </Collapse>
              </List>
            </Paper>
          </ThemeProvider>
        </Box>
      </div>
      <div className={filterPanelStyle.filterContent}>
        <Box sx={{ display: 'flex' }}>
          <ThemeProvider
            theme={createTheme({
              components: {
                MuiListItemButton: {
                  defaultProps: {
                    disableTouchRipple: true,
                  },
                },
              },
              palette: {
                mode: 'dark',
                primary: { main: 'rgb(102, 157, 246)' },
                background: { paper: '#212529' },
              },
            })}
          >
            <Paper elevation={0} sx={{ width: '100%'}}>
              <List>
                <ListItemButton onClick={() => handleListClick(1)}>
                    <ListItemText primary={t('filters.filtersTitle', d_translations.filters.filtersTitle)} />
                    {open.includes(1) ? <ChevronUp /> : <ChevronDown />}
                  </ListItemButton>
                  <Collapse in={open.includes(1)} timeout='auto' unmountOnExit>
                    {
                      props.mvtvType == 'movie' ? (
                        <>
                        <FilterDate setSelectedDate={setSelectedPrimaryReleaseDate} type='primary_release_date' title={t('filters.releaseDatePremiere', d_translations.filters.releaseDatePremiere)}/>
                        <FilterDate setSelectedDate={setSelectedReleaseDate} type='release_date' title={t('filters.releaseDate', d_translations.filters.releaseDate)}/>
                        </>
                      ):
                      (
                        <>
                        <FilterDate setSelectedDate={setSelectedFirstAirDate} type='first_air_date' title={t('filters.releaseDatePremiere', d_translations.filters.releaseDatePremiere)}/>
                        <FilterDate setSelectedDate={setSelectedAirDate} type='air_date' title={t('filters.releaseDate', d_translations.filters.releaseDate)}/>
                        </>
                      )
                    }
                    <FilterGenres setSelectedGenres={setSelectedGenres} mvtvType={props.mvtvType} language={props.language} title={t('filters.genresTitle', d_translations.filters.genresTitle)}/>
                    <FilterReviewRange setSelectedReviewRange={setSelectedReviewRange} mvtvType={props.mvtvType} title={t('filters.reviewTitle', d_translations.filters.reviewTitle)}/>
                    <FilterReviewCountRange setSelectedReviewCountRange={setSelectedReviewCountRange} mvtvType={props.mvtvType} title={t('filters.reviewCountTitle', d_translations.filters.reviewCountTitle)}/>
                    <FilterMediaLength setSelectedMediaLength={setSelectedMediaLength} mvtvType={props.mvtvType} title={t('filters.mediaTitle', d_translations.filters.mediaTitle)}/>
                    <FilterTagsInput setSelectedTags={setSelectedTags} mvtvType={props.mvtvType} title={t('filters.filterTagsTitle', d_translations.filters.filterTagsTitle)}/>
                  </Collapse>
              </List>
            </Paper>
          </ThemeProvider>
        </Box>
      </div>
      <button type="button" ref={refButton} className={`${filterPanelStyle.btn} btn btn-primary`} onClick={()=>handleClick()} disabled={!changing ? true : false}>Hledat</button>
    </form>
  )
}

const FilterGenres = (props) => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const genres = GenresList(props.mvtvType, props.language);
  const temp = {with_genres: []};

  const handleClick = (e) => {
    var id = e.target.getAttribute("data-value");
    if (e.target.tagName == 'LI') { 
      if(!e.target.classList.contains(`${filterPanelStyle.item_selected}`)) {
        e.target.classList.add(`${filterPanelStyle.item_selected}`);
        temp.with_genres.push(id);
        setSelectedGenres(current => [...current, id]);
  
      } else {
        var index = selectedGenres.indexOf(id);
        setSelectedGenres(current => current.filter((_, i) => i !== index));
        e.target.classList.remove(`${filterPanelStyle.item_selected}`)
      }
    }
  }
  useEffect(() => {
    const setGenres = () => {
      props.setSelectedGenres(selectedGenres)
    }
    setGenres()
  }, [selectedGenres])

  return(
    <div className={filterPanelStyle.genresFilter}>
      <div className={filterPanelStyle.wrapper}>
        <p>{props.title}</p>
        <ul className='d-flex flex-wrap' onClick={(e) => handleClick(e)}>
          {
            genres != null && 
            genres.map((item, i) => (
              <li key={i} data-value={item.id}>
                {item.name}
              </li>
            ))
            }
        </ul>
      </div>
    </div>
  )
}

const FilterSorting = (props) => {
  const sorting = Sorting();
  const {t}  = useTranslation();

  const handleChange = (selectedSorting) => {
    props.setSelectedSorting(selectedSorting);
  };
  return(
    <>
    <div className={filterPanelStyle.wrapper}>
      <p>{props.title}</p>
      <Select 
      instanceId={useId()}
      options={sorting}
      className={`select-filter ${props.className}`}
      classNamePrefix={'select-filter'}
      onChange={(e) => handleChange(e.value)}
      defaultValue={""}
      placeholder={t("common.selectLabel", d_translations.common.selectLabel)}

      theme={(theme) => ({
        ...theme,
        borderRadius: 0,
      })}
    />
    </div>
    </>
  );
}

const FilterMediaLength = (props) => {
  const [value, setValue] = useState([0, 900]);
  const maxRange = 900;
  const minRange = 0;


  const lengthMarks = [
    {
      value: 0,
      scaledValue: 0,
      label: "0"
    },
    {
      value: 225,
      scaledValue: 60,
      label: "60"
    },
    {
      value: 450,
      scaledValue: 180,
      label: "180"
    },
    {
      value: 675,
      scaledValue: 360,
      label: "360"
    },
    {
      value: 900,
      scaledValue: 900,
      label: "900"
    },
    
  ];

  const scaleValues = (valueArray) => {
    return [scale(valueArray[0]), scale(valueArray[1])];
  };
  const scale = (value) => {
    if (value === undefined) {
      return undefined;
    }
    const previousMarkIndex = Math.floor(value / 225);
    const previousMark = lengthMarks[previousMarkIndex];
    const remainder = value % 225;
    if (remainder === 0) {
      return previousMark.scaledValue;
    }
    const nextMark = lengthMarks[previousMarkIndex + 1];
    const increment = (nextMark.scaledValue - previousMark.scaledValue) / 225;
    return remainder * increment + previousMark.scaledValue;
  };

  const numberFormatter = (num) => {
    return scale(num) + " min.";
  }

  const handleChange = (e, newValue, activeThumb) => {
      setValue(newValue);
  };

  const handleValues = (e, newValue) => {
    setValue(newValue);
    props.setSelectedMediaLength({'with_runtime_gte': scaleValues(value)[0], 'with_runtime_lte': scaleValues(value)[1]});
  };

  return(
    <>
    <div className={filterPanelStyle.wrapper}>
      <p>{props.title}</p>
      <Slider
      className={`${filterPanelStyle.MUISlider} MediaLengthSlider`} 
      value={value}
      marks={lengthMarks}
      step={15}
      min={minRange}
      max={maxRange}
      valueLabelFormat={numberFormatter}
      onChange={handleChange}
      onChangeCommitted={handleValues}
      valueLabelDisplay="auto"
      disableSwap
      />
    </div>
    </>
  );
}

const FilterReviewRange = (props) => {
  const [value, setValue] = useState([0, 10]);
  const maxRange = 10;
  const step = 1;
  const minRange = 0;

  const reviewMarks = [
    {
      value: 0,
      label: "0"
    },
    {
      value: 5,
      label: "5"
    },
    {
      value: 10,
      label: "10"
    },
  ];

  const handleChange = (e, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < step) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], maxRange - step);
        setValue([clamped, clamped + step]);
      } else {
        const clamped = Math.max(newValue[1], step);
        setValue([clamped - step, clamped]);
      }
    } else {
      setValue(newValue);
    }
  };

  const handleValues = (e, newValue) => {
    setValue(newValue);
    props.setSelectedReviewRange({'vote_average_gte': value[0], 'vote_average_lte': value[1]});
  };
  
  return(
    <>
    <div className={filterPanelStyle.wrapper}>
      <p>{props.title}</p>
      <Slider
      className={`${filterPanelStyle.MUISlider} ReviewRangeSlider`} 
      value={value}
      step={step}
      marks={reviewMarks}
      min={minRange}
      max={maxRange}
      onChange={handleChange}
      onChangeCommitted={handleValues}
      valueLabelDisplay="auto"
      disableSwap
      />
    </div>
    </>
  );
}

const FilterReviewCountRange = (props) => {
  const [value, setValue] = useState(0);
  const maxRange = 500;
  const step = 50;
  const minRange = 0;

  const reviewCountMarks = [
    {
      value: 0,
      label: "0"
    },
    {
      value: 100,
      label: "100"
    },
    {
      value: 200,
      label: "200"
    },
    {
      value: 300,
      label: "300"
    },
    {
      value: 400,
      label: "400"
    },
    {
      value: 500,
      label: "500"
    },
  ];

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleValues = (e, newValue) => {
    setValue(newValue);
    props.setSelectedReviewCountRange({'vote_count_gte': value});
  };
  
  return(
    <>
    <div className={filterPanelStyle.wrapper}>
      <p>{props.title}</p>
      <Slider
      className={`${filterPanelStyle.MUISlider} ReviewCountRangeSlider`} 
      value={value}
      step={step}
      marks={reviewCountMarks}
      min={minRange}
      max={maxRange}
      onChange={handleChange}
      onChangeCommitted={handleValues}
      valueLabelDisplay="auto"
      disableSwap
      />
    </div>
    </>
  );
}

const FilterDate = (props) => {
  const now = new Date();
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);

  useEffect(() => {
    try {
        props.setSelectedDate({
          [props.type + '_gte']: dateFrom != null ? dateFormat(new Date(dateFrom), "yyyy-mm-dd") : '', 
          [props.type + '_lte']: dateTo != null ? dateFormat(new Date(dateTo), "yyyy-mm-dd") : '',
        })
    } catch (e) {null};

  }, [dateFrom, dateTo])

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <>
    <div className={filterPanelStyle.wrapper}>
      <p>{props.title}</p>
      <ThemeProvider theme={darkTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'cs'}>
        <BrowserView>
          <DesktopDatePicker
              views={['day']}
              className={filterPanelStyle.MUIDatePicker}
              label="od"
              inputFormat="DD.MM.YYYY"
              value={dateFrom}
              onChange={(value) => setDateFrom(value)}
              renderInput={(params) => <TextField {...params} />}
          />
          <DesktopDatePicker
              className={filterPanelStyle.MUIDatePicker}
              label="do"
              inputFormat="DD.MM.YYYY"
              value={dateTo}
              onChange={(value) => setDateTo(value)}
              renderInput={(params) => <TextField {...params} />}
          />
        </BrowserView>
        <MobileView>
          <MobileDatePicker
              className={filterPanelStyle.MUIDatePicker}
              label="od"
              inputFormat="DD.MM.YYYY"
              value={dateFrom}
              onChange={(value) => setDateFrom(value)}
              renderInput={(params) => <TextField {...params} />}
          />
          <MobileDatePicker
              className={filterPanelStyle.MUIDatePicker}
              label="do"
              inputFormat="DD.MM.YYYY"
              value={dateTo}
              onChange={(value) => setDateTo(value)}
              renderInput={(params) => <TextField {...params} />}
          />
        </MobileView>
      </LocalizationProvider>
      </ThemeProvider>
    </div>
    </>
  );
}

const FilterTagsInput = (props) => {
  const [tags, setTags] = useState([]);
  const [onChangeInput, setOnChangeInput] = useState('');
  const [keywordItems, setKeywordItems] = useState([]);
  const tagsArray = [];

  useEffect(() => {
      tags.map((item) => {
        tagsArray.push(item.id)
        props.setSelectedTags(tagsArray);
      })
      if(tags.length <= 0) {
        props.setSelectedTags([]);
      }
  }, [tags])

  useEffect(() => {
    const getKeywords = async() => {
      const params = {
        query: onChangeInput,
      }

      if(onChangeInput != '') {
        const response = await tmdbApi.searchKeywords({params})
        setKeywordItems(response.results)
      } else {
        setKeywordItems([])
      }
    }
    getKeywords();
  }, [onChangeInput])

 
  return (
    <div className={filterPanelStyle.wrapper}>
      <p>{props.title}</p>
      <TagInput items={keywordItems} setTags={setTags} setOnChangeInput={setOnChangeInput}/>
    </div>
  )
}


export default FilterPanel