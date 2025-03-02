import React from 'react'
import { Tabs } from 'antd'

import { getAllGenre, guestSession } from '../services/getServices'
import Search from '../Search/Search'
import Rated from '../Rated/Rated'
import './App.css'

interface State {
  isOnline: boolean
}

interface DataObject {
  genre_ids: number[]
  id: number
  overview: string
  poster_path: string
  release_date: string
  title: string
  vote_average: number
}

interface GetData {
  data: DataObject[]
}

interface itemsArray {
  key: string
  label: string
  children: React.ReactNode
}

export default class App extends React.Component<Record<string, never>, State> {
  constructor(props: Record<string, never>) {
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

    guestSession().then((id: string) => {
      localStorage.sessionId = id
    })
    getAllGenre().then((data: GetData) => {
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

    const items: itemsArray[] = [
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

    return (
      <>
        {!isOnline && (
          <div className="offline__wrapper">
            <h1 className="offline">You Are Offline</h1>
          </div>
        )}
        {isOnline && (
          <section className="movie__app">
            <Tabs defaultActiveKey="1" centered items={items} destroyInactiveTabPane />
          </section>
        )}
      </>
    )
  }
}
