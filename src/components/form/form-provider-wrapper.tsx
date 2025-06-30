import React from 'react';
import { FormProvider, type FieldValues, type UseFormReturn } from 'react-hook-form';

interface FormProviderWrapperProps<T extends FieldValues> {
  methods: UseFormReturn<T>;
  children: React.ReactNode;
}

export function FormProviderWrapper<T extends FieldValues>({ methods, children }: FormProviderWrapperProps<T>) {
  return <FormProvider {...methods}>{children}</FormProvider>;
} 