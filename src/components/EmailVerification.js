import React, { useState } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

function EmailVerification() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendVerification = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, 'TEMP_PASSWORD'); // Replace with a real password if required
      const user = userCredential.user;

      await sendEmailVerification(user);
      alert('Verification email sent! Check your inbox.');
      navigate('/login');
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Email Verification</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSendVerification} disabled={loading}>
        {loading ? 'Sending...' : 'Send Verification Email'}
      </button>
    </div>
  );
}

export default EmailVerification;
