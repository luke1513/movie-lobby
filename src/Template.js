import { useState, useEffect } from "react"

import DisplayGrid from "./components/DisplayGrid"
import useGetData from "./hooks/useGetData"
import Pagination from "./components/Pagination"

const Template = ({ type }) => {

  const [searchValue, setSearchValue] = useState('')
  const [page, setPage] = useState(1)
  const { loading, data, error, refetch } = useGetData(type === 'Movies' && searchValue, page, type)

  useEffect(() => {
    setPage(1)
  }, [type])

  // useModal(error) // if error empty do not render, else set that timeout

  return (
    <div>
      <div>
        <input type='text' placeholder={`Search ${type}...`} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
        {searchValue === ''
        ? type === 'Movies'
        ? 'Sorted by Trending'
        :'Sorted by Most Recent'
        : <button onClick={() => setSearchValue('')}>Clear Search</button>
        }
      </div>
      {!loading ? 
      <>
        <DisplayGrid items={data.results} search={searchValue} type={type} onRemoveFavorite={() => type === 'Favorites' && refetch()} />
        <Pagination page={page} totalPages={data.total_pages} onPageChange={setPage} />
      </>
      : 'loading'}
    </div>
  )
}

export default Template