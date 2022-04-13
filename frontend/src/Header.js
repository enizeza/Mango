import React from 'react';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav class="navbar">
      <Link to="/">
        <div class="logo">
          <img src="/images/index.jpg" alt="logo" />
        </div>
      </Link>
      <div class="item search right" tabindex="0">
        <div class="search-group">
          <select>
            <option value="all">All</option>
            <option value="all">Mens</option>
            <option value="all">Womens</option>
            <option value="all">Winter</option>
            <option value="all">Summer</option>
          </select>
          <input type="text" />
          <i class="material-icons search-icon">
            <SearchIcon fontSize="large"/>
          </i>
        </div>
      </div>
      <Link to={'/login'} class="item">
        <div class="group">
          <i class="material-icons">
            <AccountCircleIcon fontSize="large"/>
          </i>
          <div class="detail">
            Account
            <div class="sub">Sign In</div>
          </div>
        </div>
      </Link>
      <Link to="/orders" class="item">
        <div class="group">
          <i class="material-icons" >
            <LocalShippingIcon fontSize="large"/>
          </i>
          <div class="detail">
            Orders
            <div class="sub">& Ship</div>
          </div>
        </div>
      </Link>
      <Link to="/checkout" class="item">
        <div class="group">
          <i class="material-icons">
            <ShoppingCartIcon fontSize="large"/>
          </i>
          <div class="detail">
            Cart
            <div class="sub">€ 0.0</div>
          </div>
        </div>
      </Link>
    </nav>
  );
}

export default Header;
