import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';

export const Toast = ({ message, type = 'info', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getToastConfig = () => {
    switch (type) {
      case 'success':
        return {
          icon: CheckCircle,
          bgColor: 'bg-success-500',
          textColor: 'text-white',
          iconColor: 'text-white',
        };
      case 'error':
        return {
          icon: XCircle,
          bgColor: 'bg-error-500',
          textColor: 'text-white',
          iconColor: 'text-white',
        };
      case 'warning':
        return {
          icon: AlertCircle,
          bgColor: 'bg-warning-500',
          textColor: 'text-white',
          iconColor: 'text-white',
        };
      default:
        return {
          icon: Info,
          bgColor: 'bg-primary-500',
          textColor: 'text-white',
          iconColor: 'text-white',
        };
    }
  };

  const { icon: Icon, bgColor, textColor, iconColor } = getToastConfig();

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.3 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.5 }}
      className={`${bgColor} ${textColor} p-4 rounded-lg shadow-lg flex items-center space-x-3 min-w-80 max-w-md`}
    >
      <Icon className={`w-5 h-5 ${iconColor} flex-shrink-0`} />
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className={`${iconColor} hover:opacity-80 transition-opacity`}
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};