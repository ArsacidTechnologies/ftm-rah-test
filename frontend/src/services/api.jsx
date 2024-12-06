import axios from 'axios';

// Base URL for the backend API
const API_BASE_URL = 'http://localhost:4000';

// Function to handle user signup
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, userData);
    return response.data; // return token or any response from the server
  } catch (error) {
    throw error.response.data; // throw error message
  }
};

// Function to handle user login
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    return response.data; // return token or any response from the server
  } catch (error) {
    throw error.response.data; // throw error message
  }
};

// Function to update the user's cart
export const updateCart = async (token, cartData) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/cart`, cartData, {
      headers: {
        'authToken': token,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Add the addToCart function here
export const addToCart = async (productId) => {
  try {
    const token = localStorage.getItem('authToken'); // Get the user's auth token
    const response = await axios.post(`${API_BASE_URL}/user/save-product`, {
      productId: productId, // Send the Id of the product clicked
      quantity: 1           // Increase by 1
    }, {
      headers: { 'authToken': token }
    });

    console.log(response.data.message); // Handle success
  } catch (error) {
    console.error('Error adding product to cart:', error.response?.data?.message || error.message);
  }
};

