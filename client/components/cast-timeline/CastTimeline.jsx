import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import tmdbApi from '../../pages/api/tmdbApi';
import castTimelineStyle from './CastTimeline.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ChevronDown, ChevronExpand, ChevronUp, Circle, CircleFill } from 'react-bootstrap-icons';
import { List, ListItemButton, ListItemText, Collapse, Paper, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { compose } from '@mui/system';

const CastTimeline = (props) => {
  const id = props.personId;
  const [items, setItems] = useState([]);
  var dateNodes = [];
  var itemNodes = [];
  var dateUndefined = [];
  const [openedArray, setOpenedArray] = useState({})

  useEffect(() => {
    const getData = async () => {
      const response = await tmdbApi.getPeopleCreditsCombined(id, { params: { language: 'cs' } })
      switch (props.type) {
        case 'cast':
          setItems(response.cast);
          break;
        case 'crew':
          setItems(response.crew);
          break;
        default:
          setItems(response.cast);
          break;
      }
    }
    getData();
  }, [id])

  function getUniqueSort(arr, index) {
    const unique = arr
      .map(e => e[index])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter(e => arr[e]).map(e => arr[e])
      .sort((a, b) => b[index] - a[index])
    return unique;
  }

  const fillData = () => {
    items.forEach((item) => {
      (item.release_date || item.first_air_date) != null && (item.release_date || item.first_air_date) != '' && dateNodes.push(
        {
          'id': item.id,
          'media_type': item.media_type,
          'title': item.title || item.name,
          'date': item.release_date || item.first_air_date,
          'episode_count': item.episode_count,
          'character': item.character,
          'department': item.department,
          'job': item.job,
        });
    })
    dateNodes.forEach((item) => {
      var dateArr = (item.date != null ? item.date.split('-')[0] : '');
      var temp = { 'date': dateArr, 'data': [] };
      dateNodes.forEach((innerItem) => {
        if (innerItem.date.indexOf(dateArr) === 0 && dateArr != '')
          temp.data.push(
            {
              'id': innerItem.id,
              'media_type': innerItem.media_type,
              'title': innerItem.title || innerItem.name,
              'date': innerItem.date,
              'episode_count': innerItem.episode_count,
              'character': innerItem.character,
              'department': innerItem.department,
              'job': innerItem.job,
            })
      })
      itemNodes.push(temp);
    })
    itemNodes = getUniqueSort(itemNodes, 'date');

    dateUndefined = { 'date': '', 'data': [] };
    items.map((item, i) => {
      typeof (item.release_date || item.first_air_date) === 'undefined' && dateUndefined.data.push(
        {
          'id': item.id,
          'media_type': item.media_type,
          'title': item.title || item.name,
          'date': '',
          'episode_count': item.episode_count,
          'character': item.character,
          'department': item.department,
          'job': item.job,
        })
    })
  }
  fillData();

  /*const handleClick = (date) => {
    setOpenedArray(oldValue => {
      if (date in openedArray) {
        if(openedArray[date] == false )
          setOpen({...open, [date]: true})
        else
          setOpen({...open, [date]: false})
      }
      else {
        setOpen({...open, [date]: true})
      }
      return open
    })
  };*/

  const [open, setOpen] = useState([]);
  const handleClick = (clickedIndex) => {
    if (open.includes(clickedIndex)) {
      const openCopy = open.filter((element) => { return element !== clickedIndex });
      setOpen(openCopy);
    } else {
      const openCopy = [...open];
      openCopy.push(clickedIndex);
      setOpen(openCopy);
    }
  }

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    itemNodes.length > 0 &&
    <>
      <h3 className='text-white'>{props.title}</h3>
      <div className={`${castTimelineStyle.timelineContent} timelineContent`}>
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
                background: { paper: '#121212' },
              },
            })}
          >
            <Paper elevation={0} sx={{ width: '100%' }}>
              <List className={castTimelineStyle.castTimelineList}>
                {
                  itemNodes.map((item, i) => (
                    <div key={i}>
                      <ListItemButton className={castTimelineStyle.castTimelineYear} onClick={() => handleClick(i)}>
                        <ListItemText primary={item.date} />
                        {open.includes(i) ? <ChevronUp /> : <ChevronDown />}
                      </ListItemButton>
                      <Collapse in={!open.includes(i)} timeout='auto' unmountOnExit>
                        {
                          item.data.map((innerItem, i) => (
                            <List key={i} className={`${castTimelineStyle.castTimelineItem} castTimelineItem`} component="div" disablePadding>
                              <Link href={`/${innerItem.media_type}/${innerItem.id}`}>
                                <ListItemButton sx={{ pl: 1 }}>
                                  <CircleFill size={10} color={"#0064FF"} />
                                  <ListItemText className={castTimelineStyle.castTimelineItemTitle} primary={innerItem.title} />
                                  {innerItem.character != '' && innerItem.character != null ? <ListItemText className={castTimelineStyle.castRole} secondary={<span color='#ffffffb8'>{innerItem.character}</span>} /> : ''}
                                  {innerItem.department != '' && innerItem.department != null ? <ListItemText className={castTimelineStyle.castRole} secondary={<span color='#ffffffb8'>{innerItem.job}</span>} /> : ''}
                                </ListItemButton>
                              </Link>
                            </List>
                          ))
                        }
                      </Collapse>
                    </div>
                  ))
                }
              </List>
            </Paper>
          </ThemeProvider>
        </Box>
        {/*
        <ul className='timeline'>
            {
              itemNodes.map((item, i) => (
                <li className='event' key={i} data-date={item.date.split('-')[0]}>
                  {
                    item.data.map((innerItem, i) => (
                      <div key={i} className='content'>
                        <p>
                          <Link to={'/' + innerItem.media_type + '/' + innerItem.id}><b>{innerItem.title}</b></Link>
                          {innerItem.character != '' && innerItem.character != null ? (<> <span className='text-muted'>jako</span> <span color='#ffffffb8'>{innerItem.character}</span></>) : ''}
                          {innerItem.department != '' && innerItem.department != null ? (<> <span className='text-muted'>...</span> <span color='#ffffffb8'>{innerItem.job}</span></>) : ''}
                        </p>
                      </div>
                    ))
                  }
                </li>
              ))
            }
            {
              dateUndefined.data.length > 0 && (
              <>
                <li className='event' data-date={'Nezařazeno'}>
                {
                  dateUndefined.data.map((item, i) => (
                    <div key={i} className='content'>
                      <p>
                      <Link to={'/' + item.media_type + '/' + item.id}><b>{item.title}</b></Link>
                      {item.character != '' && item.character != null ? (<> <span className='text-muted'>jako</span> <span color='#ffffffb8'>{item.character}</span></>) : ''}
                      {item.department != '' && item.department != null ? (<> <span className='text-muted'>...</span> <span color='#ffffffb8'>{item.job}</span></>) : ''}
                      </p>
                    </div>
                  ))
                }
                </li>
              </>
              )
            }
          </ul>
         */}
      </div>
    </>
  )
}

export default CastTimeline