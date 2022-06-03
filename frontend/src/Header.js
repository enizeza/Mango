import React, { useContext, useEffect, useState } from 'react';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Link } from 'react-router-dom';
import { Store } from './Store';
import axios from 'axios';
import { getError } from './utils';
import { toast } from 'react-toastify';

function Header() {
  const { state, dispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signOut = () => {
    dispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingInfo');
    window.location.href = '/signin';
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);

  return (
    <nav className="navbar">
      <Link to="/">
        <div className="logo">
          <img src="/images/index.png" alt="logo" />
        </div>
      </Link>
      <div className="item search right" tabIndex="0">
        <div className="search-group">
          <select>
            {categories.map((category) => (
              <option value={category}>
                <Link to={`/search?category=${category}`}>{category}</Link>
              </option>
            ))}
            {/*<option value="all">All</option>
            <option value="all">Mens</option>
            <option value="all">Womens</option>
            <option value="all">Winter</option>
            <option value="all">Summer</option>*/}
          </select>
          <input type="text" />
          <i className="material-icons search-icon">
            <SearchIcon />
          </i>
        </div>
      </div>
      {userInfo ? (
        <Link to={'/profile'} className="item">
          <div className="group">
            <i className="material-icons">
              <AccountCircleIcon fontSize="large" />
            </i>
            <div className="detail">
              Hello, {userInfo.name}
              <div className="sub">Profile</div>
              <button onClick={signOut} className="sub">
                Sign Out
              </button>
            </div>
          </div>
        </Link>
      ) : (
        <Link to={'/signin'} className="item">
          <div className="group">
            <i className="material-icons">
              <AccountCircleIcon fontSize="large" />
            </i>
            <div className="detail">
              Account
              <div className="sub">Sign In</div>
            </div>
          </div>
        </Link>
      )}
      <Link to="/orders" className="item">
        <div className="group">
          <i className="material-icons">
            <LocalShippingIcon fontSize="large" />
          </i>
          <div className="detail">
            Orders
            <div className="sub">& Ship</div>
          </div>
        </div>
      </Link>
      <Link to="/cart" className="item">
        <div className="group">
          <i className="material-icons">
            <ShoppingCartIcon fontSize="large" />
          </i>
          <div className="detail">
            Cart
            {cart.cartItems.length > 0 && (
              <p>{cart.cartItems.reduce((a, c) => a + c.quantity, 0)}</p>
            )}
          </div>
        </div>
      </Link>
    </nav>
  );
}

export default Header;
