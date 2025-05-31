import React from 'react';
import { ICategory } from '@/app/types/party';

interface Props {
  categories: ICategory[];
  selectedId: string;
  onSelect: (id: string) => void;
}

const CategorySidebar: React.FC<Props> = ({ categories, selectedId, onSelect }) => {
  return (
    <nav className="block w-20 sm:w-28 bg-white border-r h-full overflow-y-auto">
      <ul>
        {categories.map(cat => (
          <li
            key={cat.id}
            className={`px-2 sm:px-4 py-3 cursor-pointer text-center text-xs sm:text-sm transition-colors ${selectedId === cat.id ? 'bg-yellow-50 text-yellow-600 font-bold border-r-4 border-yellow-400' : 'text-gray-700 hover:bg-gray-50'}`}
            onClick={() => onSelect(cat.id)}
          >
            {cat.name}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategorySidebar; 