import React from 'react';

interface HeaderProps {
  title: string;
  description: string;
}

export const Header: React.FC<HeaderProps> = ({ title, description }) => {
  return (
    <header className="flex-shrink-0">
      <div className="text-left">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-100">
          {title}
        </h1>
        <p className="mt-2 text-base text-slate-400">
          {description}
        </p>
      </div>
    </header>
  );
};
