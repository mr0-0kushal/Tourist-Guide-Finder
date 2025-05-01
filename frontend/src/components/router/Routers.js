import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Home from './../pages/Home'
import Tours from './../pages/Tours'
import TourDetails from './../pages/TourDetails'
import Login from './../pages/Login'
import Register from './../pages/Register'
import SearchResultList  from './../pages/SearchResultList'
import ThankYou from '../pages/ThankYou'
import GuideList from '../pages/GuideList'
import GuideDetails from '../pages/GuideDetails'
import Profile from './../pages/Profile'
import AdminDashboard from '../Admin/AdminDashboard'
import ProfileB from '../pages/ProfileB'
import Messages from '../pages/Messages'
import Settings from '../pages/Settings'
import BookingD from '../pages/BookingD'

const Routers = () => {
  return (
    <Routes>
        <Route path='/' element= {<Navigate to='/home'/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/tours' element={<Tours/>} />
        <Route path='/guides' element={<GuideList/>} />
        <Route path='/tours/:id' element={<TourDetails/>} />
        <Route path='/guide/:id' element={<GuideDetails/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/thank-you' element={<ThankYou/>} />
        <Route path='/tours/search' element={<SearchResultList/>} />
        <Route path='/admin' element={<AdminDashboard/>} />


        {/* Dashboard Main with Nested Routes */}
      <Route path='/users/profile' element={<Profile/>}>
        <Route index element={<ProfileB />} />
        <Route path='profile' element={<ProfileB />} />
        <Route path="tours" element={<Tours />} />
        <Route path="bookings" element={<BookingD />} />
        <Route path="messages" element={<Messages />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default Routers
