import { useDeletePurchaseOrder } from 'orders/hooks';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PurchaseOrder } from 'shared/types';
import EditRow from './EditRow';

const OrderRow = ({ order }: { order: PurchaseOrder }) => {
  const deletePurchaseOrder = useDeletePurchaseOrder();
  const [editRow, setEditRow] = useState<boolean>(false);

  const confirmAndDeleteOrder = (postId: string) => {
    if (
      window.confirm('Are you sure you want to delete this purchase order?')
    ) {
      deletePurchaseOrder(postId);
    }
  };

  return (
    <>
      {!editRow ?
        <tr className='hover:bg-gray-200 transition duration-700 ease-linear'>
          <th className='p-3'>{order.asset}</th>
          <th className='p-3'>{order.amount}</th>
          <th className='p-3 uppercase'>{order.exchange}</th>
          {/* show check or x icon in this column */}
          {/* icon to delete post */}
          <th className='p-3 hover:text-red-600 hover:scale-110'>
            <i
              onClick={() => confirmAndDeleteOrder(order.id)}
              className='fa-regular fa-circle-xmark'
            />
          </th>
          {/* icon to edit post */}
          <th className='py-3 pr-4 pl-3 hover:scale-110 hover:text-blue-600'>
            <Link to={`/order/${order.id}`}>
              <i
                onClick={() => setEditRow(true)}
                className='fa-solid fa-pencil'
              />
            </Link>
          </th>
        </tr>
        : <EditRow order={order} hideRow={() => setEditRow(false)} />
      }
    </>
  );
};

export default OrderRow;
