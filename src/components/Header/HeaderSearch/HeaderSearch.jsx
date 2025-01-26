import { Component } from 'react'
import { debounce } from 'lodash'
import { Alert, Spin, Pagination } from 'antd'

import { getMovies, getAllGenre } from '../../services/getServices'
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

  componentDidMount() {
    getAllGenre().then((data) => {
      localStorage.allGenres = JSON.stringify(data)
    })
  }

  componentDidUpdate(prevState) {
    const { inputValue, page } = this.state
    if (prevState !== inputValue) this.getMoviesList(inputValue)
    if (prevState !== page) this.onCurrentPage(page)
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

  onCurrentPage = debounce((page) => {
    const { inputValue } = this.state

    getMovies(inputValue, page)
      .then((data) => {
        if (data.length === 0) throw new Error('Не найдено')

        this.onLoadingMovies(data)
      })
      .catch((err) => this.onError(err))
  }, 700)

  getMoviesList = debounce((value) => {
    const { page, inputValue } = this.state
    if (inputValue === '') {
      this.setState({
        movies: [],
        inputValue: '',
        error: false,
        loading: false,
      })
    }

    getMovies(value, page)
      .then((data) => {
        if (data.length === 0) throw new Error('Не найдено')
        this.onLoadingMovies(data)
      })
      .catch((err) => this.onError(err))
  }, 700)

  render() {
    const allGenres = JSON.parse(localStorage.allGenres)
    const { error, errorName, loading, movies, page } = this.state

    const hasContent = !loading && !error && movies.length !== 0
    const spin = loading ? <Spin className="spinner" /> : null
    const errMessage = error ? <Alert message={errorName.name} description={errorName.message} type="error" /> : null
    const content = hasContent ? (
      <>
        <MovieCardList movies={movies} allGenres={allGenres} />
        <Pagination
          align="center"
          current={page}
          defaultCurrent={1}
          total={500}
          onChange={(currentPage) => this.onChangePage(currentPage)}
        />
      </>
    ) : null
    return (
      <>
        <input
          type="text"
          className="input__search"
          placeholder="Type of search..."
          onChange={(e) => this.onChangeInput(e.target.value)}
        />
        {content}
        {errMessage}
        {spin}
      </>
    )
  }
}
