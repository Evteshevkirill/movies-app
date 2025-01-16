import { Component } from 'react'

export default class MovieCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    }
  }

  componentDidMount() {
    fetch('https://api.themoviedb.org/3/search/movies?=api_key=177cb6e2ab00595e8f409b48d285b065')
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items,
          })
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          })
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state
    if (error) {
      return <div>Ошибка: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Загрузка...</div>
    } else {
      return (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.name} {item.price}
            </li>
          ))}
        </ul>
      )
    }
  }
}
