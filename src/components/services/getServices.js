const apiBase = 'https://api.themoviedb.org/3/'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMGViYWJhYjVjODYyMjc5ZGRlNDgwNjMwNGU5MTVmMCIsIm5iZiI6MTczNzAxMDc1My42OCwic3ViIjoiNjc4OGFlNDE5NDdiMTlmNzhiOTc3NWRiIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.TDbWz6JUhQEFyn8_q7ytX3lDn19-fPlxwwUttCWsIMI',
  },
}

// Поиск фильмов
function getMovies(value, page) {
  return fetch(`${apiBase}search/movie?query=%27${value}%27&include_adult=false&language=en-US&page=${page}`, options)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Could not fetch, received ${res.url} Ошибка: Статус код ${res.status}`)
      }
      return res.json()
    })
    .then((data) => data.results)
}

// Получение всех жанров
function getAllGenre() {
  return fetch(`${apiBase}genre/movie/list?language=en`, options)
    .then((res) => {
      if (!res.ok) throw new Error(`Could not fetch, received ${res.url} Ошибка: Статус код ${res.status}`)
      return res.json()
    })
    .then((data) => data.genres)
}

// Создание гостевой сессии
function guestSession() {
  return fetch(`${apiBase}authentication/guest_session/new`, options)
    .then((res) => res.json())
    .then((json) => json.guest_session_id)
}

// Отправка оценки фильма на сервер
function postRateMovie(id, rate) {
  localStorage.setItem(id, rate)
  const postOptions = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMGViYWJhYjVjODYyMjc5ZGRlNDgwNjMwNGU5MTVmMCIsIm5iZiI6MTczNzAxMDc1My42OCwic3ViIjoiNjc4OGFlNDE5NDdiMTlmNzhiOTc3NWRiIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.TDbWz6JUhQEFyn8_q7ytX3lDn19-fPlxwwUttCWsIMI',
    },
    body: JSON.stringify({
      media_id: id,
      value: rate,
    }),
  }

  fetch(`${apiBase}movie/${id}/rating?guest_session_id=${localStorage.sessionId}`, postOptions)
}

// Получение всех оцененных фильмов
function getRateMovies(page = 1) {
  return fetch(
    `${apiBase}guest_session/${localStorage.sessionId}/rated/movies?language=en-US&page=${page}&sort_by=created_at.asc`,
    options
  )
    .then((res) => {
      if (!res.ok) throw new Error('Еще нет оцененных фильмов')
      return res.json()
    })
    .then((data) => data.results)
}

// Удаление оцененных фильмов

export { getMovies, getAllGenre, guestSession, postRateMovie, getRateMovies }
