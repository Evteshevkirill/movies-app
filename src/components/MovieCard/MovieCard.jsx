/* eslint-disable camelcase */
import { format } from 'date-fns'
import { Rate } from 'antd'
import { round } from 'lodash'

import { postRateMovie } from '../services/getServices'
import './MovieCard.css'

// Обрезание текста описания
function textReduction(overview) {
  const cardText = overview

  if (cardText.length <= 150) return cardText

  let trimmed = cardText.substr(0, 150)
  if (cardText[150] !== ' ') {
    trimmed = trimmed.substr(0, Math.min(trimmed.length, trimmed.lastIndexOf(' ')))
  }
  return `${trimmed}...`
}

// Форматирование даты релиза
function formatDate(date) {
  if (Number.isNaN(Date.parse(date))) return null

  return format(new Date(date), 'PPP')
}

export default function MovieCard(props) {
  const urlImgs = 'https://image.tmdb.org/t/p/w500'

  const { movie, allGenres } = props

  const { id, poster_path, title, overview, release_date, genre_ids, vote_average } = movie

  return (
    <li key={id} className="movie__card">
      <img className="poster" src={`${urlImgs}${poster_path}`} alt="poster movie" />
      <div className="movie__body">
        <div className="movie_card-header">
          <h5 className="movie__title">{title}</h5>
        </div>
        <div className="movie__rating-wrapper">
          <MovieRating rate={vote_average} />
        </div>
        <p className="movie__date">{formatDate(release_date)}</p>
        <div className="movie__genre">
          <GenreMovie movieGenre={genre_ids} allGenres={allGenres} />
        </div>
        <p className="movie__card-text">{textReduction(overview)}</p>
        <div className="rate">
          <Rate count={10} defaultValue={localStorage.getItem(id)} onChange={(current) => postRateMovie(id, current)} />
        </div>
      </div>
    </li>
  )
}

//  Округление рейтинга фильма
function MovieRating(props) {
  const { rate } = props

  const roundRate = round(rate, 1)

  let className
  if (roundRate < 3) className = 'movie__rating bad'
  if (roundRate >= 3 && roundRate < 5) className = 'movie__rating normal'
  if (roundRate >= 5 && roundRate < 7) className = 'movie__rating good'
  if (roundRate >= 7) className = 'movie__rating perfect'

  return <span className={className}>{roundRate}</span>
}

// Отрисовка жанра фильма
function GenreMovie(props) {
  const { movieGenre, allGenres } = props

  const filter = allGenres.filter((el) => movieGenre.includes(el.id))

  return (
    <>
      {filter.map((el) => (
        <span key={el.id} className="movie__genre-text">
          {el.name}
        </span>
      ))}
    </>
  )
}
