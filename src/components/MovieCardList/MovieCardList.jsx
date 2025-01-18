import { useState, useEffect } from 'react'

import MovieCard from '../MovieCard/MovieCard'
import './MovieCardList.css'

export default function MovieCardList() {
  const apiBase = 'https://api.themoviedb.org/3/search/movie'

  const [movies, setMovies] = useState([])

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNzdjYjZlMmFiMDA1OTVlOGY0MDliNDhkMjg1YjA2NSIsIm5iZiI6MTczNzAxMDc1My42OCwic3ViIjoiNjc4OGFlNDE5NDdiMTlmNzhiOTc3NWRiIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.3Zc2CoPcyW3f8pKqbaDTwyig8nAYdXnql4fs-t6i3L4',
    },
  }

  useEffect(() => {
    fetch(`${apiBase}?query=%27return%27&include_adult=false&language=en-US&page=1`, options)
      .then((res) => res.json())
      .then((data) => setMovies(data.results))
  })

  return (
    <ul className="movies__list">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </ul>
  )
}
