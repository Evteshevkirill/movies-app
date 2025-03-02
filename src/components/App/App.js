import React from 'react'
import { Tabs } from 'antd'

import { getAllGenre, guestSession } from '../services/getServices'
import Search from '../Search/Search'
import Rated from '../Rated/Rated'
import './App.css'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOnline: true,
    }
  }

  componentDidMount() {
    localStorage.clear()
    window.addEventListener('online', this.handleChangeStatusInternet)
    window.addEventListener('offline', this.handleChangeStatusInternet)
    this.handleChangeStatusInternet()
    guestSession().then((id) => {
      localStorage.sessionId = id
    })
    getAllGenre().then((data) => {
      localStorage.allGenres = JSON.stringify(data)
    })
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.handleChangeStatusInternet)
    window.removeEventListener('offline', this.handleChangeStatusInternet)
  }

  handleChangeStatusInternet = () => {
    this.setState({ isOnline: navigator.onLine })
  }

  render() {
    const { isOnline } = this.state
    const items = [
      {
        key: '1',
        label: 'Search',
        children: React.createElement(Search, null),
      },
      {
        key: '2',
        label: 'Rated',
        children: React.createElement(Rated, null),
      },
    ]
    return React.createElement(
      React.Fragment,
      null,
      !isOnline &&
        React.createElement(
          'div',
          { className: 'offline__wrapper' },
          React.createElement('h1', { className: 'offline' }, 'You Are Offline')
        ),
      isOnline &&
        React.createElement(
          'section',
          { className: 'movie__app' },
          React.createElement(Tabs, {
            defaultActiveKey: '1',
            centered: true,
            items,
            destroyInactiveTabPane: true,
          })
        )
    )
  }
}
