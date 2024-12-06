import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Login from './pages/Login'; // Keep the file name as Login.jsx
import SavedProducts from './pages/SavedProducts';
import UserDetailPage from './pages/UserDetailPage';
import Header from './components/part/Header';
import WomenHatsPage from './pages/WomenHatsPage';
import ManHatsPage from './pages/ManHatsPage';
import ChildrenHatsPage from './pages/ChildrenHatsPage';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));

  const handleLogin = () => {
    setIsLoggedIn(true);  // Update login status
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} /> {/* Pass handleLogin */}
        <Route path="/user/products" element={<SavedProducts />} />
        <Route path="/product/:barcode" element={<ProductDetailPage />} />
        <Route path="/userdetail" element={<UserDetailPage />} />
        <Route path="/women-hats" element={<WomenHatsPage />} /> {/* Women Hats Page Route */}
        <Route path="/men-hats" element={<ManHatsPage />} />
        <Route path="/children-hats" element={<ChildrenHatsPage />} />


      </Routes>
    </Router>
  );
}

export default App;



/*import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import SavedProducts from './pages/SavedProducts';
import UserDetailPage from './pages/UserDetailPage';
import Header from './components/part/Header';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
  const handleLogin = (token) => {
      localStorage.setItem('authToken', token);
      setIsLoggedIn(true);
  };

  const handleLogout = () => {
      localStorage.removeItem('authToken');
      setIsLoggedIn(false);
  };


  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout}/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} /> 
        <Route path="/user/products" element={<SavedProducts />} />
        <Route path="/product/:barcode" element={<ProductDetailPage />} /> 
        <Route path="/userdetail" element={<UserDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;*/
