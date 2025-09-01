import { motion } from 'framer-motion';

export const LoadingSpinner = ({ size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className={`${sizeClasses[size]} border-2 border-primary-200 border-t-primary-600 rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
};

export const LoadingSkeleton = ({ className = '', rows = 3 }) => {
  return (
    <div className={`animate-pulse space-y-3 ${className}`}>
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
      ))}
    </div>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="animate-pulse bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="h-48 bg-gray-200 dark:bg-gray-700" />
      <div className="p-6 space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
      </div>
    </div>
  );
};