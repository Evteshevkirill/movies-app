/* eslint-disable react/function-component-definition */
import React from 'react'

import MovieCard from '../MovieCard/MovieCard'
import './MovieCardList.css'

const MovieCardList = (props) => {
  const { movies } = props
  const allGenres = JSON.parse(localStorage.allGenres)
  return React.createElement(
    'ul',
    { className: 'movies__list' },
    movies.map((movie) => React.createElement(MovieCard, { key: movie.id, movie, allGenres }))
  )
}
export default MovieCardList
