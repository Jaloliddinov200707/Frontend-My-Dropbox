import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./Components/LoginAndSignup/Login.js";
import Home from "./Components/Dashboard/Home.js";
import Register from "./Components/LoginAndSignup/signup.js";
import Folder from "./Components/Folder/Folder.js";
import UserPage from "./Components/updataprofile/update.js";
import { auth } from "./api/firebaseConfig.js";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        localStorage.setItem("localUser", JSON.stringify(authUser));
        setUser(authUser);
      } else {
        localStorage.removeItem("localUser");
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Home /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/" replace /> : <Register />}
      />
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/home"
        element={user ? <Home /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/home/user/:id"
        element={user ? <UserPage /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/home/folder/:id"
        element={user ? <Folder /> : <Navigate to="/login" replace />}
      />
    </Routes>
  );
}

export default App;
