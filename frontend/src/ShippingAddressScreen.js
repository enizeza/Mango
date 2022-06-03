import { Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Store } from './Store';
import './SigninScreen.css';

function ShippingAddressScreen() {
  const { state, dispatch } = useContext(Store);
  const history = useNavigate();
  const {
    userInfo,
    cart: { shippingInfo },
  } = state;
  const [name, setName] = useState(shippingInfo.name || '');
  const [address, setAddress] = useState(shippingInfo.address || '');
  const [city, setCity] = useState(shippingInfo.city || '');
  const [cap, setCap] = useState(shippingInfo.cap || '');
  const [country, setCountry] = useState(shippingInfo.country || '');

  useEffect(() => {
    if (!userInfo) {
      history('/signin?redirect=/shipping');
    }
  }, [history, userInfo]);

  const submit = (e) => {
    e.preventDefault();
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        name,
        address,
        city,
        cap,
        country,
      },
    });
    localStorage.setItem(
      'shippingInfo',
      JSON.stringify({ name, address, city, cap, country })
    );
    history('/payment');
  };
  return (
    <div className="login">
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <h1>Shipping Address</h1>
      <div className="login__container">
        <form onSubmit={submit}>
          <h5>Name and surname</h5>
          <input
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <h5>Address</h5>
          <input
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          />
          <h5>City</h5>
          <input
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          />
          <h5>CAP</h5>
          <input
            value={cap}
            required
            onChange={(e) => setCap(e.target.value)}
          />
          <h5>Country</h5>
          <input
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          />
          <Button
            type="submit"
            className="login__signInButton"
            variant="contained"
          >
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ShippingAddressScreen;
