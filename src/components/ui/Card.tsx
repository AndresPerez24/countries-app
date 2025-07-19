import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
}

function Card({ 
  children, 
  className = '', 
  header, 
  footer, 
  padding = 'md',
  shadow = 'md'
}: CardProps) {
  const baseClasses = 'bg-white border border-gray-200 rounded-lg overflow-hidden';
  
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg'
  };
  
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };
  
  const cardClasses = `${baseClasses} ${shadowClasses[shadow]} ${className}`;
  
  return (
    <div className={cardClasses}>
      {header && (
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
          {header}
        </div>
      )}
      
      <div className={paddingClasses[padding]}>
        {children}
      </div>
      
      {footer && (
        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
          {footer}
        </div>
      )}
    </div>
  );
}

export default Card;
