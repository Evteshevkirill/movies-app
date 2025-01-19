export default async function getMovies() {
  const apiBase = 'https://api.themoviedb.org/3/search/movie'

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMGViYWJhYjVjODYyMjc5ZGRlNDgwNjMwNGU5MTVmMCIsIm5iZiI6MTczNzAxMDc1My42OCwic3ViIjoiNjc4OGFlNDE5NDdiMTlmNzhiOTc3NWRiIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.TDbWz6JUhQEFyn8_q7ytX3lDn19-fPlxwwUttCWsIMI',
    },
  }

  const res = await fetch(`${apiBase}?query=%27return%27&include_adult=false&language=en-US&page=1`, options)

  if (!res.ok) {
    throw new Error(`Could not fetch, received ${res.url} Ошибка: Статус кода ${res.status}`)
  }

  const data = await res.json()
  return data.results
}
