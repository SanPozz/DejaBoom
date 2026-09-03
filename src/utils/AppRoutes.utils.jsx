import { Routes, Route } from "react-router-dom"

import LandingPage from "../pages/LandingPage"

import LogIn from "../pages/LogIn"
import Register from "../pages/Register"

import Home from "../pages/Home"
import GameDetail from "../pages/GameDetail"
import Profile from "../pages/Profile"
import Lists from "../pages/Lists"
import ListDetail from "../pages/ListDetail"


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<LogIn />} />
      <Route path="/register" element={<Register />} />

      <Route path="/home" element={<Home />} />
      <Route path="/game/:id" element={<GameDetail />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/lists" element={<Lists />} />
      <Route path="/lists/:id" element={<ListDetail />} />

      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  )
}

export default AppRoutes