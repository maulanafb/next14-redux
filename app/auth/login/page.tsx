'use client'
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser, logoutUser, selectAuth } from "@/app/lib/redux/features/authSlice";

const AuthComponent: React.FC = () => {
  const [email, setEmail] = useState("admin@admin.com");
  const [password, setPassword] = useState("password");
  const dispatch = useDispatch();
  const { user, token, isLoading, error } = useSelector(selectAuth);

    console.log(user);
  const handleLogin = () => {
    dispatch(loginUser({ email, password }));
  };

  const handleRegister = () => {
    dispatch(registerUser({ email, password }));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {user ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
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
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleRegister}>Register</button>
        </div>
      )}
    </div>
  );
};

export default AuthComponent;
