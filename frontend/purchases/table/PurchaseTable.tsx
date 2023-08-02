import { SubmittedOrder } from 'shared/types';
import PurchaseRow from './PurchaseRow';

interface ListOrderProps {
  purchases: SubmittedOrder[];
}

const PurchaseTable = ({ purchases }: ListOrderProps) => {
  return (
    <table className='border-slate-200 border-2 shadow-xl mb-4'>
      <thead className='text-center'>
        <tr className='bg-gray-500'>
          <th className='p-3 text-white text-lg'>Submitted</th>
          <th className='p-3 text-white text-lg'>Asset</th>
          <th className='p-3 text-white text-lg'>Amount</th>
          <th className='p-3 text-white text-lg'>Exchange</th>
          <th className='p-3 text-white text-lg'>Is Filled?</th>
        </tr>
      </thead>
      <tbody>
        {purchases.map((purchase: SubmittedOrder, index: number) => (
          <PurchaseRow key={index} purchase={purchase} />
        ))}
      </tbody>
    </table>
  );
};

export default PurchaseTable;
