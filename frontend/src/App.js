import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';
import Home from './Home';
import ProductScreen from './ProductScreen';
import CartScreen from './CartScreen';
import SigninScreen from './SigninScreen';

function App() {
  return (
    <Router>
      <ToastContainer position="bottom-center" limit={1} />
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route exact path="/product/:slug" element={<ProductScreen />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signin" element={<SigninScreen />} />
          <Route exact path="/cart" element={<CartScreen />} />
        </Routes>
      </main>
      <footer>
        <div className="footer">All rights reserved</div>
      </footer>
    </Router>
  );
}

export default App;
