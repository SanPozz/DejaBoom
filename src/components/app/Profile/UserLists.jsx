import React from 'react'
import { Bookmark } from 'lucide-react'

export default function UserLists({ lists }) {
  return (
    <div className="mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 border-b border-tertiary/10 pb-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-tertiary">
          Mis Listas
        </h2>
        <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-primary/10 border border-primary/30 text-primary text-xs font-bold hover:bg-primary/20 transition-all w-full sm:w-auto uppercase tracking-wider">
          <Bookmark size={14} />
          Crear Nueva Lista
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lists.map((list) => (
          <div
            key={list.id}
            className="group bg-background-secondary border border-tertiary/15 rounded-lg overflow-hidden hover:border-tertiary/40 transition-all duration-300 cursor-pointer"
          >
            <div className="relative overflow-hidden h-32 sm:h-40 bg-tertiary/5">
              <img
                src={list.image}
                alt={list.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>

            <div className="p-4">
              <h3 className="font-bold text-secondary group-hover:text-primary transition-colors line-clamp-1 text-sm mb-1">
                {list.title}
              </h3>
              <p className="text-tertiary/60 text-xs">
                {list.games} juegos
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
