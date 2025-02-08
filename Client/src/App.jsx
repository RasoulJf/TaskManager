import React, { useContext, useState } from 'react'
import { Box } from '@mui/material'
import { Routes,Route, Navigate } from 'react-router-dom'
import Layout from './Components/Layout'
import Home from './Pages/Home'
import { AuthContext } from '../Utils/AuthContext'
import Auth from './Pages/Auth'
import Categories from './Pages/Categories'
import Tasks from './Pages/Tasks'
import Profile from './Pages/Profile'
import { Toaster } from 'react-hot-toast'
const App = () => {
  const token=localStorage.getItem('token')
  console.log(token)
  return (
    <>
      <Box>
<Layout/>
<Routes>
<Route exact path='/' element={!token ?  <Navigate to='/auth'/> : <Home/> }></Route>
<Route path='/auth' element={<Auth/>}></Route>
<Route path='/categories' element={<Categories/>}></Route>
<Route path='/tasks' element={<Tasks/>}></Route>
<Route path='/profile/:id' element={<Profile/>}></Route>
</Routes>

      </Box>
      <Toaster/>
    </>
  )
}

export default App
