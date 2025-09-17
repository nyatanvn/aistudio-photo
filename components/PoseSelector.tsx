import React from 'react';
import type { Pose, PoseCategory } from '../types';

interface PoseSelectorProps {
  poseCategories: PoseCategory[];
  selectedPoses: Pose[];
  onPoseToggle: (pose: Pose) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onToggleCategory: (category: PoseCategory) => void;
}

export const PoseSelector: React.FC<PoseSelectorProps> = ({ 
    poseCategories, 
    selectedPoses, 
    onPoseToggle,
    onSelectAll,
    onDeselectAll,
    onToggleCategory
}) => {
  return (
    <div>
      <div className="flex items-center gap-4 mb-6 pb-4 border-b border-neutral-800">
        <button onClick={onSelectAll} className="text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors focus:outline-none focus:ring-1 focus:ring-amber-400 rounded">
          Chọn Tất Cả
        </button>
        <div className="border-l border-neutral-700 h-4"></div>
        <button onClick={onDeselectAll} className="text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors focus:outline-none focus:ring-1 focus:ring-slate-400 rounded">
          Bỏ Chọn Tất Cả
        </button>
      </div>

      {poseCategories.map((category) => {
        const selectedPoseIds = new Set(selectedPoses.map(p => p.id));
        const areAllInCategorySelected = category.poses.every(p => selectedPoseIds.has(p.id));
        
        return (
          <div key={category.name} className="mb-8 last:mb-0">
            <div className="flex justify-between items-center mb-4 sticky top-0 bg-neutral-900/80 py-2 backdrop-blur-sm z-10 -mx-6 px-6">
                <h3 className="text-lg font-semibold text-amber-400/90">
                    {category.name}
                </h3>
                <button
                    onClick={() => onToggleCategory(category)}
                    className="text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-amber-400 transition-colors"
                    aria-label={`Chọn tất cả trong mục ${category.name}`}
                >
                    {areAllInCategorySelected ? 'Bỏ Chọn Hết' : 'Chọn Hết'}
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {category.poses.map((pose) => {
                const isSelected = selectedPoses.some(p => p.id === pose.id);
                return (
                  <button
                    key={pose.id}
                    onClick={() => onPoseToggle(pose)}
                    className={`relative w-full p-4 text-left rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 focus-visible:ring-amber-500 transform hover:scale-[1.03]
                      ${
                        isSelected
                          ? 'bg-neutral-800/50 ring-2 ring-amber-500 shadow-lg shadow-amber-500/10'
                          : 'bg-neutral-800/80 text-slate-300 hover:bg-neutral-700/80'
                      }`}
                    aria-pressed={isSelected}
                  >
                    <div className="flex items-start justify-between">
                        <div>
                            <p className={`font-semibold ${isSelected ? 'text-amber-400' : 'text-slate-100'}`}>{pose.name}</p>
                            <p className="text-sm text-slate-400 mt-1">{pose.prompt}</p>
                        </div>
                        <div className={`mt-1 flex-shrink-0 ml-4 w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-amber-500 bg-amber-500' : 'border-neutral-500'}`}>
                            {isSelected && (
                                <svg className="w-3 h-3 text-neutral-900" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                </svg>
                            )}
                        </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  );
};