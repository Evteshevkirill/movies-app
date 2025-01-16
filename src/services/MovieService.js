export default class MovieService {
  _apiBase = 'https://api.themoviedb.org/3/search'

  async getResources(url) {
    const res = await fetch(`${this._apiBase}${url}`)

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, ${res.status}`)
    }

    return await res.json()
  }

  async getAllMovies() {
    const res = await this.getResources(`/movies/`)
    return res.results
  }

  getMovie(id) {
    return this.getResources(`/movies/${id}`)
  }
}
