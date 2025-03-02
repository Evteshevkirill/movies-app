/* eslint-disable indent */
import React from 'react'
import { debounce } from 'lodash'
import { Alert, Spin, Pagination } from 'antd'

import { getMovies } from '../services/getServices'
import MovieCardList from '../MovieCardList/MovieCardList'
import './Search.css'

export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      error: false,
      errorName: '',
      errorMessage: '',
      loading: false,
      page: 1,
      inputValue: '',
    }
  }

  onError(err) {
    this.setState({
      error: true,
      errorName: err.name,
      errorMessage: err.message,
      loading: false,
    })
  }

  onLoadingMovies(data) {
    this.setState({
      movies: data,
      loading: false,
    })
  }

  onClearState = () => {
    this.setState({
      movies: [],
      loading: false,
      error: false,
      inputValue: '',
    })
  }

  onChangeInput = (value) => {
    this.setState({
      inputValue: value,
      error: false,
      loading: true,
      page: 1,
    })
  }

  // Смена страниц
  onCurrentPage = debounce((page) => {
    const { inputValue } = this.state
    if (inputValue === '') {
      this.onClearState()
      return
    }
    this.setState({
      page,
      loading: true,
    })
    getMovies(inputValue, page)
      .then((data) => {
        if (data.length === 0) throw new Error('Не найдено')
        this.onLoadingMovies(data)
      })
      .catch((err) => this.onError(err))
  }, 700)

  getMoviesList = debounce((value) => {
    const { page } = this.state
    if (value === '') {
      this.onClearState()
      return
    }
    this.onChangeInput(value)
    getMovies(value, page)
      .then((data) => {
        if (data.length === 0) throw new Error('Не найдено')
        this.onLoadingMovies(data)
      })
      .catch((err) => this.onError(err))
  }, 700)

  render() {
    const { error, errorName, errorMessage, loading, movies, page } = this.state
    const hasContent = !loading && !error && movies.length !== 0
    const spin = loading ? React.createElement(Spin, { className: 'spinner' }) : null
    const errMessage = error
      ? React.createElement(Alert, { message: errorName, description: errorMessage, type: 'error' })
      : null
    const content = hasContent
      ? React.createElement(
          React.Fragment,
          null,
          React.createElement(MovieCardList, { movies }),
          React.createElement(Pagination, {
            align: 'center',
            current: page,
            defaultCurrent: 1,
            total: 500,
            onChange: (currentPage) => this.onCurrentPage(currentPage),
          })
        )
      : null
    return React.createElement(
      React.Fragment,
      null,
      React.createElement('input', {
        type: 'text',
        className: 'input__search',
        placeholder: 'Type of search...',
        onChange: (e) => this.getMoviesList(e.target.value),
      }),
      content,
      errMessage,
      spin
    )
  }
}
