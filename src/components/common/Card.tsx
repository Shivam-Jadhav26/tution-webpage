import React, { ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
  key?: React.Key;
}

export const Card = ({ children, className, title, description }: CardProps) => {
  return (
    <div className={cn('dashboard-card overflow-hidden', className)}>
      {(title || description) && (
        <div className="border-b border-slate-100 p-4 md:p-6">
          {title && <h3 className="text-lg font-bold text-slate-900">{title}</h3>}
          {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
        </div>
      )}
      <div className="p-4 md:p-6">{children}</div>
    </div>
  );
};
