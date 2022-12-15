import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import './App.css';
import Layout from './components/Layout';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Layout>
      <Routes>
        <Route
          path='/'
          exact
          element={
            isLoggedIn ? <Navigate to='/home' /> : <Navigate to='/login' />
          }
        />
        <Route
          path='/home'
          element={isLoggedIn ? <Home /> : <Navigate to='/login' />}
        />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Layout>
  );
}

export default App;