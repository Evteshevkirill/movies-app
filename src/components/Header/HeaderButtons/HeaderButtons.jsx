import './HeaderButtons.css'

export default function HeaderButtons() {
  return (
    <div className="header__buttons">
      <button type="button" className="header__button active">
        Search
      </button>
      <button type="button" className="header__button">
        Rated
      </button>
    </div>
  )
}
