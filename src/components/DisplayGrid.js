import useSetFavorite from "../hooks/useSetFavorite"

const DisplayGrid = ({ items, search, type, onRemoveFavorite }) => {

  const { loading, error, id, setFavorite } = useSetFavorite(onRemoveFavorite)

  items = type === 'Favorites' ? items.filter((el) => el.title.toLowerCase().includes(search.toLowerCase())) : items

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
    </div>
  )
}

export default DisplayGrid