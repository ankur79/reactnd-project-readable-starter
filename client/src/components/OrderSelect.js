import React from 'react';
import PropTypes from 'prop-types';

const OrderSelect = ({onOrderChange, orderList}) => {
  return (
      <div>
        Order By: <select onChange={e => onOrderChange(e.target.value)}>
                    {orderList.map(order =>
                       <option key={order.value} value={order.value}>{order.name}</option>
                    )}
                  </select>
       </div>         

  )
};

OrderSelect.propTypes = {
    onOrderChange: PropTypes.func.isRequired,
    orderList: PropTypes.array.isRequired
};

export default OrderSelect
