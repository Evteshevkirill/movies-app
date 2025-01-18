export default async function getMovies() {
  const apiBase = 'https://api.themoviedb.org/3/search/movie'

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNzdjYjZlMmFiMDA1OTVlOGY0MDliNDhkMjg1YjA2NSIsIm5iZiI6MTczNzAxMDc1My42OCwic3ViIjoiNjc4OGFlNDE5NDdiMTlmNzhiOTc3NWRiIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.3Zc2CoPcyW3f8pKqbaDTwyig8nAYdXnql4fs-t6i3L4',
    },
  }

  const res = await fetch(`${apiBase}?query=%27return%27&include_adult=false&language=en-US&page=1`, options)
  return res.json()
}
