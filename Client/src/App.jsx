import React, { useContext, useState } from 'react'
import { Box } from '@mui/material'
import { Routes,Route, Navigate, useLocation } from 'react-router-dom'
import Layout from './Components/Layout'
import Home from './Pages/Home'
import Auth from './Pages/Auth'
import Categories from './Pages/Categories'
import Tasks from './Pages/Tasks'
import Profile from './Pages/Profile'
import { Toaster } from 'react-hot-toast'
import { AuthContext } from '../Utils/AuthContext'
const App = () => {
const {token} = useContext(AuthContext)
const location = useLocation()
  return (
    <>
      <Box>
      {location.pathname !== '/auth' && <Layout />}
<Routes>
<Route exact path='/' element={!token?<Navigate to={'/auth'}/>:<Home/> }></Route>
<Route path='/auth' element={<Auth/>}></Route>
<Route path='/categories' element={!token?<Navigate to={'/auth'}/>:<Categories/>}></Route>
<Route path='/tasks' element={!token?<Navigate to={'/auth'}/>:<Tasks/>}></Route>
<Route path='/profile/:id' element={!token?<Navigate to={'/auth'}/>:<Profile/>}></Route>
</Routes>

      </Box>
      <Toaster/>
    </>
  )
}

export default App
