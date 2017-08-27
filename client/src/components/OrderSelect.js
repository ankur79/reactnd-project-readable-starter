import React from 'react';
import PropTypes from 'prop-types';

const OrderSelect = ({onOrderChange, sortOrder}) => {
  return (
      <div>
        Order By: <select onChange={e => onOrderChange(e.target.value)} value={sortOrder}>
                    <option value="voteScore">Vote Score</option>
                    <option value="timestamp">Time</option>
                  </select>
       </div>         

  )
};

OrderSelect.propTypes = {
    onOrderChange: PropTypes.func.isRequired,
    sortOrder: PropTypes.string.isRequired
};

export default OrderSelect
