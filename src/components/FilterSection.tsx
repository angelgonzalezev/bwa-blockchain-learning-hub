import { X } from 'lucide-react';
import { ResourceCategory, LearningLevel } from '../types';

interface FilterSectionProps {
  selectedCategories: ResourceCategory[];
  selectedLevels: LearningLevel[];
  onCategoryToggle: (category: ResourceCategory) => void;
  onLevelToggle: (level: LearningLevel) => void;
  onClearFilters: () => void;
}

const CATEGORIES: ResourceCategory[] = [
  'Basics',
  'Introductory Courses',
  'Advanced Courses',
  'Tutorials',
  'Articles and Blogs',
  'Books',
  'Frameworks, Libraries, and SDKs',
  'Communities',
  'Podcasts',
  'Talks',
];

const LEVELS: LearningLevel[] = ['Beginner', 'Intermediate', 'Advanced', 'All Levels'];

export default function FilterSection({
  selectedCategories,
  selectedLevels,
  onCategoryToggle,
  onLevelToggle,
  onClearFilters,
}: FilterSectionProps) {
  const hasActiveFilters = selectedCategories.length > 0 || selectedLevels.length > 0;

  return (
    <div className="w-full">
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 space-y-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 font-heading">Filters</h2>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium"
              aria-label="Clear all filters"
            >
              <X className="w-4 h-4" />
              Clear all
            </button>
          )}
        </div>

        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-3 font-heading">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryToggle(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                  selectedCategories.includes(category)
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
                aria-pressed={selectedCategories.includes(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-3 font-heading">Learning Level</h3>
          <div className="flex flex-wrap gap-2">
            {LEVELS.map((level) => (
              <button
                key={level}
                onClick={() => onLevelToggle(level)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                  selectedLevels.includes(level)
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
                aria-pressed={selectedLevels.includes(level)}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
