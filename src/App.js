import './App.css';
import React from 'react';
import Header from './components/Header'
import {Route, Routes } from "react-router-dom"
import Register from './pages/Register'
import Home from './pages/Home'
//import Profile from './pages/Profile'
import Login from './pages/Login'
import Post from './pages/Post'
import Edit from './pages/Edit'
import CreatePost from './pages/CreatePost';

function App() {
  return (
   <main>
      <Header />
      <Routes>
         <Route exact path="/" element={<Home />} />
        <Route path="/post/:id" element={<Post/>} />
        <Route path="/edit/:id" element={<Edit/>} />
        
         <Route path="/Login" element={<Login/>} />
         <Route path="/Register" element={<Register/>} />
         <Route path="/ProfilePage" element={<CreatePost/>} />
         <Route path="*" element={<Register/>} />

      </Routes>
     </main>

  );
}

export default App;
    //     <Route exact path="/" element={<P />} />
   //       <Route path="/" element={< v/>} />
     //     <Route path="/" element={<D />} />
       //   <Route  path= "*" element = {<D />}/>