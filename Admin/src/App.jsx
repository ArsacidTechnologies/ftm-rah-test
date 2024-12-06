/*import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login'; // Ensure you have this page

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App; */

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login'; // Ensure you have this page

import Products from './pages/Products';
//import ProductList from './pages/ProductList';
import EditProduct from './pages/EditProduct';
import ProductForm from './pages/ProductForm'; // Import ProductForm component





const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} /> {/* Default route */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />

        <Route path="/add-product" element={<ProductForm />} /> {/* Route for adding new product */}
        <Route path="/edit-product/:id" element={<ProductForm />} /> {/* Route for editing product */}
     

        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;

