import Pagination from 'components/Pagination';
import PurchaseTable from 'purchases/table/PurchaseTable';
import { useUserSubmittedOrders } from 'purchases/hooks';

const Purchases = () => {
  const {
    paginatedData: purchases,
    page,
    setPage,
    totalPages,
    isLoading,
  } = useUserSubmittedOrders();

  if (isLoading) return <p>Loading...</p>;
  if (!purchases) return <div>You have no purchases!</div>;

  return (
    <div className='flex flex-col items-center'>
      <PurchaseTable purchases={purchases} />
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default Purchases;
