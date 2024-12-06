import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CSSs/ChildrenHatsPage.css'; // Create this CSS for styling ChildrenHatsPage

const ChildrenHatsPage = () => {
  const [hats, setHats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHats = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/children-hats');
        setHats(response.data);
      } catch (error) {
        console.error('Error fetching children hats:', error);
      }
    };

    fetchHats();
  }, []);

  const handleProductClick = (barcode) => {
    navigate(`/product/${barcode}`); // Navigate to product detail page when clicked
  };

  return (
    <div>
      <h1>Children Hats</h1>
      <div className="products-container">
        {hats.map((hat) => (
          <div
            key={hat.barcode}
            className="product-card"
            onClick={() => handleProductClick(hat.barcode)}
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

export default ChildrenHatsPage;
