import React, { useContext } from 'react';
import { AuthContext } from '../../context/useContext/AuthContext';
import './header.css'; 
import { Logout } from '../../context/useContext/AuthAction';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function Homeheader() {
  // const { user, dispatch } = useContext(AuthContext);

  // const handleLogout = () => {
  //   dispatch(Logout());
  // };
 const navigate =useNavigate()

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8083/api/auth/logout', {}, { withCredentials: true });
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to log out. Please try again.');
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="profile-section">
          <img src="" alt="Profile" className="profile-photo" />
        </div>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </header>
  );
}

export default Homeheader;
