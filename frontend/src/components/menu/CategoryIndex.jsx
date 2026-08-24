import React from 'react';

export default function CategoryIndex({ categories, onSelectCategory }) {
  return (
    <div className="category-index">
      <h2 className="display-text category-index-title">THE MENU</h2>
      <ul className="category-list">
        {categories.map(category => (
          <li 
            key={category.id} 
            className="category-item" 
            role="button" 
            tabIndex={0}
            onClick={() => onSelectCategory(category)}
          >
            <span className="category-name">{category.name}</span>
            <div className="category-leader"></div>
            <span className="category-arrow">→</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
