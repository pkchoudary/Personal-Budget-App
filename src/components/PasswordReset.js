import React, { useState } from 'react';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function PasswordReset() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent! Check your inbox.');
      navigate('/login');
    } catch (error) {
      console.error('Error sending reset email:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Password Reset</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleResetPassword} disabled={loading}>
        {loading ? 'Sending...' : 'Send Reset Email'}
      </button>
    </div>
  );
}

export default PasswordReset;
