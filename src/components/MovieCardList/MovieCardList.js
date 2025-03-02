import { jsx as _jsx } from 'react/jsx-runtime'

import MovieCard from '../MovieCard/MovieCard'
import './MovieCardList.css'

export default function MovieCardList(props) {
  const { movies } = props
  const allGenres = JSON.parse(localStorage.allGenres)
  return _jsx('ul', {
    className: 'movies__list',
    children: movies.map((movie) => _jsx(MovieCard, { movie, allGenres }, movie.id)),
  })
}
