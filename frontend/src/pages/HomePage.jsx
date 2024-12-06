import React from 'react';
import HeroBanner from '../components/Home/HeroBanner';
import Categories from '../components/Home/Categories';
import SearchBar from '../components/Home/SearchBar';
import './CSSs/HomePage.css';
import BestSellers from '../components/Home/BestSellers';
import Discounts from '../components/Home/Discounts';
import Header from '../components/part/Header';
import ProductsLanding from '../components/Home/ProductsLanding';

const HomePage = () => {
  return (
    <div className="home-page">
      <HeroBanner />
      <Categories />
      <SearchBar />
      <BestSellers />
      <ProductsLanding/>
      <Discounts />
    </div>
  );
};

export default HomePage;
