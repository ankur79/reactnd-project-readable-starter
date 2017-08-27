import React from 'react';
import PropTypes from 'prop-types';

const CategorySelect = ({categories, onCategoryChange, category}) => {
  return (
      <select onChange={e => onCategoryChange(e.target.value)} value={category}>
        <option value="all">All Categories</option>
        {categories.map(category => 
            <option key={category.name} value={category.name}>{category.name}</option>
        )}
      </select>
  )
};

CategorySelect.propTypes = {
    categories: PropTypes.array.isRequired,
    onCategoryChange: PropTypes.func.isRequired,
    category: PropTypes.string.isRequired
};

export default CategorySelect
