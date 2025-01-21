import { Component } from 'react'
import { debounce } from 'lodash'
import { Alert, Spin } from 'antd'

import getMovies from '../../services/getMovies'
import MovieCardList from '../../MovieCardList/MovieCardList'
import './HeaderSearch.css'

export default class HeaderSearch extends Component {
  handleChange = debounce((value) => {
    getMovies(value)
      .then((data) => this.onLoadingMovies(data))
      .catch((err) => this.onError(err))
  }, 500)

  constructor() {
    super()
    this.state = {
      movies: [],
      error: false,
      errorName: null,
      loading: false,
    }
  }

  onLoadingMovies(data) {
    this.setState({
      movies: data,
      loading: false,
    })
  }

  onError(err) {
    this.setState({
      error: true,
      errorName: err,
      loading: false,
    })
  }

  render() {
    const { error, errorName, loading, movies } = this.state

    const spin = loading ? <Spin className="spinner" /> : null
    const errMessage = error ? <Alert message={errorName.name} description={errorName.message} type="error" /> : null
    const content = !loading && !error ? <MovieCardList movies={movies} /> : null
    return (
      <>
        <input
          type="text"
          className="input__search"
          placeholder="Type of search..."
          onChange={(e) => this.handleChange(e.target.value)}
        />
        {content}
        {errMessage}
        {spin}
      </>
    )
  }
}
