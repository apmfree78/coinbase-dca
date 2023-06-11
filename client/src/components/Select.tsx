
import { ChangeEvent, SelectHTMLAttributes } from 'react';

interface SelectProps<T> extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange'> {
  value: T;
  onSelectChange: (value: string) => void;
  options: T[];
}

export function Select<T>({ value, onSelectChange, options, ...props }: SelectProps<T>) {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onSelectChange(event.target.value);
  };

  return (
    <select value={value as string} onChange={handleChange} {...props}>
      {options.map((option) => (
        <option key={option as string} value={option as string}>
          {option as string}
        </option>
      ))}
    </select>
  );
};
