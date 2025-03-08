import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import Home from './pages/Home';
import Layout from './pages/Layout';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App
