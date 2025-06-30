import React from 'react';
import { useFormContext } from 'react-hook-form';

interface TextInputProps {
  name: string;
  label: string;
  placeholder?: string;
}

export const TextInput: React.FC<TextInputProps> = ({ name, label, placeholder }) => {
  const { register, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string | undefined;

  return (
    <div className='flex flex-col w-full'>
      <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
      <input
        id={name}
        {...register(name)}
        placeholder={placeholder}
        className="mt-1 block w-full bg-gray-700 border-gray-600 shadow-sm focus:border-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-opacity-50 px-3 py-2 text-white"
        type="text"
      />
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}; 