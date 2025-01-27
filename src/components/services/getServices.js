// Поиск фильмов
function getMovies(value, page) {
  const apiBase = 'https://api.themoviedb.org/3/search/movie'

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMGViYWJhYjVjODYyMjc5ZGRlNDgwNjMwNGU5MTVmMCIsIm5iZiI6MTczNzAxMDc1My42OCwic3ViIjoiNjc4OGFlNDE5NDdiMTlmNzhiOTc3NWRiIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.TDbWz6JUhQEFyn8_q7ytX3lDn19-fPlxwwUttCWsIMI',
    },
  }

  return fetch(`${apiBase}?query=%27${value}%27&include_adult=false&language=en-US&page=${page}`, options)
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
  const apiBase = 'https://api.themoviedb.org/3/'

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMGViYWJhYjVjODYyMjc5ZGRlNDgwNjMwNGU5MTVmMCIsIm5iZiI6MTczNzAxMDc1My42OCwic3ViIjoiNjc4OGFlNDE5NDdiMTlmNzhiOTc3NWRiIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.TDbWz6JUhQEFyn8_q7ytX3lDn19-fPlxwwUttCWsIMI',
    },
  }

  return fetch(`${apiBase}genre/movie/list?language=en`, options)
    .then((res) => {
      if (!res.ok) throw new Error(`Could not fetch, received ${res.url} Ошибка: Статус код ${res.status}`)
      return res.json()
    })
    .then((data) => data.genres)
}

// Гостевая сессия
function guestSession() {
  const url = 'https://api.themoviedb.org/3/authentication/guest_session/new'
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMGViYWJhYjVjODYyMjc5ZGRlNDgwNjMwNGU5MTVmMCIsIm5iZiI6MTczNzAxMDc1My42OCwic3ViIjoiNjc4OGFlNDE5NDdiMTlmNzhiOTc3NWRiIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.TDbWz6JUhQEFyn8_q7ytX3lDn19-fPlxwwUttCWsIMI',
    },
  }

  return fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      return json.guest_session_id
    })
}

// function addRatingMovie(id, count) {}

export { getMovies, getAllGenre, guestSession }
