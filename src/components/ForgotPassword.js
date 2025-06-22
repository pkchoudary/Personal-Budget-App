import React, { useState } from 'react';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    toast.info(`OTP sent to ${email}: ${otp}`);
  };

  const handleSendOtp = () => {
    if (!email) {
      toast.error('Please enter your email.');
      return;
    }
    generateOtp();
    setIsOtpSent(true);
  };

  const handleVerifyOtp = () => {
    if (otp === generatedOtp) {
      toast.success('OTP verified!');
      setIsOtpVerified(true);
    } else {
      toast.error('Invalid OTP.');
    }
  };

  const handleResetPassword = async () => {
    if (!isOtpVerified) {
      toast.error('Please verify your OTP first.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset link sent to your email!');
    } catch (error) {
      toast.error(`Error resetting password: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {isOtpSent && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        </>
      )}
      {!isOtpSent ? (
        <button onClick={handleSendOtp}>Send OTP</button>
      ) : (
        <>
          <input
            type="password"
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={handleResetPassword} disabled={!isOtpVerified}>
            Reset Password
          </button>
        </>
      )}
      <ToastContainer />
    </div>
  );
}

export default ForgotPassword;
