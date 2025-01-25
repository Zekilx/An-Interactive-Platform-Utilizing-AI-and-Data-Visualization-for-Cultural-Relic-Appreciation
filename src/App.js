import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Appreciation from "./pages/Appreciation";
import Review from "./pages/Review";
import Task from "./pages/Task";
import Home from "./pages/Home"
import "./index.css";
import { TaskProvider } from '../src/pages/context/TaskContext';
import { FavoritesProvider } from "../src/pages/context/FavoritesContext";


function App() {

    
  return (
    <FavoritesProvider>
    <TaskProvider>
      <div className="App">
         <NavBar />
          <Routes>
                <Route exact path ="/" element= { <Home /> } /> 
                <Route path ="/task" element= { <Task /> } /> 
                <Route path="/appreciation" element= { <Appreciation/>} />
                <Route path="/review" element= {<Review /> } />       

          </Routes>
        
          
      </div>
      </TaskProvider>
      </FavoritesProvider>
  );
}

export default App;


{/* <li className="list-item">
                    <a href="https://www.linkedin.com/in/bridget-kelly-594009127/" target="_blank"> <AiFillLinkedin /> <span>Bridget Kelly</span></a>
                </li> */}

{/* <li className="list-item">
                <a href="https://www.linkedin.com/in/matt-mckay-cpa-a2447a116" target="_blank"> <AiFillLinkedin /> Matt McKay </a>
            </li> */}