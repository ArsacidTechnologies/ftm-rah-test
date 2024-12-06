import React from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductCard = ({ name, image, oldPrice, newPrice, barcode }) => {

    const navigate = useNavigate();  // inja

    const handleAddToCart = async () => {
        const token = localStorage.getItem('authToken'); // inja
        // console.log(id);
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
        <div className="product-card">
            <div className="product-card-frame" onClick={(e) => {
                navigate(`/product/${barcode}`)
            }}>
                <img src={image} alt={name} className="product-card-image" />
                <div className="product-card-details">
                    <h3 className="product-card-name">{name}</h3>
                    <div className="product-card-price">
                        {oldPrice && <p className="product-card-old-price">${oldPrice}</p>}
                        {newPrice && <p className="product-card-new-price">${newPrice}</p>}
                    </div>
                </div>
            </div>
            <button className="product-card-button" onClick={handleAddToCart}>
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;
