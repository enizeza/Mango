import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';
import Home from './Home';
import ProductScreen from './ProductScreen';
import CartScreen from './CartScreen';
import SigninScreen from './SigninScreen';
import ShippingAddressScreen from './ShippingAddressScreen';
import SignupScreen from './SignupScreen';
import PaymentScreen from './PaymentScreen';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const promise = loadStripe(
  'pk_test_51KjpxXJ4m4B65folhh5aZ6JaNHAhzYPBLC9enUmlZeezXEmTJLkVsYMoOI0gLaElwkOoSvgNiqmLNEzcOAadhN4G00HUjNk8fB'
);

function App() {
  return (
    <Router>
      <ToastContainer position="bottom-center" limit={1} />
      <header>
        <Header />
      </header>
      <main>
        <div class="content-wrap">
          <Routes>
            <Route exact path="/product/:slug" element={<ProductScreen />} />
            <Route exact path="/" element={<Home />} />
            <Route exact path="/signin" element={<SigninScreen />} />
            <Route exact path="/signup" element={<SignupScreen />} />
            <Route exact path="/cart" element={<CartScreen />} />
            <Route exact path="/shipping" element={<ShippingAddressScreen />} />
            <Route exact path="/order" />
            <Route
              exact
              path="/payment"
              element={
                <>
                  <Elements stripe={promise}>
                    <PaymentScreen />
                  </Elements>
                </>
              }
            />
          </Routes>
        </div>
      </main>
      <footer>
        <div className="footer">All rights reserved</div>
      </footer>
    </Router>
  );
}

export default App;
