import { Component } from "react";
import { format } from "date-fns";

import './MovieCard.css'

export class MovieCard extends Component {

  textReduction = () => {
  const { movie } = this.props
  let cardText = movie.overview
  if (cardText.length <= 200) return cardText

  let trimmed = cardText.substr(0, 200);
  if (cardText[200] !== ' ') { 
    trimmed = trimmed.substr(0, Math.min(trimmed.length, trimmed.lastIndexOf(' ')));
  }
  return trimmed + '...';
}

  render() {
    const urlImgs = 'https://image.tmdb.org/t/p/w500'
    const { movie } = this.props
    const { poster_path, title, release_date} = movie

    return(
      <li className="movie__card">
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
          <p className="movie__card-text">{this.textReduction()}</p>
        </div>
      </li>
    )
  }
}
