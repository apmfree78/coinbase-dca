import React from 'react';

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  rightIcon?: string;
  leftIcon?: string;
};
const NumberInput: React.FC<InputProps> = ({
  rightIcon,
  leftIcon = 'fas fa-dollar-sign',
  ...props
}) => {
  return (
    <div className='relative'>
      <input
        type='number'
        className='pl-5 w-32 border-2 rounded py-1 px-1 mx-2 my-2 leading-tight focus:outline-slate-300 shadow-xl'
        {...props}
      />
      <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400'>
        <i className={leftIcon}></i>
      </span>
      <span className='absolute inset-y-0 right-0 flex items-center pr-2 text-gray-400'>
        <i className={rightIcon}></i>
      </span>
    </div>
  );
};

export default NumberInput;
