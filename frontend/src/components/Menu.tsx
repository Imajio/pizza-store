import React from 'react';
import { useTranslation } from 'react-i18next';

interface Pizza {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
}

interface MenuProps {
  pizzas: Pizza[];
  addToCart: (pizza: Pizza) => void;
}

const Menu: React.FC<MenuProps> = ({ pizzas, addToCart }) => {
  const { t } = useTranslation();

  return (
    <section id="menu" className="mb-8">
      <h2 className="text-3xl font-bold mb-4">{t('menu')}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pizzas.map((pizza) => (
          <div key={pizza.id} className="card">
            <img
              src={`/images/${pizza.imageUrl}`}
              alt={pizza.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{pizza.name}</h3>
              <p className="text-gray-600 dark:text-gray-300">{pizza.description}</p>
              <p className="text-lg font-bold mt-2">${pizza.price.toFixed(2)}</p>
              <button
                onClick={() => addToCart(pizza)}
                disabled={!pizza.isAvailable}
                className={`btn-primary mt-4 w-full ${
                  !pizza.isAvailable ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {t('add_to_cart')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Menu;