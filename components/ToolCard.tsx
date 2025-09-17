import React, { useState, KeyboardEvent, useEffect } from 'react';
import type { Tool } from '../types';

interface ToolCardProps {
  tool: Tool;
  isAdmin: boolean;
  onSelect: () => void;
  onChangeImage: (toolId: string) => void;
  onToolNameChange: (toolId: string, newName: string) => void;
}

const UploadIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path d="M5.5 13.5a1 1 0 011-1h1.5v-1.5a1 1 0 112 0V12H11a1 1 0 110 2H9.5v1.5a1 1 0 11-2 0V14H6a1 1 0 01-1-1z" />
        <path fillRule="evenodd" d="M3 4a2 2 0 012-2h10a2 2 0 012 2v4a1 1 0 01-1 1h-2.586l-1.707 1.707a1 1 0 01-1.414 0L9.586 9H7a1 1 0 01-1-1V4zm10 2a1 1 0 100-2H5a1 1 0 100 2h8z" clipRule="evenodd" />
    </svg>
);


export const ToolCard: React.FC<ToolCardProps> = ({ tool, isAdmin, onSelect, onChangeImage, onToolNameChange }) => {
    const [isEditingName, setIsEditingName] = useState(false);
    const [editedName, setEditedName] = useState(tool.name);

    useEffect(() => {
        setEditedName(tool.name);
    }, [tool.name]);

    const handleUploadClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent the card's onSelect from firing
        onChangeImage(tool.id);
    };
    
    const handleNameClick = (e: React.MouseEvent) => {
        if (!isAdmin) return;
        e.stopPropagation(); // Prevent card selection when editing name
        setIsEditingName(true);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedName(e.target.value);
    };

    const handleNameSave = () => {
        if (editedName.trim() === '') {
            setEditedName(tool.name); // Reset if empty
        } else {
            onToolNameChange(tool.id, editedName);
        }
        setIsEditingName(false);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleNameSave();
        } else if (e.key === 'Escape') {
            setEditedName(tool.name);
            setIsEditingName(false);
        }
    };


  return (
    <div 
        className="group bg-neutral-900 border border-neutral-800 rounded-2xl shadow-lg hover:shadow-amber-500/10 transition-all duration-300 transform hover:-translate-y-2 flex flex-col overflow-hidden cursor-pointer"
        onClick={() => !isEditingName && onSelect()}
    >
      <div className="relative aspect-square w-full bg-neutral-950">
        <img src={tool.imageUrl} alt={tool.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        {isAdmin && (
            <button
                onClick={handleUploadClick}
                className="absolute top-2 right-2 z-10 flex items-center gap-2 bg-black/50 text-white py-1.5 px-3 rounded-full text-xs font-medium backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors"
                title="Thay đổi ảnh đại diện (Admin)"
            >
                <UploadIcon className="w-4 h-4" />
                <span>Đổi Ảnh</span>
            </button>
        )}
      </div>

      <div className="p-5 flex-grow flex flex-col">
        {isEditingName ? (
            <input 
                type="text"
                value={editedName}
                onChange={handleNameChange}
                onBlur={handleNameSave}
                onKeyDown={handleKeyDown}
                className="w-full bg-neutral-700 text-lg font-bold text-amber-300 p-1 -m-1 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                autoFocus
                onClick={(e) => e.stopPropagation()}
            />
        ) : (
            <h3 
                className={`text-lg font-bold text-amber-400 group-hover:text-amber-300 transition-colors ${isAdmin ? 'cursor-pointer hover:bg-neutral-800 p-1 -m-1 rounded' : ''}`}
                onClick={handleNameClick}
                title={isAdmin ? "Nhấn để sửa tên" : ""}
            >
                {tool.name}
            </h3>
        )}

        <p className="text-sm text-slate-400 mt-1 mb-4 flex-grow">{tool.description}</p>
        <div className="mt-auto">
            <span className="inline-block w-full text-center px-4 py-2 border border-transparent text-sm font-bold rounded-full text-neutral-900 bg-gradient-to-r from-amber-400 to-orange-500 group-hover:from-amber-500 group-hover:to-orange-600 transition-all duration-300">
                Bắt đầu
            </span>
        </div>
      </div>
    </div>
  );
};