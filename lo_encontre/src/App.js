import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/navigation/nav';
import Footer from './components/footer';
import Home from './components/home';
import Logo from './components/logo';
import Login from './components/login';
import SignUp from './components/signup';
import Categories from './components/categories';
import Stores from './components/stores';
import PostaDeal from './components/post_a_deal';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/logo' element={<Logo />} />
        <Route exact path='/home' element={<Home />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/stores' element={<Stores />} />
        <Route path='/post_a_deal' element={<PostaDeal />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

