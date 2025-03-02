import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from 'react/jsx-runtime'
/* eslint-disable camelcase */
import { format } from 'date-fns'
import { Rate } from 'antd'
import { round } from 'lodash'

import { postRateMovie } from '../services/getServices'
import './MovieCard.css'
// Обрезание текста описания
const textReduction = (overview) => {
  const cardText = overview
  if (cardText.length <= 150) return cardText
  let trimmed = cardText.substring(0, 150)
  if (cardText[150] !== ' ') {
    trimmed = trimmed.substring(0, Math.min(trimmed.length, trimmed.lastIndexOf(' ')))
  }
  return `${trimmed}...`
}
// Форматирование даты релиза
function formatDate(date) {
  if (Number.isNaN(Date.parse(date))) return null
  return format(new Date(date), 'PPP')
}
//  Округление рейтинга фильма
function MovieRating({ rate }) {
  const roundRate = round(rate, 1)
  let className
  if (roundRate < 3) className = 'movie__rating bad'
  if (roundRate >= 3 && roundRate < 5) className = 'movie__rating normal'
  if (roundRate >= 5 && roundRate < 7) className = 'movie__rating good'
  if (roundRate >= 7) className = 'movie__rating perfect'
  return _jsx('span', { className, children: roundRate })
}
// Отрисовка жанра фильма
function GenreMovie({ movieGenre, allGenres }) {
  const filter = allGenres.filter((el) => movieGenre.includes(el.id))
  return _jsx(_Fragment, {
    children: filter.map((el) => _jsx('span', { className: 'movie__genre-text', children: el.name }, el.id)),
  })
}
export default function MovieCard(props) {
  const urlImgs = 'https://image.tmdb.org/t/p/w500'
  const { movie, allGenres } = props
  const { id, poster_path, title, overview, release_date, genre_ids, vote_average } = movie
  return _jsxs(
    'li',
    {
      className: 'movie__card',
      children: [
        _jsx('img', { className: 'poster', src: `${urlImgs}${poster_path}`, alt: 'poster movie' }),
        _jsxs('div', {
          className: 'movie__body',
          children: [
            _jsx('div', {
              className: 'movie_card-header',
              children: _jsx('h5', { className: 'movie__title', children: title }),
            }),
            _jsx('div', { className: 'movie__rating-wrapper', children: _jsx(MovieRating, { rate: vote_average }) }),
            _jsx('p', { className: 'movie__date', children: formatDate(release_date) }),
            _jsx('div', {
              className: 'movie__genre',
              children: _jsx(GenreMovie, { movieGenre: genre_ids, allGenres }),
            }),
            _jsx('p', { className: 'movie__card-text', children: textReduction(overview) }),
            _jsx('div', {
              className: 'rate',
              children: _jsx(Rate, {
                count: 10,
                defaultValue: Number(localStorage.getItem(`${id}`)),
                onChange: (current) => postRateMovie(id.toString(), `${current}`),
              }),
            }),
          ],
        }),
      ],
    },
    id
  )
}
