import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import { Store } from './Store';
import './PaymentScreen.css';
import CartScreenProduct from './CartScreenProduct';
import { Button } from '@mui/material';
import { CardElement } from '@stripe/react-stripe-js';

function PaymentScreen() {
  const history = useNavigate();
  const { state, dispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const {
    cart: { cartItems },
  } = state;

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState('');
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
  cart.totalprice = cart.itemsPrice + cart.shippingPrice;

  const handleSubmit = async (event) => {
    // do all the fancy stripe stuff...
    event.preventDefault();
  };

  const handleChange = (event) => {};

  return (
    <div className="payment">
      <Helmet>
        <title>Order Preview</title>
      </Helmet>

      <div className="payment__container">
        <h1>
          Cart (
          <Link to="/cart">
            {cartItems.reduce((a, c) => a + c.quantity, 0)} items
          </Link>
          )
        </h1>

        {/* Payment section - delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>Name: {cart.shippingInfo.name}</p>
            <p>
              Address: {cart.shippingInfo.address},{cart.shippingInfo.city},
              {cart.shippingInfo.cap},{cart.shippingInfo.country}
            </p>
            <Link to="/shipping">Edit</Link>
          </div>
        </div>

        {/* Payment section - Review Items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {cart.cartItems.map((product) => (
              <div key={product.slug}>
                <CartScreenProduct product={product}></CartScreenProduct>
              </div>
            ))}
            <Link to="/cart">Edit</Link>
          </div>
        </div>

        {/* Payment section - Payment method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* Stripe magic will go 
            <CardElement onChange={handleChange} />*/}

            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={cart.totalprice}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'€'}
                />
                <Button variant="contained"> Buy now</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentScreen;
