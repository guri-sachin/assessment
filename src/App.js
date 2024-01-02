import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Category from "./Component/AdminDashboard/Category";

import Home from "./Component/Mainpage/Home";
import io from 'socket.io-client';

const socket = io('http://localhost:3305');

function App() {
  return (
    <div>
      <Router>
        <Routes>
       
          <Route exact path="/" element={<Home />}></Route>
         <Route exact path="/Product" element={<Category/>}></Route>
        
        
        </Routes>
      </Router>
    </div>
  );
}

export default App;
