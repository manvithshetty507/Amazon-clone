import './App.css';
import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home.js"
import Checkout from './Checkout';
import Login from './Login.js';
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";


function App() {

  const userAuthContext = createContext();
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={[<Header />,<Home />]} />
            <Route path="/checkout" element={[<Header />,<Checkout />]} />
            <Route path="/login" element={<Login />} />
          </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
