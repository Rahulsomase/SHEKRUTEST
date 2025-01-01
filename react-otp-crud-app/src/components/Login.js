

import React, { useState } from 'react';
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
    recaptchaVerifier.render();

    signInWithPhoneNumber(auth, mobile, recaptchaVerifier)
      .then((confirmationResult) => {
        setVerificationId(confirmationResult.verificationId);
        alert('OTP sent!');
      })
      .catch((error) => {
        alert('Error: ' + error.message);
      });
  };

  const handleVerifyOtp = () => {
    const credential = window.firebase.auth.PhoneAuthProvider.credential(verificationId, otp);
    auth.signInWithCredential(credential)
      .then(() => {
        alert('Successfully logged in!');
        navigate('/dashboard');
      })
      .catch((error) => {
        alert('Error: ' + error.message);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <input 
        type="text" 
        placeholder="Enter Mobile Number" 
        value={mobile} 
        onChange={(e) => setMobile(e.target.value)} 
      />
      <button onClick={handleLogin}>Send OTP</button>
      {verificationId && (
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
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default Login;
