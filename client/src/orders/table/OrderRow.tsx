import { useDeletePurchaseOrder } from 'orders/hooks';
import { Link } from 'react-router-dom';
import { PurchaseOrder } from 'shared/types';

const OrderRow = ({ purchaseOrder }: { purchaseOrder: PurchaseOrder }) => {
  const deletePurchaseOrder = useDeletePurchaseOrder();

  const confirmAndDeleteOrder = (postId: string) => {
    if (
      window.confirm('Are you sure you want to delete this purchase order?')
    ) {
      deletePurchaseOrder(postId);
    }
  };

  return (
    <tr key={purchaseOrder.id}>
      <th>{purchaseOrder.asset}</th>
      <th>{purchaseOrder.amount}</th>
      <th>{purchaseOrder.exchange}</th>
      {/* show check or x icon in this column */}
      {/* icon to delete post */}
      <th className='text-center'>
        <i
          onClick={() => confirmAndDeleteOrder(purchaseOrder.id)}
          className='fa-regular fa-circle-xmark'
        />
      </th>
      {/* icon to edit post */}
      <th className='text-center'>
        <Link to={`/order/${purchaseOrder.id}`}>
          <i className='fa-solid fa-pencil' />
        </Link>
      </th>
    </tr>
  );
};

export default OrderRow;
