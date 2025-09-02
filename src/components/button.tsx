import React, { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { }

export const Button = ({ children, className, ...props }: ButtonProps) => (
    <button
        className={`px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 ${className}`}
        {...props}
    >
        {children}
    </button>
);