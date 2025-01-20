import { Component } from 'react'
import { Alert, Spin, Pagination } from 'antd'

import getMovies from '../services/getMovies'
import MovieCard from '../MovieCard/MovieCard'
import './MovieCardList.css'

function alertComponent(err) {
  return <Alert className="error" message={err.name} description={err.message} type="error" />
}

function MovieCards({ movies }) {
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
    const { valueSearch } = this.props
    getMovies(valueSearch)
      .then((data) => this.onLoadingMovies(data))
      .catch((err) => this.onError(err))
  }

  onError(err) {
    this.setState({
      error: true,
      errorName: err,
      loading: false,
    })
  }

  onLoadingMovies(data) {
    this.setState({
      movies: data,
      loading: false,
    })
  }

  render() {
    const { movies, error, errorName, loading } = this.state

    const spin = loading ? <Spin /> : null
    const errMessage = error ? this.alertComponent(errorName) : null
    const content =
      !loading && !error && movies.length !== 0 ? (
        <>
          <MovieCards movies={movies} />
          <div className="pagination">
            <Pagination align="center" defaultCurrent={1} total={500} />
          </div>
        </>
      ) : null

    return (
      <>
        {spin}
        {errMessage}
        {content}
      </>
    )
  }
}
