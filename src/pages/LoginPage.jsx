// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username.trim() === '' || password.trim() === '') {
      setError('ユーザー名とパスワードを入力してください');
      return;
    }

    setError(''); // エラークリア
    alert('ログイン成功');
    navigate('/customers');
  };

  return (
    <div className="login-container">
      <h2 className="login-title">ログイン</h2>
      
      {error && <p className="login-error">{error}</p>}

      <input
        className="login-input"
        type="text"
        placeholder="ユーザー名"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="login-input"
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-button" onClick={handleLogin}>
        ログイン
      </button>
    </div>
  );
};

export default LoginPage;
