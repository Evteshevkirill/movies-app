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

// Гостевая сессия
function guestSession() {
  return fetch(`${apiBase}authentication/guest_session/new`, options)
    .then((res) => res.json())
    .then((json) => json.guest_session_id)
}

function postRateMovie(id, rate) {
  const postOptions = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMGViYWJhYjVjODYyMjc5ZGRlNDgwNjMwNGU5MTVmMCIsIm5iZiI6MTczNzAxMDc1My42OCwic3ViIjoiNjc4OGFlNDE5NDdiMTlmNzhiOTc3NWRiIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.TDbWz6JUhQEFyn8_q7ytX3lDn19-fPlxwwUttCWsIMI',
    },
    body: JSON.stringify({
      media_type: 'movie',
      media_id: id,
      value: rate,
    }),
  }

  fetch(`${apiBase}movie/${id}/rating`, postOptions)
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.error(err))
}

function getRateMovies() {
  const id = localStorage.sessionId

  fetch(`${apiBase}guest_session/${id}/rated/movies?language=en-US&page=1&sort_by=created_at.asc`, options)
    .then((res) => res.json())
    .then((data) => console.log(data.results))
    .catch((err) => console.error(err))
}

export { getMovies, getAllGenre, guestSession, postRateMovie, getRateMovies }
