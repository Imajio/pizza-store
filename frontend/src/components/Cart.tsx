import React from 'react';
import { useTranslation } from 'react-i18next';

interface Pizza {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  cart: Pizza[];
  removeFromCart: (pizzaId: string) => void;
  updateQuantity: (pizzaId: string, quantity: number) => void;
  handleCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ cart, removeFromCart, updateQuantity, handleCheckout }) => {
  const { t } = useTranslation();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section id="cart" className="mb-8">
      <h2 className="text-3xl font-bold mb-4">{t('cart')}</h2>
      {cart.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">{t('cart_empty')}</p>
      ) : (
        <div className="card">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 border-b">
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p>${item.price.toFixed(2)} x {item.quantity}</p>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  min="0"
                  className="w-16 p-2 border rounded dark:bg-gray-700 dark:text-white"
                />
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  {t('remove')}
                </button>
              </div>
            </div>
          ))}
          <div className="p-4">
            <p className="text-xl font-bold">{t('total')}: ${total.toFixed(2)}</p>
            <button
              onClick={handleCheckout}
              className="btn-secondary mt-4 w-full"
            >
              {t('checkout')}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;