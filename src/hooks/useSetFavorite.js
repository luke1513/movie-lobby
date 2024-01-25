import { useState } from "react"

const useSetFavorite = (onRemoveFavorite) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [id, setId] = useState(null)

  const setFavorite = (id, type) => {

    setLoading(true)
    setError(null)
    setId(id)

    fetch('https://api.themoviedb.org/3/account/20941210/favorite', {
      method: 'post',
      headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MWZiZTQ5YjY1MWFjODZiODY3M2RiNzQxZDAyMzJkOCIsInN1YiI6IjY1YWZhYzIwMTU4Yzg1MDEwYWEwZTA4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4sgFRGgorNIzSpqk6SIlE0XgX2ckY-zEqDKQUqiKTes', 'content-type': 'application/json' },
      body: JSON.stringify({media_type: 'movie', media_id: id, favorite: type === 'Movies' ? true : false})
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`)
        return res.json()
      })
      .then(() => type === 'Favorites' && onRemoveFavorite())
      .catch(setError)
      .finally(() => setLoading(false))
  }

  return { loading, error, id, setFavorite }
}

export default useSetFavorite