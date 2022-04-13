import React from 'react';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="https://st.mngbcn.com/images/headerNew/logos/mango.svg"
        />
      </Link>

      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>

      <div className="header__nav">
        <Link to={'/login'}>
          <div className="header__option">
            <span className="header__optionLineOne">Hello</span>
            <span className="header__optionLineTwo">Guest</span>
          </div>
        </Link>

        <Link to="/orders">
          <div className="header__option">
            <span className="header__optionLineTwo">Ordini</span>
          </div>
        </Link>

        <div className="header__option">
          <span className="header__optionLineTwo">Preferiti</span>
        </div>

        <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingCartIcon />
            <span className="header__optionLineTwo header__basketCount"></span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
