import { Edit3, UserIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ProfileHeader({ profile }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6 mb-8">
      <div className="relative -mt-16 sm:-mt-20 md:-mt-24 grid h-28 w-28 place-items-center rounded-full border-4 border-background bg-background-secondary text-primary sm:h-32 sm:w-32 md:h-40 md:w-40">
        <UserIcon size={40} />
        {profile.avatar && (
          <img
            src={profile.avatar}
            alt={`${profile.name} avatar`}
            onError={(event) => event.currentTarget.classList.add("hidden")}
            className="absolute inset-0 h-full w-full rounded-full object-cover"
          />
        )}
      </div>

      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mb-1">
              {profile.name}
            </h1>
            <p className="text-primary font-semibold text-sm md:text-base">
              {profile.username}
            </p>
          </div>
          <Link to="/profile/edit" className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 rounded-lg bg-primary text-background font-semibold hover:opacity-90 transition-all w-full sm:w-auto btn-glow cursor-pointer">
            <Edit3 size={18} />
            Editar Perfil
          </Link>
        </div>

        <p className="text-tertiary text-sm md:text-base mb-3 line-clamp-2 font-light">
          {profile.bio}
        </p>
      </div>
    </div>
  )
}
