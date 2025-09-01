import { useState } from 'react';
import { Modal } from '../common/Modal';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

export const AuthModal = ({ isOpen, onClose, mode, onModeChange }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSuccess = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'login' ? 'Welcome Back' : 'Create Account'}
      size="medium"
    >
      <div className="p-6">
        {mode === 'login' ? (
          <LoginForm
            onSuccess={handleSuccess}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        ) : (
          <SignupForm
            onSuccess={handleSuccess}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => onModeChange(mode === 'login' ? 'signup' : 'login')}
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
            >
              {mode === 'login' ? 'Sign up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </Modal>
  );
};