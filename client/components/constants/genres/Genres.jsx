import { useEffect, useState } from 'react'
import tmdbApi from '../../../pages/api/tmdbApi'
import genresStyle from './Genres.module.css'

export const Genres = (props) => {
  const [genresList, setGenresList] = useState();

  useEffect(() => {
    setGenresList(props.genresList)
  },[props.language])

  return(
    <>
      {
      ((genresList != null && genresList.length > 0) && genresList) && (
        <>
        {
          props.genres.map((id, key) => (
            <div key={key}>
              <span key={key} className={`${genresStyle.genres__item} badge`}>{genresList.find(obj => obj.id === props.genres.find(c => c == id)).name}</span>
            </div>
          ))
        }
        </>
      )
      }
    </>
  )
}

export const GenresList = (mvtvType, language) => {
  const [genres, setGenres] = useState([])

  useEffect(() => {
    const fetchGenres = async() => {
      const params = {language: language}
      const response = await tmdbApi.getGenresList(mvtvType, {params})
      setGenres(response.genres)
    }
    fetchGenres()
  },[language])
  
  return genres;
}