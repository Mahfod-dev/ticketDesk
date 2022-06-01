import React from 'react';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/authSlice';

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Support Desk</Link>
      </div>
      <ul>
        <li>
          {user ? (
            <button className="btn" onClick={onLogout}>
              <FaSignInAlt /> Logout
            </button>
          ) : (
            <Link to="/login">
              <FaSignInAlt /> Login
            </Link>
          )}
        </li>
        <li>
          <Link to="/register">
            {!user && (
              <>
                <FaUser /> Register
              </>
            )}
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
