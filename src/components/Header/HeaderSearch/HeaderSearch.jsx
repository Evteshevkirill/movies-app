import { Component } from 'react'
import { debounce } from 'lodash'
import { Alert, Spin, Pagination } from 'antd'

import getMovies from '../../services/getMovies'
import MovieCardList from '../../MovieCardList/MovieCardList'
import './HeaderSearch.css'

export default class HeaderSearch extends Component {
  handleChange = debounce((value) => {
    getMovies(value)
      .then((data) => {
        if (data.length === 0) throw new Error('Не найдено')

        this.onLoadingMovies(data)
      })
      .catch((err) => this.onError(err))
  }, 500)

  constructor() {
    super()
    this.state = {
      movies: [],
      error: false,
      errorName: null,
      loading: false,
      page: 1,
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
    const { error, errorName, loading, movies, page } = this.state

    const hasContent = !loading && !error && movies.length !== 0
    const spin = loading ? <Spin className="spinner" /> : null
    const errMessage = error ? <Alert message={errorName.name} description={errorName.message} type="error" /> : null
    const content = hasContent ? (
      <>
        <MovieCardList movies={movies} />
        <Pagination align="center" current={page} defaultCurrent={1} total={50} />
      </>
    ) : null
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
