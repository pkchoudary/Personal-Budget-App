import React, { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await sendEmailVerification(user);

      alert('Verification email sent! Please check your inbox.');
      setVerificationSent(true);
    } catch (error) {
      console.error('Signup error:', error);
      alert(`Signup error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      {!verificationSent ? (
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={handleSignup} disabled={loading}>
            {loading ? 'Signing up...' : 'Signup'}
          </button>
          <p>
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>
      ) : (
        <div>
          <p>
            A verification email has been sent to <strong>{email}</strong>. Please verify your email to complete the signup process.
          </p>
        </div>
      )}
    </div>
  );
}

export default Signup;
