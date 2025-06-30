import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface SliderInputProps {
  name: string;
  label: string;
  min?: number;
  max?: number;
  step?: number;
}

export const SliderInput: React.FC<SliderInputProps> = ({ name, label, min = 1, max = 100, step = 1 }) => {
  const { control, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string | undefined;

  return (
    <div className='flex flex-col w-full'>
      <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="flex flex-col gap-2">
            <input
              id={name}
              type="range"
              min={min}
              max={max}
              step={step}
              value={field.value ?? min}
              onChange={e => field.onChange(Number(e.target.value))}
              className="w-full accent-yellow-400 h-2 bg-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>{min}</span>
              <span className="font-bold text-yellow-300">{field.value ?? min}</span>
              <span>{max}</span>
            </div>
          </div>
        )}
      />
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}; 