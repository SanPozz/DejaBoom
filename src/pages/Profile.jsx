import React from "react"
import { MessageSquare, Bookmark, Gamepad2, Trophy } from "lucide-react"
import Sidebar from "../components/app/Sidebar"
import ProfileHeader from "../components/app/Profile/ProfileHeader"
import ProfileStats from "../components/app/Profile/ProfileStats"
import FavoriteGames from "../components/app/Profile/FavoriteGames"
import RecentReviews from "../components/app/Profile/RecentReviews"
import ActivitySidebar from "../components/app/Profile/ActivitySidebar"
import UserLists from "../components/app/Profile/UserLists"

const Profile = () => {
  const userProfile = {
    name: "User Example",
    username: "@userexample",
    bio: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    avatar: "https://unsplash.com",
    bannerImage: "https://unsplash.com",
    joinedDate: "Agosto 2023",
  }

  const stats = [
    { icon: MessageSquare, label: "Reseñas", value: 142, color: "text-primary" },
    { icon: Bookmark, label: "Listas", value: 28, color: "text-blue-400" },
    // { icon: Gamepad2, label: "Completados", value: 87, color: "text-purple-400" },
    // { icon: Trophy, label: "Logros", value: 24, color: "text-amber-400" },
  ]

  const recentReviews = [
    { id: 1, gameTitle: "Elden Ring", rating: 5, date: "Hace 2 días", text: "Una obra maestra absoluta. La libertad de exploración combinada con un combate desafiante es simplemente adictivo." },
    { id: 2, gameTitle: "Baldur's Gate 3", rating: 4.5, date: "Hace 1 semana", text: "Increíble profundidad en las decisiones y personajes. Los diálogos son excelentes aunque el juego es bastante largo." },
    { id: 3, gameTitle: "Starfield", rating: 3.5, date: "Hace 2 semanas", text: "Buen juego, pero esperaba más. La exploración espacial está bien pero necesita más variedad en los planetas." },
  ]

  const userLists = [
    { id: 1, title: "Mis Juegos Favoritos de RPG", games: 12, image: "https://unsplash.com" },
    { id: 2, title: "Juegos Indie que cambiaron mi vida", games: 8, image: "https://unsplash.com" },
    { id: 3, title: "Juegos Para Este Año", games: 15, image: "https://unsplash.com" },
  ]

  return (
    <div className="flex w-full bg-background min-h-screen text-secondary font-sans antialiased">
      <Sidebar />

      <div className="flex-1 w-full overflow-y-auto">
        {/* Banner */}
        <div className="relative h-32 sm:h-40 md:h-48 lg:h-56 w-full overflow-hidden bg-background-secondary">
          <img src={userProfile.bannerImage} alt="Banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-6 py-8">
          
          <ProfileHeader profile={userProfile} />
          
          <ProfileStats stats={stats} />

          {/* NUEVA SECCIÓN: Juegos Favoritos estilo Letterboxd */}
          <FavoriteGames />

          {/* Layout de dos columnas */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <RecentReviews reviews={recentReviews} />
            <ActivitySidebar joinedDate={userProfile.joinedDate} />
          </div>

          <UserLists lists={userLists} />

        </div>
      </div>
    </div>
  )
}

export default Profile
