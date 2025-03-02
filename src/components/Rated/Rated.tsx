import React from 'react'
import { Alert, Spin, Pagination } from 'antd'

import MovieCardList from '../MovieCardList/MovieCardList'
import { getRateMovies } from '../services/getServices'

interface State {
  response: { total_pages: number }
  movies: []
  error: boolean
  errorName: string
  errorMessage: string
  loading: boolean
  page: number
}

export default class Rated extends React.Component<Record<string, never>, State> {
  constructor(props: Record<string, never>) {
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

  onError(err: Error) {
    this.setState({
      error: true,
      errorName: err.name,
      errorMessage: err.message,
      loading: false,
    })
  }

  onCurrentPage = (page: number) => {
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
    const spin = loading ? <Spin className="spinner" /> : null
    const errMessage = error ? <Alert message={errorName} description={errorMessage} type="error" /> : null
    const content = hasContent ? (
      <>
        <MovieCardList movies={movies} />
        <Pagination
          align="center"
          current={page}
          defaultCurrent={1}
          total={response.total_pages * 10}
          onChange={(currentPage: number) => this.onCurrentPage(currentPage)}
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
