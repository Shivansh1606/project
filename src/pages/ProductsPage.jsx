import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductGrid } from '../components/product/ProductGrid';

export const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <ProductGrid initialCategory={categoryParam} />
    </div>
  );
};