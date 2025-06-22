import React, { useState } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        alert('Your email is not verified. Please verify your email.');
        return;
      }

      alert('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      alert(`Login error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      alert(`Welcome ${user.displayName}!`);
      navigate('/dashboard');
    } catch (error) {
      console.error('Google login error:', error);
      alert(`Google login error: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Login</h2>
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
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      <button onClick={handleGoogleLogin} style={styles.googleButton}>
        Login with Google
      </button>
      <p>
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
      <p>
        Forgot Password? <Link to="/password-reset">Reset Password</Link>
      </p>
    </div>
  );
}

const styles = {
  googleButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '10px 20px',
    backgroundColor: '#4285F4',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  googleLogo: {
    width: '20px',
    height: '20px',
  },
};

export default Login;
