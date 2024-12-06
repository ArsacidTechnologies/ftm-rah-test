import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductForm = () => {
  const { id } = useParams(); // Get the product ID if editing
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    barcode: '',
    name: '',
    category: '',
    new_price: '',
    old_price: '',
    image: null, // To store the uploaded image
  });

  // Fetch product details if ID is present (editing)
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:4000/api/products/${id}`)
        .then(response => response.json())
        .then(data => setProduct({
          barcode: data.barcode,
          name: data.name,
          category: data.category,
          new_price: data.new_price,
          old_price: data.old_price,
          image: null, // Reset image for update
        }))
        .catch(error => console.error('Error fetching product:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('barcode', product.barcode);
    formData.append('name', product.name);
    formData.append('category', product.category);
    formData.append('new_price', product.new_price);
    formData.append('old_price', product.old_price);
    if (product.image) {
      formData.append('image', product.image); // Append the image if uploaded
    }

    const method = id ? 'PUT' : 'POST';
    const url = id
      ? `http://localhost:4000/api/products/${id}`
      : 'http://localhost:4000/api/products';

    try {
      const response = await fetch(url, {
        method: method,
        body: formData, // Send formData instead of JSON
      });

      if (response.ok) {
        navigate('/products'); // Navigate back to products page
      } else {
        console.error('Error saving product:', await response.text());
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <div>
      <h1>{id ? 'Edit Product' : 'Add New Product'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Barcode:</label>
          <input
            type="number"
            name="barcode"
            value={product.barcode}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>New Price:</label>
          <input
            type="number"
            name="new_price"
            value={product.new_price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Old Price:</label>
          <input
            type="number"
            name="old_price"
            value={product.old_price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">{id ? 'Update Product' : 'Add Product'}</button>
      </form>
    </div>
  );
};

export default ProductForm;
