import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './CartScreenProduct.css';
import { Store } from './Store';

function CartScreenProduct(props) {
  const { dispatch } = useContext(Store);
  const { product } = props;

  const removeFromCart = (product) => {
    dispatch({
      type: 'CART_REMOVE_ITEM',
      payload: product,
    });
  };

  const updateCart = (product, quantity) => {
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: {
        ...product,
        quantity,
      },
    });
  };

  return (
    <div className="checkoutProduct">
      <img
        className="checkoutProduct__image"
        src={product.image}
        alt={product.name}
      />

      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">
          <Link to={`/product/${product.slug}`}>{product.name}</Link>
        </p>
        <p className="checkoutProduct__quantity">
          <button
            className="checkoutProduct__quantity_button"
            disabled={product.quantity === 1}
            onClick={() => updateCart(product, product.quantity - 1)}
          >
            -
          </button>{' '}
          {product.quantity}{' '}
          <button
            className="checkoutProduct__quantity_button"
            disabled={product.quantity === product.countInStock}
            onClick={() => updateCart(product, product.quantity + 1)}
          >
            +
          </button>
        </p>
        <p className="checkoutProduct__price">
          <small>€</small>
          <strong>{product.price}</strong>
        </p>
        <Button variant="contained" onClick={() => removeFromCart(product)}>
          Remove
        </Button>
      </div>
    </div>
  );
}

export default CartScreenProduct;
