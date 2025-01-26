/* eslint-disable camelcase */
import { Component } from 'react'
import { format } from 'date-fns'
import { Rate } from 'antd'
import './MovieCard.css'

function textReduction(overview) {
  const cardText = overview

  if (cardText.length <= 170) return cardText

  let trimmed = cardText.substr(0, 170)
  if (cardText[170] !== ' ') {
    trimmed = trimmed.substr(0, Math.min(trimmed.length, trimmed.lastIndexOf(' ')))
  }
  return `${trimmed}...`
}

function GenreMovie(props) {
  const { ganer, allGenres } = props
  const filter = allGenres.filter((el, i) => el.id === ganer[i])

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

export default class MovieCard extends Component {
  constructor() {
    super()
    this.textReduction = textReduction.bind(this)
  }

  render() {
    const urlImgs = 'https://image.tmdb.org/t/p/w500'

    const { movie, allGenres } = this.props

    const { id, poster_path, title, overview, release_date, genre_ids } = movie

    return (
      <li key={id} className="movie__card">
        <div className="poster__wrapper">
          <img className="poster" src={`${urlImgs}${poster_path}`} alt="poster movie" />
        </div>
        <div className="movies__body">
          <div className="movie_card-header">
            <h5 className="movie__title">{title}</h5>
          </div>

          <p className="movie__date">{format(new Date(release_date), 'PPP')}</p>
          <div className="movie__genre">
            <GenreMovie ganer={genre_ids} allGenres={allGenres} />
          </div>
          <p className="movie__card-text">{this.textReduction(overview)}</p>
          <div className="rate">
            <Rate allowHalf count={10} defaultValue={0} />
          </div>
        </div>
      </li>
    )
  }
}
