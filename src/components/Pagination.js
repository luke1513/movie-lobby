const Pagination = ({ page, totalPages, onPageChange }) => {

  totalPages = totalPages > 500 ? 500 : totalPages

  return (
    <div>
      <div onClick={() => page > 1 && onPageChange(1)}>&#10094;&#10094;</div>
      <div onClick={() => page > 2 && onPageChange(page - 1)}>&#10094;</div>
      {page - 2 >= 1 && <div>...</div>}

      {page - 1 >= 1 && <div onClick={() => onPageChange(page - 1)}>{page - 1}</div>}
      <div>{page}</div>
      {page + 1 <= totalPages && <div onClick={() => onPageChange(page + 1)}>{page + 1}</div>}

      {page + 2 <= totalPages && <div>...</div>}
      <div onClick={() => page < totalPages - 1 && onPageChange(page + 1)}>&#10095;</div>
      <div onClick={() => page < totalPages && onPageChange(totalPages)}>&#10095;&#10095;</div> 
    </div>
  )
}

export default Pagination