import React from 'react';
import type { Expression } from '../types';

interface ExpressionSelectorProps {
  options: Expression[];
  selectedOption: Expression;
  onSelect: (option: Expression) => void;
}

export const ExpressionSelector: React.FC<ExpressionSelectorProps> = ({ options, selectedOption, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onSelect(option)}
          className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 focus-visible:ring-amber-500
            ${
              selectedOption.id === option.id
                ? 'bg-amber-500 text-neutral-900 shadow-md shadow-amber-500/20'
                : 'bg-neutral-800 text-slate-300 hover:bg-neutral-700'
            }`}
          aria-pressed={selectedOption.id === option.id}
        >
          {option.name}
        </button>
      ))}
    </div>
  );
};