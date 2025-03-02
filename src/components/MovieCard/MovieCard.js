/* eslint-disable camelcase */
/* eslint-disable react/function-component-definition */
import React from 'react'
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
const MovieRating = (props) => {
  const { rate } = props
  const roundRate = round(rate, 1)
  let className
  if (roundRate < 3) className = 'movie__rating bad'
  if (roundRate >= 3 && roundRate < 5) className = 'movie__rating normal'
  if (roundRate >= 5 && roundRate < 7) className = 'movie__rating good'
  if (roundRate >= 7) className = 'movie__rating perfect'
  return React.createElement('span', { className }, roundRate)
}
// Отрисовка жанра фильма
function GenreMovie({ movieGenre, allGenres }) {
  const filter = allGenres.filter((el) => movieGenre.includes(el.id))
  return React.createElement(
    React.Fragment,
    null,
    filter.map((el) => React.createElement('span', { key: el.id, className: 'movie__genre-text' }, el.name))
  )
}
export default function MovieCard(props) {
  const urlImgs = 'https://image.tmdb.org/t/p/w500'
  const { movie, allGenres } = props
  const { id, poster_path, title, overview, release_date, genre_ids, vote_average } = movie
  return React.createElement(
    'li',
    { key: id, className: 'movie__card' },
    React.createElement('img', { className: 'poster', src: `${urlImgs}${poster_path}`, alt: 'poster movie' }),
    React.createElement(
      'div',
      { className: 'movie__body' },
      React.createElement(
        'div',
        { className: 'movie_card-header' },
        React.createElement('h5', { className: 'movie__title' }, title)
      ),
      React.createElement(
        'div',
        { className: 'movie__rating-wrapper' },
        React.createElement(MovieRating, { rate: vote_average })
      ),
      React.createElement('p', { className: 'movie__date' }, formatDate(release_date)),
      React.createElement(
        'div',
        { className: 'movie__genre' },
        React.createElement(GenreMovie, { movieGenre: genre_ids, allGenres })
      ),
      React.createElement('p', { className: 'movie__card-text' }, textReduction(overview)),
      React.createElement(
        'div',
        { className: 'rate' },
        React.createElement(Rate, {
          count: 10,
          defaultValue: Number(localStorage.getItem(`${id}`)),
          onChange: (current) => postRateMovie(id.toString(), `${current}`),
        })
      )
    )
  )
}
