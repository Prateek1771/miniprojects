import React from 'react'
import './index.css';
import { Route, Routes } from 'react-router-dom';
import Mealinfo from './component/Mealinfo';
import Food from "./components/Food";
import Recipe from './Components/Recipe';
import Mainpage from './Component/Mainpage';

function App() { 
  return (
    <Routes>
    <Route path='/' element={<Mainpage />} />
    <Route path='/:mealid' element={<Mealinfo />} />
    </Routes>

  );
}

export default App;