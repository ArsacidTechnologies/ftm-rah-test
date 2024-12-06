import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams(); // Get the barcode from the URL
  const { barcode } = useParams();
  const token = localStorage.getItem('authToken'); // Get the auth token from localStorage
  //const token = localStorage.getItem('token'); // Get the auth token from localStorage
  const navigate = useNavigate();  // inja

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/products/${barcode}`); // Fetch product by barcode
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [barcode]);

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

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h2>{product.name}</h2>
      <p>Price: ${product.new_price}</p>
      <p>Description: {product.description || 'No description available'}</p>
      <button onClick={addToCart}>Add to Cart*</button>
    </div>
  );
};

export default ProductDetailPage;


/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams(); // Get the product ID from the URL
  const token = localStorage.getItem('token'); // Get the auth token from localStorage

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    try {
      await axios.post(
        'http://localhost:4000/user/save-product', 
        { barcode: product.barcode, quantity: 1 },  // Use the product's barcode and increment by 1
        { headers: { 'authToken': token } } // Send authToken in headers
      );
      alert('Product added to cart successfully');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart');
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h2>{product.name}</h2>
      <p>Price: ${product.new_price}</p>
      <p>Description: {product.description || 'No description available'}</p>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductDetailPage;
*/

/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';*/

/*const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams(); // Get the product ID from the URL
  const token = localStorage.getItem('authToken'); // Get the auth token from localStorage

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/products/${id}`);           
        //const response = await axios.get(`http://localhost:4000/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const saveProduct = async () => {
    try {
      await axios.post('http://localhost:4000/user/save-product', 
        { productId: id, quantity: 1 }, // Default quantity or get this value from user input
        { headers: { 'authToken': token } }
      );
      alert('Product saved successfully');
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product');
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h2>{product.name}</h2>
      <p>Price: ${product.new_price}</p> 
      <p>Description: {product.description || 'No description available'}</p> 
      <button onClick={saveProduct}>Save Product</button>
    </div>
  );
};

export default ProductDetailPage;*/

