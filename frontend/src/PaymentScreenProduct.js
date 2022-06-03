import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './CartScreenProduct.css';

function PaymentScreenProduct(props) {
  const { product } = props;

  return (
    <div className="checkoutProduct">
      <img
        className="checkoutProduct__image"
        src={product.image}
        alt={product.name}
      />

      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{product.name}</p>
        <p className="checkoutProduct__quantity">
          Quantity: {product.quantity}
        </p>
        <p className="checkoutProduct__price">
          <small>€</small>
          <strong>{product.price}</strong>
        </p>
      </div>
    </div>
  );
}

export default PaymentScreenProduct;
