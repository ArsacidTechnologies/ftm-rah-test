import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import './CSSs/WomenHatsPage.css';

const WomenHatsPage = () => {
  const [hats, setHats] = useState([]);
  const navigate = useNavigate();  // Initialize navigate hook

  useEffect(() => {
    // Fetching the women hats data
    const fetchHats = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/women-hats');
        setHats(response.data);
      } catch (error) {
        console.error('Error fetching women hats:', error);
      }
    };

    fetchHats();
  }, []);

  const handleProductClick = (barcode) => {
    // Navigate to the product detail page when a product is clicked
    navigate(`/product/${barcode}`);
  };

  return (
    <div>
      <h1>Women Hats</h1>
      <div className="products-container">
        {hats.map((hat) => (
          <div
            key={hat.barcode}
            className="product-card"
            onClick={() => handleProductClick(hat.barcode)}  // Make the product card clickable
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

export default WomenHatsPage;

/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CSSs/WomenHatsPage.css';


const WomenHatsPage = () => {
  const [hats, setHats] = useState([]);

  useEffect(() => {
    // Fetching the women hats data
    const fetchHats = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/women-hats');
        setHats(response.data);
      } catch (error) {
        console.error('Error fetching women hats:', error);
      }
    };

    fetchHats();
  }, []);

  return (
    <div>
      <h1>Women Hats</h1>
      <table>
        <thead>
          <tr>
            <th>Barcode</th>
            <th>Name</th>
            <th>Category</th>
            <th>New Price</th>
            <th>Old Price</th>
          </tr>
        </thead>
        <tbody>
          {hats.map((hat) => (
            <tr key={hat.barcode}>
              <td>{hat.barcode}</td>
              <td>{hat.name}</td>
              <td>{hat.category}</td>
              <td>{hat.new_price}</td>
              <td>{hat.old_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WomenHatsPage;*/
