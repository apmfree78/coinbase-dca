import { useDeletePurchaseOrder } from 'orders/hooks';
import { assets, exchanges, assetType, exchangeType } from 'shared/types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Select } from 'components/Select';
import NumberInput from 'components/NumberInput';
import { PurchaseOrder } from 'shared/types';

const OrderRow = ({ order }: { order: PurchaseOrder }) => {
  const [asset, setAsset] = useState<assetType>(order.asset);
  const [exchange, setExchange] = useState<exchangeType>(order.exchange);
  const [amount, setAmount] = useState<number>(order.amount);
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
      {editRow && (
        <tr className='border-green-400 border-4 rounded-lg bg-green-100 hover:bg-green-200 transition duration-700 ease-linear'>
          <th className='pt-2'>
            <Select<assetType>
              value={asset}
              onSelectChange={setAsset}
              options={assets}
            />
          </th>
          <th>
            <NumberInput
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
            />
          </th>
          <th className='pt-2 uppercase'>
            <Select<exchangeType>
              value={exchange}
              onSelectChange={setExchange}
              options={exchanges}
            />
          </th>
          {/* icon to submit edit */}
          <th className='py-2 pr-4 pl-3 hover:scale-110 hover:text-blue-600'>
            <button
              type='submit'
              // onClick={SubmitOrder}
              disabled={amount < 10}
              className='rounded text-xs uppercase bg-green-400 border-gray-300 border-2 p-1 hover:bg-green-600 shadow-xl'
            >
              update
            </button>
          </th>
          {/* icon to remove edit row */}
          <th className='p-2 hover:text-red-600 hover:scale-110'>
            <i
              onClick={() => setEditRow(false)}
              className='fa-regular fa-rectangle-xmark text-red-300'
            />
          </th>
        </tr>
      )}
    </>
  );
};

export default OrderRow;
