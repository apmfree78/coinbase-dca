import { useState } from 'react';
import { assets, exchanges, assetType, exchangeType } from 'shared/types';
import { usePostPurchaseOrder } from 'orders/hooks';
import Orders from 'orders/Orders';
import { Select } from 'components/Select';
import NumberInput from 'components/NumberInput';

const OrderHome: React.FC = () => {
  const [asset, setAsset] = useState<assetType>('BTC');
  const [exchange, setExchange] = useState<exchangeType>('coinbase');
  const [amount, setAmount] = useState<number>(0);
  const { mutate: postOrder, isLoading } = usePostPurchaseOrder();

  const SubmitOrder = () => {
    // submit user order to database
    postOrder({ exchange, asset, amount });
  };

  return (
    <>
      <span className='flex items-center text-xl'>
        <strong>Buy</strong>{' '}
        <NumberInput
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
        />
        of{' '}
        <Select<assetType>
          value={asset}
          onSelectChange={setAsset}
          options={assets}
        />
        from{' '}
        <Select<exchangeType>
          value={exchange}
          onSelectChange={setExchange}
          options={exchanges}
        />
        <i>Monthly</i>
      </span>
      <p className='ml-14'>*Miminum order size is $10</p>
      <button
        type='submit'
        onClick={SubmitOrder}
        disabled={amount < 10 || isLoading}
        className='dca-button mt-2 shadow-xl'
      >
        <span>
          <i className='fa-solid fa-bolt'></i>
        </span>
        <span className='pl-2'>Submit Order</span>
      </button>
      <hr />
      <hr />
      <hr />
      <div className='flex flex-col items-center ml-32'>
        <Orders />
      </div>
    </>
  );
};

export default OrderHome;
