// src/components/Discounts.jsx
import React from 'react';
import '../../pages/CSSs/HomePage.css';

const Discounts = () => {
  return (
    <section className="discounts">
      <h2>Special Discounts</h2>
      <div className="discount-list">
        <div className="discount-card">
          <h3>20% Off on Beanies</h3>
          <p>Use code BEANIE20</p>
        </div>
        <div className="discount-card">
          <h3>Buy 1 Get 1 Free on Caps</h3>
          <p>Use code BOGO</p>
        </div>
      </div>
    </section>
  );
};

export default Discounts;
