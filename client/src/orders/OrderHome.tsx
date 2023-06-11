import { useState } from 'react';
import { assets, exchanges, assetType, exchangeType } from 'shared/types';
import { Select } from 'components/Select';
import NumberInput from 'components/NumberInput';

const OrderHome: React.FC = () => {
  const [asset, setAsset] = useState<assetType>('BTC');
  const [exchange, setExchange] = useState<exchangeType>('coinbase');
  const [amount, setAmount] = useState<number>(0);

  return (
    <>
      <span className='w-1/2 flex items-center text-xl'>
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
      *Miminum order size is $10
      <button type='submit' disabled={amount < 10} className='dca-button mt-2'>
        <span>
          <i className='fa-solid fa-bolt'></i>
        </span>
        <span className='pl-2'>Submit Order</span>
      </button>
    </>
  );
};

export default OrderHome;
