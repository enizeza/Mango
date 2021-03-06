import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import CartScreenProduct from './CartScreenProduct';
import { Store } from './Store';
import './CartScreen.css';
import Subtotal from './Subtotal';

export default function CartScreen() {
  const { state } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  return (
    <div className="checkout flex-direction">
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <div className="checkout__left">
        <div>
          <h1 className="checkout__title">Shopping Cart</h1>
        </div>
        {cartItems.map((product) => (
          <div key={product.slug}>
            <CartScreenProduct product={product}></CartScreenProduct>
          </div>
        ))}
      </div>
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}
