import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import tmdbApi from '../../pages/api/tmdbApi';
import castTimelineStyle from './CastTimeline.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ChevronDown, ChevronUp, CircleFill } from 'react-bootstrap-icons';
import { List, ListItemButton, ListItemText, Collapse, Paper, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const CastTimeline = (props) => {
  const id = props.personId;
  const [items, setItems] = useState([]);
  var dateNodes = [];
  var itemNodes = [];
  var dateUndefined = [];

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
                              <Link href={`/${innerItem.media_type}/${innerItem.id}-${(innerItem.title || innerItem.name) != null ? (innerItem.title || innerItem.name).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[\s:,]+/g, '-').replace(/[\/\\]+/g, '-') : ''}`}>
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
      </div>
    </>
  )
}

export default CastTimeline