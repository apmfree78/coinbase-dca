import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  rightIcon?: string;
  leftIcon?: string;
};
const Input: React.FC<InputProps> = ({ rightIcon, leftIcon, ...props }) => {
  return (
    <div className='relative w-full max-w-xs'>
      <input
        className='pr-10 pl-10 block w-full border-2 rounded py-2 px-3 leading-tight focus:outline-slate-300'
        {...props}
      />
      <span className='absolute inset-y-0 left-0 flex items-center pl-2 text-gray-400'>
        <i className={leftIcon}></i>
      </span>
      <span className='absolute inset-y-0 right-0 flex items-center pr-2 text-gray-400'>
        <i className={rightIcon}></i>
      </span>
    </div>
  );
};

export default Input;
