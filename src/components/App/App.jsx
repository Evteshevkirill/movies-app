import { Component } from 'react'
import { Tabs } from 'antd'

import { getAllGenre, guestSession } from '../services/getServices'
import Search from '../Search/Search'
import Rated from '../Rated/Rated'
import './App.css'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      isOnline: null,
    }
  }

  // Запускаем гостевую сеесию и получаем ID сессии
  // Получаем список всех жанров
  // Проверяем есть ли интернет

  componentDidMount() {
    const { isOnline } = this.state

    window.addEventListener('online', this.handleChangeStatusInternet)

    window.addEventListener('offline', this.handleChangeStatusInternet)

    this.handleChangeStatusInternet()
    if (!isOnline) return

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
        children: <Search />,
      },
      {
        key: '2',
        label: 'Rated',
        children: <Rated />,
      },
    ]

    const offline = !isOnline ? (
      <div className="offline__wrapper">
        <h1 className="offline">You Are Offline</h1>
      </div>
    ) : null
    const online = isOnline ? (
      <section className="movie__app">
        <Tabs defaultActiveKey="1" centered items={items} />
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
