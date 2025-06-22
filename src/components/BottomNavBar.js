import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineDashboard, AiOutlineUser, AiOutlineWallet } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { MdOutlineAttachMoney } from 'react-icons/md';
import { FaReceipt } from 'react-icons/fa';

function BottomNavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('authToken'); // Replace with your token key
    sessionStorage.clear(); // Clear any session data if necessary

    // Redirect to login page
    navigate('/');
  };

  return (
    <div style={styles.navBar}>
      <Link
        to="/dashboard"
        style={{
          ...styles.navItem,
          color: location.pathname === '/dashboard' ? '#4CAF50' : '#757575',
        }}
      >
        <AiOutlineDashboard style={styles.icon} />
        <span style={styles.label}>Dashboard</span>
      </Link>
      <Link
        to="/income"
        style={{
          ...styles.navItem,
          color: location.pathname === '/income' ? '#4CAF50' : '#757575',
        }}
      >
        <MdOutlineAttachMoney style={styles.icon} />
        <span style={styles.label}>Income</span>
      </Link>
      <Link
        to="/budget"
        style={{
          ...styles.navItem,
          color: location.pathname === '/budget' ? '#4CAF50' : '#757575',
        }}
      >
        <AiOutlineWallet style={styles.icon} />
        <span style={styles.label}>Budget</span>
      </Link>
      <Link
        to="/expenses"
        style={{
          ...styles.navItem,
          color: location.pathname === '/expenses' ? '#4CAF50' : '#757575',
        }}
      >
        <FaReceipt style={styles.icon} />
        <span style={styles.label}>Expenses</span>
      </Link>
      <Link
        to="/profile"
        style={{
          ...styles.navItem,
          color: location.pathname === '/profile' ? '#4CAF50' : '#757575',
        }}
      >
        <AiOutlineUser style={styles.icon} />
        <span style={styles.label}>Profile</span>
      </Link>
      <div
        onClick={handleLogout}
        style={{
          ...styles.navItem,
          cursor: 'pointer',
          color: '#FF0000',
        }}
      >
        <FiLogOut style={styles.icon} />
        <span style={styles.label}>Logout</span>
      </div>
    </div>
  );
}

const styles = {
  navBar: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: '10px 0',
    boxShadow: '0px -2px 5px rgba(0,0,0,0.1)',
    zIndex: 1000,
  },
  navItem: {
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#757575',
  },
  icon: {
    fontSize: '20px',
    marginBottom: '5px',
  },
  label: {
    fontSize: '12px',
  },
};

export default BottomNavBar;
