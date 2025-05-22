import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';
import { loadStripe } from '@stripe/stripe-js';
import Header from './components/Header';
import Menu from './components/Menu';
import Cart from './components/Cart';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';

interface Pizza {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
}

const stripePromise = loadStripe('pk_test_your_stripe_key');

const App: React.FC = () => {
  const { t } = useTranslation();
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [cart, setCart] = useState<(Pizza & { quantity: number })[]>([]);
  const [token, setToken] = useState<string>(localStorage.getItem('token') || '');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get<Pizza[]>('http://localhost:8080/api/menu')
      .then((response: AxiosResponse<Pizza[]>) => {
        setPizzas(response.data);
        setIsLoading(false);
      })
      .catch((error: AxiosError) => {
        console.error('Error fetching menu:', error);
        setIsLoading(false);
      });
  }, []);

  const addToCart = (pizza: Pizza) => {
    const existingItem = cart.find((item) => item.id === pizza.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === pizza.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...pizza, quantity: 1 }]);
    }
  };

  const removeFromCart = (pizzaId: string) => {
    setCart(cart.filter((item) => item.id !== pizzaId));
  };

  const updateQuantity = (pizzaId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(pizzaId);
    } else {
      setCart(
        cart.map((item) =>
          item.id === pizzaId ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleCheckout = async () => {
    if (!token) {
      setAuthMode('login');
      setIsAuthModalOpen(true);
      return;
    }
    try {
      const response = await axios.post(
        'http://localhost:8080/api/payment/create-checkout-session',
        { items: cart },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const stripe = await stripePromise;
      if (stripe) {
        stripe.redirectToCheckout({ sessionId: response.data.id });
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  const handleAuth = async (email: string, password: string) => {
    try {
      const endpoint = authMode === 'login' ? '/login' : '/register';
      const response = await axios.post(`http://localhost:8080/api/auth${endpoint}`, {
        email,
        password,
      });
      const newToken = response.data;
      setToken(newToken);
      localStorage.setItem('token', newToken);
      setIsAuthModalOpen(false);
    } catch (error) {
      console.error(`Error during ${authMode}:`, error);
      alert(t('auth_error'));
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        setAuthMode={setAuthMode}
        setIsAuthModalOpen={setIsAuthModalOpen}
        token={token}
        setToken={setToken}
      />
      <main className="flex-grow container mx-auto p-4">
        <section className="mb-8">
          <img
            src="/images/hero-bg.jpg"
            alt="Pizza Hero"
            className="w-full h-64 object-cover rounded-lg"
          />
        </section>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <svg className="spinner" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            </svg>
          </div>
        ) : (
          <>
            <Menu pizzas={pizzas} addToCart={addToCart} />
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
              handleCheckout={handleCheckout}
            />
          </>
        )}
      </main>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        authMode={authMode}
        handleAuth={handleAuth}
      />
      <Footer />
    </div>
  );
};

export default App;