import React from 'react';
import './App.css'
import { Route, Routes } from 'react-router-dom';

import Header from './components/header';

import Login from './pages/login';
import Subscribe from './pages/subscribe';
import Dashboard from './pages/dashboard';

import Projects from './pages/projects';
import PostProject from './pages/project/post';
import GetProject from './pages/project/get';
import EditProject from './pages/project/edit';
import DeleteProject from './pages/project/delete';

import Users from './pages/users';
import PostUser from './pages/user/post';
import GetUser from './pages/user/get';
import EditUser from './pages/user/edit';
import DeleteUser from './pages/user/delete';

import ProtectedRoute from './context/protected_route';


function App() {

  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
          <Route path="/projects" element={<ProtectedRoute element={Projects} />} />
          <Route path="/projects/new" element={<ProtectedRoute element={PostProject} />} />
          <Route path="/projects/:id" element={<ProtectedRoute element={GetProject} />} />
          <Route path="/projects/:id/edit" element={<ProtectedRoute element={EditProject} />} />
          <Route path="/projects/:id/delete" element={<ProtectedRoute element={DeleteProject} />} />
          <Route path="/users" element={<ProtectedRoute element={Users} />} />
          <Route path="/users/new" element={<ProtectedRoute element={PostUser} />} />
          <Route path="/users/:id" element={<ProtectedRoute element={GetUser} />} />
          <Route path="/users/:id/edit" element={<ProtectedRoute element={EditUser} />} />
          <Route path="/users/:id/delete" element={<ProtectedRoute element={DeleteUser} />} />
        </Routes>
      </div>
    </>
  )
}

export default App
