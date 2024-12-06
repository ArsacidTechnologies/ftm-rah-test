import React from 'react';
import '../../pages/CSSs/HomePage.css';

const HeroBanner = () => {
  return (
    <div className="hero-banner">
      <img src="path-to-hero-image.jpg" alt="Hero Banner" />
      <h1>Welcome to Our Hat Shop!</h1>
      <p>Discover the best hats for every occasion.</p>
    </div>
  );
};

export default HeroBanner;