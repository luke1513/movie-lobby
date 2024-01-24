import { useState, useEffect, useCallback } from "react"

const useGetData = (searchValue, page, type) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const fetchData = useCallback(() => {
    setLoading(true)
    setError(null)

    const url =
    type === 'Movies'
      ? searchValue === ''
        ? `https://api.themoviedb.org/3/trending/movie/week?page=${page}`
        : `https://api.themoviedb.org/3/search/movie?query=${searchValue}&page=${page}`
      : `https://api.themoviedb.org/3/account/20941210/favorite/movies?page=${page}`

    const timeout = setTimeout(() => {
      fetch(url, {
        headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MWZiZTQ5YjY1MWFjODZiODY3M2RiNzQxZDAyMzJkOCIsInN1YiI6IjY1YWZhYzIwMTU4Yzg1MDEwYWEwZTA4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4sgFRGgorNIzSpqk6SIlE0XgX2ckY-zEqDKQUqiKTes' }
      })
        .then(res => {
          if(!res.ok) throw new Error(`HTTP error ${res.status}`)
          return res.json()
        })
        .then(setData)
        .catch(setError)
        .finally(() => setLoading(false))
    }, type === 'Movies' && searchValue ? 750 : 0)

    return timeout
  }, [searchValue, page, type])

  useEffect(() => {
    const timeout = fetchData()
    return () => clearTimeout(timeout)
  }, [fetchData])

  return { loading, data, error, refetch: fetchData }
}

export default useGetData