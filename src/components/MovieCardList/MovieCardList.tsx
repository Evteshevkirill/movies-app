/* eslint-disable react/function-component-definition */
import React, { JSX } from 'react'

import MovieCard from '../MovieCard/MovieCard'
import './MovieCardList.css'

interface MovieObject {
  id: number
  poster_path: string
  title: string
  overview: string
  release_date: string
  genre_ids: number[]
  vote_average: number
}

interface MovieCardListProps {
  movies: MovieObject[]
}
const MovieCardList: React.FC<MovieCardListProps> = (props): JSX.Element => {
  const { movies } = props
  const allGenres = JSON.parse(localStorage.allGenres)
  return (
    <ul className="movies__list">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} allGenres={allGenres} />
      ))}
    </ul>
  )
}

export default MovieCardList
