import React, { useContext } from 'react';
import './CartScreenProduct.css';
import { Store } from './Store';

function CartScreenProduct(props) {
  const { state, dispatch } = useContext(Store);
  const { product } = props;
  const {
    cart: { cartItems },
  } = state;

  const removeFromBasket = () => {
    // remove the item from the basket
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      id: product._id,
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
        <p className="checkoutProduct__title">{product.name}</p>
        <p className="checkoutProduct__quantity">
          Quantity: {product.quantity}
        </p>
        <p className="checkoutProduct__price">
          <small>€</small>
          <strong>{product.price}</strong>
        </p>
        <button onClick={removeFromBasket}>Remove from Basket</button>
      </div>
    </div>
  );
}

export default CartScreenProduct;
