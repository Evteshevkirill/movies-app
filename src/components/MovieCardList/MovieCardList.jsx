'use client'

import { useState, useEffect } from 'react'

export default function MovieList() {

  const urlImgs = 'https://image.tmdb.org/t/p/w500'
  const _apiBase = 'https://api.themoviedb.org/3/search/movie'

  const [movies, setMovies] = useState(null)

  useEffect(() => {
    async function fetchMovies(){
    const res = await fetch(`${_apiBase}?query=%27return%27&include_adult=false&language=en-US&page=1`)
    const data = await res.json()
    console.log(data.results);
    
    setMovies(data.results)
    }
    fetchMovies()
  }, [])
  
  if(!movies) {
    return <div>Идет загрузка...</div>
  }
  return (
    <ul className="movies__list">
      {movies.map(movie => (
        <li key={movie.id} className="movie__card">
          <div className="poster__wrapper">
            <img className="poster" src={`${urlImgs}${movie.poster_path}`} alt="poster movie" />
          </div>
          <div className="movies__body">
            <h5 className="movie__title">{movie.title}</h5>
            <p className="movie__date">{movie.release_date}</p>
            <div className="movie__genre">
              <p className="movie__genre-text">Action</p>
              <p className="movie__genre-text">Drama</p>
            </div>
            <p className="movie__card-text">{movie.overview}</p>
          </div>
        </li>
      ))}
    </ul>
  )
 }
  