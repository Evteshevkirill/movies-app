import { Component } from 'react'

import MovieCardList from '../../MovieCardList/MovieCardList'

import './HeaderSearch.css'

export default class InputSearch extends Component {
  constructor() {
    super()
    this.state = {
      valueSearch: '',
    }
  }

  onValue(e) {
    this.setState({
      valueSearch: e.target.value,
    })
  }

  render() {
    const { valueSearch } = this.state
    return (
      <>
        <input
          type="text"
          className="input__search"
          placeholder="Type to search..."
          onChange={(e) => this.onValue(e)}
        />
        <MovieCardList valueSearch={valueSearch} />
      </>
    )
  }
}
