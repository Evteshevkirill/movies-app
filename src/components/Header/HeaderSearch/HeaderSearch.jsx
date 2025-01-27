import { Component } from 'react'
import { debounce } from 'lodash'
import { Alert, Spin, Pagination } from 'antd'

import { getMovies, getAllGenre, guestSession } from '../../services/getServices'
import MovieCardList from '../../MovieCardList/MovieCardList'
import './HeaderSearch.css'

export default class HeaderSearch extends Component {
  constructor() {
    super()
    this.state = {
      movies: [],
      error: false,
      errorName: null,
      loading: false,
      page: 1,
      inputValue: '',
    }
  }

  // Запускаем гостевую сеесию и получаем ID сессии
  // Получаем список всех жанров
  componentDidMount() {
    guestSession().then((id) => {
      localStorage.sessionId = id
    })
    getAllGenre().then((data) => {
      localStorage.allGenres = JSON.stringify(data)
    })
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

  onChangePage = (page) => {
    this.setState({
      page,
      loading: true,
    })
  }

  // Смена страниц
  onCurrentPage = debounce((page) => {
    const { inputValue } = this.state

    if (inputValue === '') {
      this.onClearState()
      return
    }

    this.onChangePage(page)

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
    const { error, errorName, loading, movies, page } = this.state

    const hasContent = !loading && !error && movies.length !== 0
    const spin = loading ? <Spin className="spinner" /> : null
    const errMessage = error ? <Alert message={errorName.name} description={errorName.message} type="error" /> : null
    const content = hasContent ? (
      <>
        <MovieCardList movies={movies} />
        <Pagination
          align="center"
          current={page}
          defaultCurrent={1}
          total={500}
          onChange={(currentPage) => this.onCurrentPage(currentPage)}
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
