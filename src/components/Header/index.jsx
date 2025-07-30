
import React from 'react';
import "./styles.css";
import logo from '../../assets/logo_img1.png'; // adjust the path based on your folder structure

function Header() {
  function logoutFnc() {
    alert("logout");
  }

  return (
    <div className="navbar">
      <div className="logo-section">
        <img src={logo} alt="Expenzo Logo" className="app-logo" />
        <span className="app-title">Expenzo</span>
      </div>

      <span className="link logout-btn" onClick={logoutFnc}>Logout</span>
    </div>
  );
}

export default Header;
