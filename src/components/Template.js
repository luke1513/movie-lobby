import { useState, useEffect } from "react"

import DisplayGrid from "./DisplayGrid"
import useGetData from "../hooks/useGetData"
import Pagination from "./Pagination"
import Popup from "./Popup"

const Template = ({ type }) => {

  const [searchValue, setSearchValue] = useState('')
  const [page, setPage] = useState(1)
  const { loading, data, error, refetch } = useGetData(type === 'Movies' && searchValue, page, type)

  useEffect(() => {
    setPage(1)
  }, [type])

  return (
    <div>
      <div id="search-wrapper">
        <input type='text' placeholder={`Search ${type}...`} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
        {searchValue && <span onClick={() => setSearchValue('')}>✖</span>}
      </div>
      <div id='sorted-wrapper'>
        <span>{!searchValue ? type === 'Movies' ? 'Trending' : 'Most Recent' : 'Custom'}<span id='sort-icon'> &#8693;</span></span>
      </div>
      {data && <>
        <DisplayGrid items={data.results} search={searchValue} type={type} onRemoveFavorite={refetch} isLoading={loading} />
        <Pagination page={page} totalPages={data.total_pages} onPageChange={setPage} />
      </>}
      {!data && loading && 'Loading...'}
      <Popup message={error && `Failed to retrieve ${type} data: ${error.message}`} />
    </div>
  )
}

export default Template