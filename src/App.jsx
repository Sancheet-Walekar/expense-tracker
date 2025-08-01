import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import { BrowserRouter } from 'react-router'
import { Routes } from 'react-router'
import { Route } from 'react-router'
import { Router } from 'react-router'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import { ToastContainer, toast } from 'react-toastify';
import Cards from './components/Cards'

function App() {

  return (
    <>
    <ToastContainer/>
      <div className="App">
        <Header />
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />

          </Routes>
      </div>
    </>
  )
}

export default App
