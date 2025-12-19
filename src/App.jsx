import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from "./components/Header";
import HomePage from './components/HomePage';
import AuthPage from './components/AuthPage';
import CheckoutPage from './components/CheckoutPage';
import Cart from './components/Cart';
import { Toaster } from './components/ui/toaster';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false); // Default to light for "clean" look
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }

    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogin = (email, password) => {
    const userData = { email, name: email.split('@')[0] };
    setUser(userData);
    setCurrentPage('home');
  };

  const handleSignup = (email, password, name) => {
    const userData = { email, name };
    setUser(userData);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setUser(null);
    setCartItems([]);
    setCurrentPage('home');
  };

  const addToCart = (book) => {
    const existingItem = cartItems.find(item => item.id === book.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...book, quantity: 1 }]);
    }
    setIsCartOpen(true); // Auto-open cart for better UX
  };

  const removeFromCart = (bookId) => {
    setCartItems(cartItems.filter(item => item.id !== bookId));
  };

  const updateQuantity = (bookId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
    } else {
      setCartItems(cartItems.map(item =>
        item.id === bookId ? { ...item, quantity } : item
      ));
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <Helmet>
        <title>BookHaven - Simple Online Bookstore</title>
        <meta name="description" content="A clean and simple online bookstore." />
      </Helmet>
      
      <Header
        user={user}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        onLogout={handleLogout}
        onNavigate={setCurrentPage}
        cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <main className="container mx-auto px-4 py-8">
        {currentPage === 'home' && (
          <HomePage
            user={user}
            onNavigate={setCurrentPage}
            addToCart={addToCart}
          />
        )}
        {currentPage === 'auth' && (
          <AuthPage
            onLogin={handleLogin}
            onSignup={handleSignup}
            onNavigate={setCurrentPage}
          />
        )}
        {currentPage === 'checkout' && (
          <CheckoutPage
            cartItems={cartItems}
            cartTotal={cartTotal}
            onNavigate={setCurrentPage}
            clearCart={clearCart}
            user={user}
          />
        )}
      </main>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        cartTotal={cartTotal}
        onCheckout={() => {
          setIsCartOpen(false);
          setCurrentPage('checkout');
        }}
      />

      <Toaster />
    </div>
  );
}


export default App;
