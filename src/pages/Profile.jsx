import { useState, useEffect } from 'react';
import { MessageSquare, Bookmark, LogOut, Gamepad2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate, useParams } from 'react-router-dom';

import Sidebar from '../components/app/Sidebar';
import ProfileHeader from '../components/app/Profile/ProfileHeader';
import ProfileStats from '../components/app/Profile/ProfileStats';
import FavoriteGames from '../components/app/Profile/FavoriteGames';
import RecentReviews from '../components/app/Profile/RecentReviews';
import ActivitySidebar from '../components/app/Profile/ActivitySidebar';
import UserLists from '../components/app/Profile/UserLists';

import { getProfile } from '../services/users.service.js';
import { getErrorMessage } from '../services/api.service.js';


const userLists = [
  {
    id: 1,
    title: 'Mis Juegos Favoritos de RPG',
    games: 12,
    image: 'https://unsplash.com',
  },
  {
    id: 2,
    title: 'Juegos Indie que cambiaron mi vida',
    games: 8,
    image: 'https://unsplash.com',
  },
  {
    id: 3,
    title: 'Juegos Para Este Año',
    games: 15,
    image: 'https://unsplash.com',
  },
];

const Profile = () => {
  const { nickname } = useParams();
  const { logout, user: currentUser } = useAuth();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {

    let ignore = false;

    getProfile(nickname)
      .then((data) => {if (!ignore) setUserProfile(data)})
      .catch((err) => {
        if (ignore) return;
        setError(err.response?.status === 404
            ? 'Perfil no encontrado'
            : getErrorMessage(err, 'No se pudo cargar el perfil')
        );
      });

      return () => {
        ignore = true;
      };

  }, [nickname]);

  const isOwnProfile = currentUser?.nickname === userProfile?.user.nickname;

  const stats = userProfile && [
    {
      icon: MessageSquare,
      label: 'Reseñas',
      value: userProfile.stats.reviewsCount,
      color: 'text-primary',
    },
    { icon: Bookmark,
      label: 'Listas', 
      value: 28, 
      color: 'text-blue-400' 
    },
    { icon: Gamepad2, 
      label: "Completados", 
      value: userProfile.stats.completedCount, 
      color: "text-purple-400" },
    // { icon: Trophy, label: "Logros", value: 24, color: "text-amber-400" },
  ];

  return (
    <div className='flex w-full bg-background min-h-screen text-secondary font-sans antialiased'>
      <Sidebar />

      <div className='flex-1 w-full overflow-y-auto'>
        {error && (
          <p className='max-w-5xl mx-auto px-6 py-16 text-center text-tertiary'>{error}</p>
        )}

        {!error && !userProfile && (
          <p className='max-w-5xl mx-auto px-6 py-16 text-center text-tertiary'>Cargando perfil...</p>
        )}

        {userProfile && (
          <>
            {/* Banner */}
            <div className='relative h-32 sm:h-40 md:h-48 lg:h-56 w-full overflow-hidden bg-background-secondary'>
              {userProfile.user.profileBanner && (
                <img src={userProfile.user.profileBanner} alt='' className='w-full h-full object-cover' />
              )}
              <div className='absolute inset-0 bg-linear-to-t from-background/90 to-transparent' />
              {isOwnProfile && (
                <button
                  type='button'
                  onClick={() => logout().then(() => navigate('/login'))}
                  className='absolute right-4 top-4 z-10 flex items-center gap-2 rounded-xl border border-white/20 bg-background/75 px-3 py-2 text-sm font-semibold text-secondary backdrop-blur-sm transition-colors hover:border-rose-400/50 hover:bg-rose-400/15 hover:text-rose-300 sm:right-6 sm:top-6 sm:px-4 sm:py-2.5 lg:hidden'
                >
                  <LogOut size={18} />
                  <span>Cerrar sesión</span>
                </button>
              )}
            </div>

            {/* Main Content */}
            <div className='max-w-5xl mx-auto px-6 py-8'>
              <ProfileHeader profile={userProfile.user} isOwnProfile={isOwnProfile} />

              <ProfileStats stats={stats} />

              <FavoriteGames />

              <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12'>
                <RecentReviews reviews={userProfile.recentReviews} />
                <ActivitySidebar joinedDate={userProfile.user.createdAt} />
              </div>

              <UserLists lists={userLists} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
