import './App.css'
import { Route, Routes } from 'react-router-dom';

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


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/new" element={<PostProject />} />
        <Route path="/projects/:id" element={<GetProject />} />
        <Route path="/projects/:id/edit" element={<EditProject />} />
        <Route path="/projects/:id/delete" element={<DeleteProject />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/new" element={<PostUser />} />
        <Route path="/users/:id" element={<GetUser />} />
        <Route path="/users/:id/edit" element={<EditUser />} />
        <Route path="/users/:id/delete" element={<DeleteUser />} />

      </Routes>
    </>
  )
}

export default App
