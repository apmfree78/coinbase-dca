import { SubmittedOrder } from 'shared/types';
import { formatDate } from 'shared/formatDate';

const PurchaseRow = ({ purchase }: { purchase: SubmittedOrder }) => {
  const date = formatDate(purchase.created);
  return (
    <tr className='hover:bg-gray-200 transition duration-700 ease-linear'>
      <th className='p-3'>{date}</th>
      <th className='p-3 uppercase'>{purchase.product_id}</th>
      <th className='p-3'>${purchase.amount}</th>
      <th className='p-3'>{purchase.exchange}</th>
      <th className='p-3'>{purchase.isFilled ? 'Filled' : 'Pending'}</th>
    </tr>
  );
};

export default PurchaseRow;
