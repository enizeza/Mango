import React, { useContext, useEffect, useState } from 'react';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from './Store';
import axios from 'axios';
import { getError } from './utils';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';

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

  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(
      query
        ? `/search/?category=${category}&query=${query}`
        : `/search?category=${category}`
    );
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <div className="logo">
          <img src="/images/index.png" alt="logo" />
        </div>
      </Link>
      <div className="item search right" tabIndex="0">
        <form onSubmit={submitHandler}>
          <div className="search-group">
            <div className="categories">
              <select
                id="categorySearch"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="all">All</option>
                {categories.map((category) => (
                  <option value={category} key={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="t">
              <input
                type="text"
                name="q"
                id="q"
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Button className="material-icons search-icon" type="submit">
              <SearchIcon />
            </Button>
          </div>
        </form>
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
