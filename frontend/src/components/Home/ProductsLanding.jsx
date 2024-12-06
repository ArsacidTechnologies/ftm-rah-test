import React, { useEffect, useState } from 'react';
// import '../../pages/CSSs/HomePage.css';
import axios from 'axios';
import ProductCard from '../Product/ProductCard';


const ProductsLanding = () => {



  const [products, setProducts] = useState(null);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/products`); // Fetch product by barcode
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, []);

  return (
    <div className="product-grid">
      {products?.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          newPrice={product?.new_price}
          oldPrice={product?.old_price}
          image={product?.image?   `http://localhost:4000/${product?.image}` :"https://via.placeholder.com/300x200"}
          barcode={product?.barcode}
          // onAddToCart={() => handleAddToCart(product.name)}
        />
      ))}
    </div>
  );
};

export default ProductsLanding;
