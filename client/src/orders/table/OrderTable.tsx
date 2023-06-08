import { PurchaseOrder } from 'shared/types';

import OrderRow from './OrderRow';

interface ListOrderProps {
  orders: PurchaseOrder[];
}

const PostTable = ({ orders }: ListOrderProps) => {
  return (
    // TODO change below to tailwind css
    <table className='is-striped is-hoverable table'>
      <thead>
        <tr className='bg-gray-200'>
          <th>Order</th>
          <th>Asset</th>
          <th>Amount</th>
          <th>Exchange</th>
          <th></th>
          <th></th>
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
