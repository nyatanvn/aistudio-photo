import React from 'react';
import type { AspectRatio } from '../types';

interface AspectRatioSelectorProps {
  options: AspectRatio[];
  selectedOption: AspectRatio;
  onSelect: (option: AspectRatio) => void;
}

export const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({ options, selectedOption, onSelect }) => {
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
          {option.name} ({option.id})
        </button>
      ))}
    </div>
  );
};