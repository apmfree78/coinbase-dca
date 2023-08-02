import Pagination from 'components/Pagination';
import OrderTable from 'orders/table/OrderTable';

import { useUserPurchaseOrders } from 'orders/hooks';

const Orders = () => {
  const {
    paginatedData: orders,
    page,
    setPage,
    totalPages,
    isLoading,
  } = useUserPurchaseOrders();

  if (isLoading) return <p>Loading...</p>;
  if (!orders || orders.length === 0)
    return <div>You have no orders! Create a new order above.</div>;

  return (
    <>
      <OrderTable orders={orders} />
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </>
  );
};

export default Orders;
