import React from 'react';
import '../../pages/CSSs/HomePage.css';


const Categories = () => {
  const categories = ['Baseball Caps', 'Beanies', 'Fedoras', 'Snapbacks'];

  return (
    <div className="categories">
      <h2>Shop by Category</h2>
      <ul>
        {categories.map(category => (
          <li key={category}>
            <a href={`/shop?category=${category}`}>{category}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
