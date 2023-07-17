import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home.js"
import Checkout from './Checkout';
import Login from './Login.js';

function App() {
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
