import { ChangeEvent, SelectHTMLAttributes } from 'react';

interface SelectProps<T>
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange'> {
  value: T;
  onSelectChange: (value: T) => void;
  options: readonly T[];
}

export function Select<T>({
  value,
  onSelectChange,
  options,
  ...props
}: SelectProps<T>) {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onSelectChange(event.target.value as T);
  };

  return (
    <select
      className='py-1 px-2 border-slate-200 border-2 mx-3 rounded hover:border-gray-500 shadow-xl'
      value={value as string}
      onChange={handleChange}
      {...props}
    >
      {options.map((option) => (
        <option key={option as string} value={option as string}>
          {option as string}
        </option>
      ))}
    </select>
  );
}
