import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../pages/CSSs/HomePage.css';

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();  // Initialize useNavigate for navigation

  useEffect(() => {
    fetch('http://localhost:4000/api/bestsellers')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching bestsellers:', error));
  }, []);

  const handleProductClick = (barcode) => {
    navigate(`/product/${barcode}`);  // Navigate to the ProductDetailPage with the product barcode
  };

  return (
    <section className="best-sellers">
      <h2>Best Sellers</h2>
      <div className="product-list">
        {products.map((product) => (
          <div
            key={product.barcode}  // Use barcode as the key
            className="product-card"
            onClick={() => handleProductClick(product.barcode)}  // Navigate using the barcode
          >
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.new_price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSellers;


/*import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../pages/CSSs/HomePage.css';

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();  // Initialize useNavigate for navigation

  useEffect(() => {
    fetch('http://localhost:4000/api/bestsellers')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching bestsellers:', error));
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);  // Navigate to the ProductDetailPage with the product ID
  };

  return (
    <section className="best-sellers">
      <h2>Best Sellers</h2>
      <div className="product-list">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => handleProductClick(product.id)}  // Make the entire card clickable
          >
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.new_price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSellers;
*/

// src/components/BestSellers.jsx
/*import React, { useEffect, useState } from 'react';
import '../../pages/CSSs/HomePage.css';

const BestSellers = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/bestsellers')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching bestsellers:', error));
  }, []);

  return (
    <section className="best-sellers">
      <h2>Best Sellers</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.new_price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSellers;*/



// src/components/BestSellers.jsx
/*
import React from 'react';
import '../../pages/CSSs/HomePage.css';
const BestSellers = () => {
  return (
    <section className="best-sellers">
      <h2>Best Sellers</h2>
      <div className="product-list">
        <div className="product-card">
          <img src="/path/to/product1.jpg" alt="Product 1" />
          <h3>Classic Fedora</h3>
          <p>$29.99</p>
        </div>
        <div className="product-card">
          <img src="/path/to/product2.jpg" alt="Product 2" />
          <h3>Warm Beanie</h3>
          <p>$19.99</p>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
*/