import { Component } from 'react'
import { Alert, Spin, Pagination } from 'antd'

import MovieCardList from '../MovieCardList/MovieCardList'
import { getRateMovies } from '../services/getServices'

export default class Rated extends Component {
  constructor() {
    super()
    this.state = {
      response: {},
      movies: [],
      error: false,
      errorName: null,
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
      errorName: err,
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
    const { error, errorName, loading, movies, page, response } = this.state

    const hasContent = !loading && !error
    const spin = loading ? <Spin className="spinner" /> : null
    const errMessage = error ? <Alert message={errorName.name} description={errorName.message} type="error" /> : null
    const content = hasContent ? (
      <>
        <MovieCardList movies={movies} />
        <Pagination
          align="center"
          current={page}
          defaultCurrent={1}
          total={response.total_pages * 10}
          onChange={(currentPage) => this.onCurrentPage(currentPage)}
        />
      </>
    ) : null
    return (
      <>
        {content}
        {errMessage}
        {spin}
      </>
    )
  }
}
