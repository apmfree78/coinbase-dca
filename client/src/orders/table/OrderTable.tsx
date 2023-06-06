import { PurchaseOrder } from 'shared/types';

import OrderRow from './OrderRow';

interface ListOrderProps {
  orders: PurchaseOrder[];
}

const PostTable = ({ orders }: ListOrderProps) => {
  return (
    <table className='is-striped is-hoverable table'>
      <thead>
        <tr className='bg-gray-200'>
          <th>Post</th>
          <th>Published?</th>
          <th> </th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order: PurchaseOrder) => (
          <OrderRow key={order.id} order={order} />
        ))}
      </tbody>
    </table>
  );
};

export default PostTable;
