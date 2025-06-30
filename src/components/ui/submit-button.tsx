import React from 'react';

interface SubmitButtonProps {
  children: React.ReactNode;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ children }) => (
  <button
    type="submit"
    className="mt-4 px-4 py-2 bg-yellow-500 text-black font-bold hover:bg-yellow-600 hover:cursor-pointer transition-colors duration-300 w-full shadow-md"
  >
    {children}
  </button>
); 