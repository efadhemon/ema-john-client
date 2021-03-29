import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    return (
        <div className="header">
            <img src={logo} alt="logo" />
            <nav>
                <Link className="link" to="/shop"><li>Shop</li></Link>
                <Link className="link" to="/review"><li>Order Review</li></Link>
                <Link className="link" to="/inventory"><li>Manage Inventory</li></Link>
            </nav>
        </div>
    );
};

export default Header;