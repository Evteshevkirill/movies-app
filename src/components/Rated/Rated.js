/* eslint-disable indent */
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from 'react/jsx-runtime'
import { Component } from 'react'
import { Alert, Spin, Pagination } from 'antd'

import MovieCardList from '../MovieCardList/MovieCardList'
import { getRateMovies } from '../services/getServices'

export default class Rated extends Component {
  constructor(props) {
    super(props)
    this.state = {
      response: { total_pages: 0 },
      movies: [],
      error: false,
      errorName: '',
      errorMessage: '',
      loading: true,
      page: 1,
    }
  }

  componentDidMount() {
    const { page } = this.state
    getRateMovies(page)
      .then((data) => {
        this.setState({ response: data, movies: data.results, loading: false })
      })
      .catch((err) => this.onError(err))
  }

  onError(err) {
    this.setState({
      error: true,
      errorName: err.name,
      errorMessage: err.message,
      loading: false,
    })
  }

  onCurrentPage = (page) => {
    this.setState({
      page,
      loading: true,
    })
    getRateMovies(page)
      .then((data) => {
        this.setState({
          movies: data.results,
          response: data,
          loading: false,
        })
      })
      .catch((err) => this.onError(err))
  }

  render() {
    const { error, errorName, errorMessage, loading, movies, page, response } = this.state
    const hasContent = !loading && !error
    const spin = loading ? _jsx(Spin, { className: 'spinner' }) : null
    const errMessage = error ? _jsx(Alert, { message: errorName, description: errorMessage, type: 'error' }) : null
    const content = hasContent
      ? _jsxs(_Fragment, {
          children: [
            _jsx(MovieCardList, { movies }),
            _jsx(Pagination, {
              align: 'center',
              current: page,
              defaultCurrent: 1,
              total: response.total_pages * 10,
              onChange: (currentPage) => this.onCurrentPage(currentPage),
            }),
          ],
        })
      : null
    return _jsxs(_Fragment, { children: [content, errMessage, spin] })
  }
}
