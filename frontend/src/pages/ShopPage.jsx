// src/pages/ShopPage.jsx
import axios from 'axios';
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ShopPage = () => {
  const products = [
    { id: 1, name: 'Hat 1', price: '$10' },
    { id: 2, name: 'Hat 2', price: '$15' },
    { id: 3, name: 'Hat 3', price: '$20' },
  ];

  const [product, setProduct] = useState(null);
  const { id } = useParams(); // Get the barcode from the URL
  const { barcode } = useParams();
  const token = localStorage.getItem('authToken'); // Get the auth token from localStorage
  //const token = localStorage.getItem('token'); // Get the auth token from localStorage
  const navigate = useNavigate();  // inja

  const addToCart = async () => {
    const token = localStorage.getItem('authToken'); // inja
    console.log(id);
    if (!token) {                                    // inja
    alert('Please log in to add products to your cart.');
    navigate('/login'); // Redirect to login if not logged in
    return;
    }

    try {
      await axios.post(
        'http://localhost:4000/user/save-product', 
        { barcode: barcode, quantity: 1 },  // Use the barcode
        { headers: { 'authToken': token } } // Send authToken in headers
      );
      //alert(barcode);
      alert('Product added to cart successfully');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart');
    }
  };
  return (
    <div className="shop-page">
      <h1>Shop Page</h1>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <h2>{product.name}</h2>
            <p>{product.price}</p>
            <button onClick={addToCart}>Add to Cart</button>

            {/* <button>Add to Cart#</button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
