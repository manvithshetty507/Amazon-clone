import React from 'react';
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

import { useStateValue } from "./StateProvider";

import { Link } from 'react-router-dom';

import { auth } from "./firebase";

function Header() {

  const [{ basket, user}, dispatch] = useStateValue();

  const handleAuthentication = () => {
    if(user) {
      auth.signOut();
    }
  }

  const getName = (email) => {
    let name = "";
    let i= 0;
    while(email[i] != "@" || i > email.length -1) {
      name += email[i];
      i++;
    }
    return name;
  }

  return (
    <div>
      <div className="header">
      <Link to="/"> 
      <img
        className="header__logo"
        src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"> 
      </img>
      </Link>

      <div className="header__search">
        <input
            className="header__searchInput"
            type="text">
        </input>
        {/* logo */}
        <SearchIcon 
            className="header__searchIcon" />

      </div>

      <div className='header__nav'>

        <Link to={!user && '/login'}>
          <div className='header__option' onClick={handleAuthentication}>
          <span className='header__optionLineOne'>Hello {user ? getName(user.email) : "Guest"}</span>
              <span className='header__optionLineTwo'>{user ? "Sign Out" : "Sign In"}</span>
          </div>
        </Link>
        <Link to='/orders'>
        <div className='header__option'>
            <span className='header__optionLineOne'>Returns</span>
            <span className='header__optionLineTwo'>& orders</span>
        </div>
        </Link>
        <div className='header__option'>
        <span className='header__optionLineOne'>Your</span>
            <span className='header__optionLineTwo'>Prime</span>
        </div>

        <Link to="/checkout"> 
        <div className='basket__option'>
            <ShoppingBasketIcon className='shopping__basketIcon'/> 
            <span className='header__optionLineTwo header__basketCount'>{ basket.length }</span>
        </div>
        </Link>

      </div>
    </div>
    </div>
  )
}

export default Header
