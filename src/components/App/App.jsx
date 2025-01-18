import { Component } from 'react'

import getMovies from '../service/getMovies'
import MovieCardList from '../MovieCardList/MovieCardList'
import './App.css'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: [],
      // eslint-disable-next-line react/no-unused-state
      error: false,
      // eslint-disable-next-line react/no-unused-state
      loading: false,
    }
  }

  componentDidMount() {
    getMovies().then((data) => {
      this.setState({
        movies: data.results,
      })
    })
  }

  render() {
    const { movies } = this.state
    return (
      <section className="movie__app">
        <MovieCardList movies={movies} />
      </section>
    )
  }
}
