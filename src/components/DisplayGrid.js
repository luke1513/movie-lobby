import useSetFavorite from "../hooks/useSetFavorite"
import Popup from "./Popup"

const DisplayGrid = ({ items, search, type, onRemoveFavorite, isLoading }) => {

  const { loading, error, id, setFavorite } = useSetFavorite(onRemoveFavorite)

  items = type === 'Favorites' ? items.filter((el) => el.title.toLowerCase().includes(search.toLowerCase())) : items

  return (
    <div id='grid-wrapper'>
      {items.map((item) => 
        <div className={`card ${isLoading && 'loading'}`} key={item.id}>
          <div className="card-image" style={{
            backgroundImage: !isLoading ? `url(https://image.tmdb.org/t/p/w500${item.backdrop_path})` : 'none',
            backgroundColor: !isLoading ? 'none' : '#1a1a1a'
            }}></div>
          <div className="card-content">
            <div className="card-details">
              <h2>{item.title}</h2>
              <span>{item.release_date}</span>
            </div>
            <button onClick={() => setFavorite(item.id, type)} disabled={id === item.id && loading}>
              {type === 'Movies' ? 'ADD' : 'REMOVE'} <span className='favorite-icon'>{id === item.id && loading ? '↻' : type === 'Movies' ? '+' : '\u00D7'}</span>
            </button>
          </div>
        </div>
      )}
      <Popup message={error && `Failed to ${type === 'Movies' ? 'add Movie to' : 'remove Movie from'} Favorites: ${error.message}`} />
    </div>
  )
}

export default DisplayGrid