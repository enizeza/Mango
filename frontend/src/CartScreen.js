import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import CartScreenProduct from './CartScreenProduct';
import { Store } from './Store';
import './CartScreen.css';
import Subtotal from './Subtotal';

export default function CartScreen() {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  return (
    <div className="checkout">
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>

      <div className="checkout__left">
        <div>
          <h1 className="checkout__title">Shopping Cart</h1>
        </div>
        {/*{basket.map(item => (
            <CheckoutProduct
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}
        {cartItems.map((product) => (
          <CartScreenProduct
            id={product.id}
            name={product.name}
            image={product.image}
            price={product.price}
            quantity={product.quantity}
          />
        ))}*/}

        {cartItems.map((product) => (
          <CartScreenProduct product={product}></CartScreenProduct>
        ))}
      </div>
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}
