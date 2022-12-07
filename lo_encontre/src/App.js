import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

import Navbar from './components/nav';
import Footer from './components/footer';
import Home from './components/home';
import Logo from './components/logo';
import Login from './components/login';
import SignUp from './components/signup';
import About from './components/about';
import PostaDeal from './components/post_a_deal';

function App() {
  const { user } = useAuthContext()
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/logo' element={<Logo />} />
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/post_a_deal' element={<PostaDeal />} />
        <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

