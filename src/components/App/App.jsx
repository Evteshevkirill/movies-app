import { Component } from 'react'

import HeaderButtons from '../Header/HeaderButtons/HeaderButtons'
import HeaderSearch from '../Header/HeaderSearch/HeaderSearch'
import './App.css'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      isOnline: navigator.onLine,
    }
  }

  render() {
    const { isOnline } = this.state

    const offline = !isOnline ? (
      <div className="offline__wrapper">
        <h1 className="offline">You Are Offline</h1>
      </div>
    ) : null

    const online = isOnline ? (
      <section className="movie__app">
        <HeaderButtons />
        <HeaderSearch />
      </section>
    ) : null

    return (
      <>
        {offline}
        {online}
      </>
    )
  }
}
