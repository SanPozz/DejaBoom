import { Routes, Route } from "react-router-dom"
import ReviewDetail from "../pages/ReviewDetail"
import ProtectedRoute from "./ProtectedRoute"
import PublicOnlyRoute from "./PublicOnlyRoute"
import MyProfileRedirect from "./MyProfileRedirect"

import LandingPage from "../pages/LandingPage"

import LogIn from "../pages/LogIn"
import Register from "../pages/Register"

import Home from "../pages/Home"
import GameDetail from "../pages/GameDetail"
import Profile from "../pages/Profile"
import EditProfile from "../pages/EditProfile"
import Lists from "../pages/Lists"
import ListDetail from "../pages/ListDetail"
import ListForm from "../pages/ListForm"
import NotFound from "../pages/NotFound"
import AllReviews from "../pages/AllReviews"


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['USER']} />}>
        <Route path="/home" element={<Home />} />
        <Route path="/game/:id" element={<GameDetail />} />
        <Route path="/profile" element={<MyProfileRedirect />} />
        <Route path="/profile/:nickname" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/lists" element={<Lists />} />
        <Route path="/lists/new" element={<ListForm />} />
        <Route path="/lists/:id/edit" element={<ListForm />} />
        <Route path="/lists/:id" element={<ListDetail />} />
        <Route path="/profile/reviews" element={<AllReviews />} />
        <Route path="/review/:id" element={<ReviewDetail />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes