import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          welcome: 'Welcome to Pizza Store',
          menu: 'Menu',
          cart: 'Cart',
          checkout: 'Checkout',
          login: 'Login',
          register: 'Register',
          add_to_cart: 'Add to Cart',
          language: 'Language',
          cart_empty: 'Your cart is empty',
          remove: 'Remove',
          total: 'Total',
          email: 'Email',
          password: 'Password',
          close: 'Close',
          auth_error: 'Authentication failed. Please try again.',
          footer_contact: 'Contact us: support@pizzastore.com',
          footer_copyright: '© 2025 Pizza Store. All rights reserved.',
          logout: 'Logout',
        },
      },
      pl: {
        translation: {
          welcome: 'Witamy w Pizza Store',
          menu: 'Menu',
          cart: 'Koszyk',
          checkout: 'Zamówienie',
          login: 'Zaloguj się',
          register: 'Zarejestruj się',
          add_to_cart: 'Dodaj do koszyka',
          language: 'Język',
          cart_empty: 'Twój koszyk jest pusty',
          remove: 'Usuń',
          total: 'Suma',
          email: 'Email',
          password: 'Hasło',
          close: 'Zamknij',
          auth_error: 'Błąd uwierzytelniania. Spróbuj ponownie.',
          footer_contact: 'Kontakt: support@pizzastore.com',
          footer_copyright: '© 2025 Pizza Store. Wszelkie prawa zastrzeżone.',
          logout: 'Wyloguj się',
        },
      },
      de: {
        translation: {
          welcome: 'Willkommen im Pizza Store',
          menu: 'Speisekarte',
          cart: 'Warenkorb',
          checkout: 'Kasse',
          login: 'Anmelden',
          register: 'Registrieren',
          add_to_cart: 'In den Warenkorb',
          language: 'Sprache',
          cart_empty: 'Ihr Warenkorb ist leer',
          remove: 'Entfernen',
          total: 'Gesamt',
          email: 'E-Mail',
          password: 'Passwort',
          close: 'Schließen',
          auth_error: 'Authentifizierung fehlgeschlagen. Bitte versuchen Sie es erneut.',
          footer_contact: 'Kontakt: support@pizzastore.com',
          footer_copyright: '© 2025 Pizza Store. Alle Rechte vorbehalten.',
          logout: 'Abmelden',
        },
      },
    },
    lng: navigator.language.split('-')[0],
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;