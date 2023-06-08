interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

const Pagination = ({ page, setPage, totalPages }: PaginationProps) => {
  return (
    <div>
      <button
        className='button is-small is-rounded fa fa-angle-left'
        disabled={page === 1}
        onClick={() => {
          setPage(page - 1);
        }}
      ></button>
      <span style={{ padding: '0vh 1.5vw' }}>Page {page}</span>
      <button
        className='button is-small is-rounded fa fa-angle-right'
        disabled={page === totalPages}
        onClick={() => {
          setPage(page + 1);
        }}
      ></button>
    </div>
  );
};

export default Pagination;
