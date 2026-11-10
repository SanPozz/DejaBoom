import { ArrowUpRight, Bookmark, Gamepad2, Lock } from 'lucide-react'
import { Link } from 'react-router-dom'
import Bone from '../Bone'

const MAX_VISIBLE = 6

export default function UserLists({ lists, isOwnProfile, nickname }) {
  const visibleLists = lists?.slice(0, MAX_VISIBLE) ?? []

  return (
    <section className="mb-12" aria-labelledby="user-lists-title">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 border-b border-tertiary/10 pb-2">
        <h2 id="user-lists-title" className="text-xs font-bold uppercase tracking-wider text-tertiary">
          {isOwnProfile ? 'Mis listas' : 'Listas'}
          {lists && <span className="ml-2 text-tertiary/60">{lists.length}</span>}
        </h2>

        {isOwnProfile && (
          <div className="flex items-center gap-3">
            {lists?.length > MAX_VISIBLE && (
              <Link to="/lists" className="flex items-center gap-1 text-xs font-semibold text-tertiary hover:text-primary transition-colors">
                Ver todas <ArrowUpRight size={14} />
              </Link>
            )}
            <Link
              to="/lists/new"
              className="flex items-center justify-center gap-2 px-4 py-1.5 rounded-lg bg-primary/10 border border-primary/30 text-primary text-xs font-bold hover:bg-primary/20 transition-all uppercase tracking-wider"
            >
              <Bookmark size={14} />
              Crear nueva lista
            </Link>
          </div>
        )}
      </div>

      {!lists ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="rounded-lg border border-tertiary/15 bg-background-secondary overflow-hidden">
              <Bone className="h-32 sm:h-40 w-full rounded-none" />
              <div className="p-4 space-y-2">
                <Bone className="h-4 w-2/3" />
                <Bone className="h-3 w-1/4" />
              </div>
            </div>
          ))}
        </div>
      ) : lists.length === 0 ? (
        <p className="rounded-lg border border-dashed border-primary/25 bg-background-secondary/50 px-6 py-10 text-center text-sm text-tertiary">
          {isOwnProfile ? 'Todavía no creaste ninguna lista.' : `${nickname} no tiene listas públicas.`}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleLists.map((list) => (
            <Link
              key={list.id}
              to={`/lists/${list.id}`}
              className="group bg-background-secondary border border-tertiary/15 rounded-lg overflow-hidden hover:border-primary/40 transition-all duration-300"
            >
              {/* Las primeras portadas una al lado de la otra */}
              <div className="relative flex overflow-hidden h-32 sm:h-40 bg-tertiary/5">
                {list.covers.length > 0 ? (
                  list.covers.map((game) => (
                    <img
                      key={game.id}
                      src={game.cover}
                      alt=""
                      className="h-full min-w-0 flex-1 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ))
                ) : (
                  <div className="grid flex-1 place-items-center text-tertiary">
                    <Gamepad2 size={24} />
                  </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
                {!list.isPublic && (
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-tertiary backdrop-blur-sm">
                    <Lock size={10} /> Privada
                  </span>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-bold text-secondary group-hover:text-primary transition-colors line-clamp-1 text-sm mb-1 wrap-break-word">
                  {list.title}
                </h3>
                <p className="text-tertiary/60 text-xs">
                  {list.gamesCount} {list.gamesCount === 1 ? 'juego' : 'juegos'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
