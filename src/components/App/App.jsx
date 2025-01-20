import { useState, useEffect } from 'react'

import MovieCardList from '../MovieCardList/MovieCardList'
import HeaderButtons from '../Header/HeaderButtons/HeaderButtons'
import './App.css'

export default function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleStatusChange = () => {
      setIsOnline(navigator.onLine)
    }

    window.addEventListener('online', handleStatusChange)

    window.addEventListener('offline', handleStatusChange)

    return () => {
      window.removeEventListener('online', handleStatusChange)
      window.removeEventListener('offline', handleStatusChange)
    }
  }, [isOnline])

  const offline = !isOnline ? (
    <div className="offline__wrapper">
      <h1 className="offline">You Are Offline</h1>
    </div>
  ) : null

  const online = isOnline ? (
    <section className="movie__app">
      <HeaderButtons />
      <MovieCardList />
    </section>
  ) : null

  return (
    <>
      {offline}
      {online}
    </>
  )
}
