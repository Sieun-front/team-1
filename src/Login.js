import React, { useState } from 'react';
import './App.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      if (isSignup) {
        alert('Signup functionality is not yet implemented.');
      } else {
        onLogin();
      }
    } else {
      alert('Please enter both username and password');
    }
  };

  return (
    <div className="login">
      <h2>{isSignup ? 'Signup' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit">{isSignup ? 'Signup' : 'Login'}</button>
      </form>
      <button
        onClick={() => setIsSignup(!isSignup)}
        style={{ marginTop: '1rem', background: 'blue', color: '#fff', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer' }}
      >
        {isSignup ? 'Switch to Login' : 'Switch to Signup'}
      </button>
    </div>
  );
}

export default Login;
