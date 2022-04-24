import React, { useContext } from 'react';
import './Subtotal.css';
import CurrencyFormat from 'react-currency-format';
import { useNavigate } from 'react-router-dom';
import { Store } from './Store';

function Subtotal() {
  const history = useNavigate();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} items):{' '}
              <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'€'}
      />
      <button onClick={(e) => history('/payment')}>Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;
