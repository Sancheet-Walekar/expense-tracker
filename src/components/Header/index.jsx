import React, { useEffect } from 'react';
import "./styles.css";
import logo from '../../assets/logo_img1.png'; // adjust the path if needed
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';

function Header() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && window.location.pathname === "/") {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);


  const logoutFnc = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error.message);
      toast.error("Logout failed: " + error.message);
    }
  };

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
