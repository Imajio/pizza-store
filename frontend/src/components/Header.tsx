import React from 'react';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  setAuthMode: (mode: 'login' | 'register') => void;
  setIsAuthModalOpen: (open: boolean) => void;
  token: string;
  setToken: (token: string) => void;
}

const Header: React.FC<HeaderProps> = ({ setAuthMode, setIsAuthModalOpen, token, setToken }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/images/logo.png" alt="Pizza Store Logo" className="h-10 mr-4" />
          <h1 className="text-2xl font-bold">{t('welcome')}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <select
            onChange={(e) => changeLanguage(e.target.value)}
            className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white p-2 rounded"
            value={i18n.language}
          >
            <option value="en">English</option>
            <option value="pl">Polski</option>
            <option value="de">Deutsch</option>
          </select>
          {token ? (
            <button
              onClick={handleLogout}
              className="btn-primary"
            >
              {t('logout')}
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  setAuthMode('login');
                  setIsAuthModalOpen(true);
                }}
                className="btn-primary"
              >
                {t('login')}
              </button>
              <button
                onClick={() => {
                  setAuthMode('register');
                  setIsAuthModalOpen(true);
                }}
                className="btn-primary"
              >
                {t('register')}
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;