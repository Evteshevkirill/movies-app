import { Component } from 'react'
import { Alert, Spin } from 'antd'

import MovieCard from '../MovieCard/MovieCard'
import getMovies from '../services/getMovies'
import './MovieCardList.css'

function alertComponent(err) {
  return <Alert message={err.name} description={err.message} type="error" />
}

function MovieCards(props) {
  const { movies } = props
  return (
    <ul className="movies__list">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </ul>
  )
}

export default class MovieCardList extends Component {
  constructor() {
    super()
    this.state = {
      movies: [],
      error: false,
      errorName: null,
      loading: true,
    }
    this.alertComponent = alertComponent.bind(this)
  }

  componentDidMount() {
    getMovies()
      .then((data) => {
        this.setState({
          movies: data,
          loading: false,
        })
      })
      .catch((err) => this.onError(err))
  }

  onError(err) {
    this.setState({
      error: true,
      errorName: err,
      loading: false,
    })
  }

  render() {
    const { movies, error, errorName, loading } = this.state

    const spin = loading ? <Spin /> : null
    const errMessage = error ? this.alertComponent(errorName) : null
    const content = !loading && !error ? <MovieCards movies={movies} /> : null

    return (
      <>
        {spin}
        {errMessage}
        {content}
      </>
    )
  }
}
