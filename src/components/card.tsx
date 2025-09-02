import React, { ReactNode } from 'react';

export interface CardProps {
    children: ReactNode;
    className?: string;
}

export const Card = ({ children, className }: CardProps) => (
    <div className={`rounded-lg shadow-md bg-white ${className}`}>{children}</div>
);

export const CardHeader = ({ children, className }: CardProps) => (
    <div className={`p-4 border-b ${className}`}>{children}</div>
);

export const CardContent = ({ children, className }: CardProps) => (
    <div className={`p-4 ${className}`}>{children}</div>
);

export const CardTitle = ({ children, className }: CardProps) => (
    <h2 className={`text-xl font-bold ${className}`}>{children}</h2>
);