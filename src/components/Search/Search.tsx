import React from 'react'
import { debounce } from 'lodash'
import { Alert, Spin, Pagination } from 'antd'

import { getMovies } from '../services/getServices'
import MovieCardList from '../MovieCardList/MovieCardList'
import './Search.css'

interface State {
  movies: []
  error: boolean
  errorName: string
  errorMessage: string
  loading: boolean
  page: number
  inputValue: string
}

export default class Search extends React.Component<Record<string, never>, State> {
  constructor(props: Record<string, never>) {
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

  onError(err: Error) {
    this.setState({
      error: true,
      errorName: err.name,
      errorMessage: err.message,
      loading: false,
    })
  }

  onLoadingMovies(data: []) {
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

  onChangeInput = (value: string) => {
    this.setState({
      inputValue: value,
      error: false,
      loading: true,
      page: 1,
    })
  }

  // Смена страниц
  onCurrentPage = debounce((page: number) => {
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

  getMoviesList = debounce((value: string) => {
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
    const spin = loading ? <Spin className="spinner" /> : null
    const errMessage = error ? <Alert message={errorName} description={errorMessage} type="error" /> : null
    const content = hasContent ? (
      <>
        <MovieCardList movies={movies} />
        <Pagination
          align="center"
          current={page}
          defaultCurrent={1}
          total={500}
          onChange={(currentPage: number) => this.onCurrentPage(currentPage)}
        />
      </>
    ) : null
    return (
      <>
        <input
          type="text"
          className="input__search"
          placeholder="Type of search..."
          onChange={(e) => this.getMoviesList(e.target.value)}
        />
        {content}
        {errMessage}
        {spin}
      </>
    )
  }
}
