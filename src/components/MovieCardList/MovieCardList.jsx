import MovieCard from '../MovieCard/MovieCard'
import './MovieCardList.css'

export default function MovieCardList(props) {
  const { movies, allGenres } = props

  return (
    <ul className="movies__list">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} allGenres={allGenres} />
      ))}
    </ul>
  )
}
