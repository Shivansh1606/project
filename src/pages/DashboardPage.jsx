import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Eye, User, Settings, ShoppingBag, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';
import { products } from '../data/sampleData';

export const DashboardPage = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('purchases');
  const [purchases] = useState([
    {
      id: 1,
      productId: 1,
      purchaseDate: '2024-01-15',
      status: 'completed',
      downloadUrl: '#',
    },
    {
      id: 2,
      productId: 4,
      purchaseDate: '2024-01-10',
      status: 'completed',
      downloadUrl: '#',
    },
  ]);

  useEffect(() => {
    if (location.state?.message) {
      // Show success message
      console.log(location.state.message);
    }
  }, [location.state]);

  const tabs = [
    { id: 'purchases', name: 'My Purchases', icon: ShoppingBag },
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const getPurchasedProducts = () => {
    return purchases.map(purchase => {
      const product = products.find(p => p.id === purchase.productId);
      return { ...purchase, product };
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your purchases, profile, and account settings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {user?.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {user?.email}
                  </p>
                </div>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
            >
              {activeTab === 'purchases' && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                    My Purchases
                  </h2>
                  
                  {getPurchasedProducts().length > 0 ? (
                    <div className="space-y-6">
                      {getPurchasedProducts().map((purchase) => (
                        <div
                          key={purchase.id}
                          className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-primary-300 dark:hover:border-primary-600 transition-colors"
                        >
                          <div className="flex items-start space-x-4">
                            <img
                              src={purchase.product?.image}
                              alt={purchase.product?.title}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                {purchase.product?.title}
                              </h3>
                              
                              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                                <span>Purchased: {formatDate(purchase.purchaseDate)}</span>
                                <span className="flex items-center space-x-1">
                                  <Star className="w-4 h-4 text-warning-400 fill-current" />
                                  <span>{purchase.product?.rating}</span>
                                </span>
                              </div>
                              
                              <div className="flex items-center space-x-4">
                                <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                                  <Download className="w-4 h-4" />
                                  <span>Download</span>
                                </button>
                                
                                <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2 transition-colors">
                                  <Eye className="w-4 h-4" />
                                  <span>Preview</span>
                                </button>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                {formatPrice(purchase.product?.price)}
                              </p>
                              <span className="inline-block bg-success-100 dark:bg-success-900/20 text-success-700 dark:text-success-400 px-2 py-1 rounded-full text-xs font-medium mt-2">
                                {purchase.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        No purchases yet
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Start exploring our digital products to make your first purchase.
                      </p>
                      <button
                        onClick={() => navigate('/products')}
                        className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        Browse Products
                      </button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                    Profile Information
                  </h2>
                  
                  <form className="space-y-6">
                    <div className="flex items-center space-x-6 mb-8">
                      <img
                        src={user?.avatar}
                        alt={user?.name}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                      <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                        Change Photo
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={user?.name || ''}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={user?.email || ''}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors"
                        />
                      </div>
                    </div>

                    <button className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors">
                      Save Changes
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                    Account Settings
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Email Notifications</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Receive updates about your purchases</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-5 h-5 text-primary-600" />
                    </div>
                    
                    <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Marketing Emails</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Get notified about new products and offers</p>
                      </div>
                      <input type="checkbox" className="w-5 h-5 text-primary-600" />
                    </div>
                    
                    <div className="flex items-center justify-between py-4">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Add an extra layer of security</p>
                      </div>
                      <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                        Enable
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};