import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:4000/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:4000/api/products/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setProducts(products.filter(product => product._id !== id));
        } else {
          console.error('Failed to delete product');
        }
      })
      .catch(error => console.error('Error deleting product:', error));
  };

  const handleEdit = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  const handleAdd = () => {
    navigate('/add-product');
  };

  return (
    <div>
      <h1>Products</h1>
      <button onClick={handleAdd}>Add New Product</button>
      <table>
        <thead>
          <tr>
            <th>Barcode</th>
            <th>Name</th>
            <th>Category</th>
            <th>New Price</th>
            <th>Old Price</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.barcode}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.new_price}</td>
              <td>{product.old_price}</td>
              <td>
                {product.image && (
                  <img src={`http://localhost:4000/${product.image}`} alt={product.name} width="50" />
                )}
              </td>
              <td>
                <button onClick={() => handleDelete(product._id)}>Delete</button>
                <button onClick={() => handleEdit(product._id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default Products;