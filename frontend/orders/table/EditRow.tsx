import { usePatchPurchaseOrder } from 'orders/hooks';
import { assets, exchanges, assetType, exchangeType } from 'shared/types';
import { useState } from 'react';
import { Select } from 'components/Select';
import NumberInput from 'components/NumberInput';
import { PurchaseOrder } from 'shared/types';
import { customToast } from 'components/Toast';

const EditRow = ({
  order,
  hideRow,
}: {
  order: PurchaseOrder;
  hideRow: () => void;
}) => {
  const [asset, setAsset] = useState<assetType>(order.asset);
  const [exchange, setExchange] = useState<exchangeType>(order.exchange);
  const [amount, setAmount] = useState<number>(order.amount);
  const { mutate: updateOrder, isLoading } = usePatchPurchaseOrder();

  const handleOrderUpdate = () => {
    //check that at least 1 field is changed
    if (
      asset === order.asset &&
      exchange === order.exchange &&
      amount === order.amount
    ) {
      customToast('no values updated', 'is-warning');
      return;
    }

    // update order
    updateOrder({
      id: order.id,
      payload: { asset, exchange, amount, owner: order.owner },
    });

    // exit after update  
    hideRow();
  };

  return (
    <tr className='border-green-400 border-4 bg-green-100 hover:bg-green-200 transition duration-700 ease-linear'>
      <th className='pt-2'>
        <Select<assetType>
          value={asset}
          onSelectChange={setAsset}
          options={assets}
        />
      </th>
      <th>
        <NumberInput
          min={10}
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
          disabled={amount < 10 || isLoading}
          onClick={handleOrderUpdate}
          className='rounded text-xs uppercase bg-green-400 border-gray-300 border-2 p-1 hover:bg-green-600 shadow-xl disabled:bg-slate-200'
        >
          update
        </button>
      </th>
      {/* icon to remove edit row */}
      <th className='p-2 hover:text-red-600 hover:scale-110'>
        <i
          onClick={hideRow}
          className='fa-regular fa-rectangle-xmark text-red-300'
        />
      </th>
    </tr>
  );
};

export default EditRow;
