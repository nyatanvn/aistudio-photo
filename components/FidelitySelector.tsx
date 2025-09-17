import React from 'react';
import type { Fidelity } from '../types';

interface FidelitySelectorProps {
  options: Fidelity[];
  selectedOption: Fidelity;
  onSelect: (option: Fidelity) => void;
}

export const FidelitySelector: React.FC<FidelitySelectorProps> = ({ options, selectedOption, onSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onSelect(option)}
          className={`p-3 text-left rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 focus-visible:ring-amber-500
            ${
              selectedOption.id === option.id
                ? 'bg-neutral-800/50 ring-2 ring-amber-500'
                : 'bg-neutral-800/80 text-slate-300 hover:bg-neutral-700/80'
            }`}
          aria-pressed={selectedOption.id === option.id}
        >
          <p className={`font-semibold text-sm ${selectedOption.id === option.id ? 'text-amber-400' : 'text-slate-100'}`}>{option.name}</p>
          <p className="text-xs text-slate-400 mt-1">{option.description}</p>
        </button>
      ))}
    </div>
  );
};
