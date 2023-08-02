import { PurchaseOrder } from 'shared/types';

import OrderRow from './OrderRow';

interface ListOrderProps {
  orders: PurchaseOrder[];
}

const OrderTable = ({ orders }: ListOrderProps) => {
  return (
    // TODO change below to tailwind css
    <table className='border-slate-200 border-2 shadow-xl mb-4'>
      <thead className='text-center'>
        <tr className='bg-gray-500'>
          <th className='p-3 text-white text-lg'>Asset</th>
          <th className='p-3 text-white text-lg'>Amount</th>
          <th className='p-3 text-white text-lg'>Exchange</th>
          <th className='p-3'></th>
          <th className='p-3'></th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order: PurchaseOrder, index: number) => (
          <OrderRow key={index} order={order} />
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;
