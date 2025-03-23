import React from 'react'
import Navbar from './components/Navbar'
import {Routes, Route} from "react-router-dom"
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import {useAuthStore} from './store/useAuthStore.js'
import {useEffect} from 'react'
import {Loader} from 'lucide-react'

const App = () => {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log({authUser});
  if(isCheckingAuth && !authUser)
    return(
      <div className='flex items-center justify-center h-screen'>
      <Loader className='w-10 h-10 animate-spin' />
   </div>
    );
  


  
  return (
    <div>
      <Navbar/>
      <Routes>
     <Route path="/" element={<HomePage/>}/>
     <Route path="/signup" element={<SignupPage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/settings" element={<SettingsPage/>} />
      <Route path="/profile" element={<ProfilePage/>} />

      </Routes>

    </div>
  )
}

export default App