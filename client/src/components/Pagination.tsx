interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

const Pagination = ({ page, setPage, totalPages }: PaginationProps) => {
  return (
    <div>
      <button
        className='pagination fa fa-angle-left'
        disabled={page === 1}
        onClick={() => {
          setPage(page - 1);
        }}
      ></button>
      <span className='px-6 text-gray-700 font-bold'>Page {page}</span>
      <button
        className='pagination fa fa-angle-right'
        disabled={page === totalPages}
        onClick={() => {
          setPage(page + 1);
        }}
      ></button>
    </div>
  );
};

export default Pagination;
