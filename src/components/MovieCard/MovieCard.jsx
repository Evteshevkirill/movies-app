/* eslint-disable camelcase */
import { format } from 'date-fns'

import './MovieCard.css'

const textReduction = (overview) => {
  const cardText = overview

  if (cardText.length <= 200) return cardText

  let trimmed = cardText.substr(0, 200)
  if (cardText[200] !== ' ') {
    trimmed = trimmed.substr(0, Math.min(trimmed.length, trimmed.lastIndexOf(' ')))
  }
  return `${trimmed}...`
}

export default function MovieCard(props) {
  const { movie } = props

  const urlImgs = 'https://image.tmdb.org/t/p/w500'
  const { id, poster_path, title, overview, release_date } = movie

  return (
    <li key={id} className="movie__card">
      <div className="poster__wrapper">
        <img className="poster" src={`${urlImgs}${poster_path}`} alt="poster movie" />
      </div>
      <div className="movies__body">
        <h5 className="movie__title">{title}</h5>
        <p className="movie__date">{format(new Date(release_date), 'PPP')}</p>
        <div className="movie__genre">
          <p className="movie__genre-text">Action</p>
          <p className="movie__genre-text">Drama</p>
        </div>
        <p className="movie__card-text">{textReduction(overview)}</p>
      </div>
    </li>
  )
}
