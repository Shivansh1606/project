import { motion } from 'framer-motion';
import { Star, Download, ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

export const ProductCard = ({ product, index = 0 }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleViewProduct = () => {
    navigate(`/product/${product.id}`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
      onClick={handleViewProduct}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="opacity-0 group-hover:opacity-100 bg-white text-gray-900 px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300"
            onClick={(e) => {
              e.stopPropagation();
              handleViewProduct();
            }}
          >
            <Eye className="w-4 h-4" />
            <span>View Details</span>
          </motion.button>
        </div>

        {/* Featured Badge */}
        {product.featured && (
          <div className="absolute top-3 left-3 bg-accent-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Featured
          </div>
        )}

        {/* Discount Badge */}
        {product.originalPrice && (
          <div className="absolute top-3 right-3 bg-error-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
          {product.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Rating and Downloads */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-warning-400 fill-current" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {product.rating} ({product.reviews})
            </span>
          </div>
          
          <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
            <Download className="w-4 h-4" />
            <span>{product.downloadCount.toLocaleString()}</span>
          </div>
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          
          <button
            onClick={handleAddToCart}
            className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-lg transition-colors duration-200 flex items-center justify-center"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-3">
          {product.tags?.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};