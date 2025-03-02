import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from 'react/jsx-runtime'
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
        children: _jsx(Search, {}),
      },
      {
        key: '2',
        label: 'Rated',
        children: _jsx(Rated, {}),
      },
    ]
    return _jsxs(_Fragment, {
      children: [
        !isOnline &&
          _jsx('div', {
            className: 'offline__wrapper',
            children: _jsx('h1', { className: 'offline', children: 'You Are Offline' }),
          }),
        isOnline &&
          _jsx('section', {
            className: 'movie__app',
            children: _jsx(Tabs, { defaultActiveKey: '1', centered: true, items, destroyInactiveTabPane: true }),
          }),
      ],
    })
  }
}
