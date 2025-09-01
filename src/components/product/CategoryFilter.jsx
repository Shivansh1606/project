import { motion } from 'framer-motion';
import { categories } from '../../data/sampleData';

export const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  const allCategories = [
    { id: 'all', name: 'All Products', description: 'Browse all available products' },
    ...categories,
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Categories
      </h3>
      
      <div className="space-y-2">
        {allCategories.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ x: 4 }}
            onClick={() => onCategoryChange(category.id)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
              selectedCategory === category.id
                ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-300'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <div className="font-medium">{category.name}</div>
            <div className="text-sm opacity-75">{category.description}</div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};