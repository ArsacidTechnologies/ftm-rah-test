import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CSSs/ManHatsPage.css'; // Make sure to create a separate CSS for styling ManHatsPage

const ManHatsPage = () => {
  const [hats, setHats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetching the men hats data
    const fetchHats = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/men-hats');
        setHats(response.data);
      } catch (error) {
        console.error('Error fetching men hats:', error);
      }
    };

    fetchHats();
  }, []);

  const handleProductClick = (barcode) => {
    navigate(`/product/${barcode}`); // Navigate to the product detail page when a product is clicked
  };

  return (
    <div>
      <h1>Men Hats</h1>
      <div className="products-container">
        {hats.map((hat) => (
          <div
            key={hat.barcode}
            className="product-card"
            onClick={() => handleProductClick(hat.barcode)} // Click to navigate to product detail
          >
            <div className="product-image">
              <img src={`http://localhost:4000/${hat.image}`} alt={hat.name} width="50" />
            </div>
            <div className="product-details">
              <div className="product-name">{hat.name}</div>
              <div className="product-price">
                ${hat.new_price}
                {hat.old_price && <span className="old-price">${hat.old_price}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManHatsPage;
