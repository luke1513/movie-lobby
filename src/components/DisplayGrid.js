import { useEffect } from "react"
import useSetFavorite from "../hooks/useSetFavorite"
import Popup from "./Popup"

const DisplayGrid = ({ items, search, type, onRemoveFavorite }) => {

  const { loading, error, id, setFavorite } = useSetFavorite(onRemoveFavorite)

  items = type === 'Favorites' ? items.filter((el) => el.title.toLowerCase().includes(search.toLowerCase())) : items

  useEffect(() => {
    if (error) {
      console.log('Error in component:', error);
      // Handle the error (e.g., show a message to the user)
    }
  }, [error]);

  return (
    <div>
      {items.map((item) => 
        <div key={item.id}>
          <p>{item.title}</p>
          <button onClick={() => setFavorite(item.id, type)} disabled={id === item.id && loading}>
            {type === 'Movies'
              ? 'Add to Favorites'
              : 'Remove from Favorites'}
          </button>
        </div>
      )}
      {error && <Popup message={error && `Failed to ${type === 'Movies' ? 'add Movie to' : 'remove Movie from'} Favorites: ${error.message}`} />}
    </div>
  )
}

export default DisplayGrid