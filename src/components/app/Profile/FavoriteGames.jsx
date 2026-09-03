import React from 'react'

export default function FavoriteGames() {
  // Datos simulados para tus 5 juegos top
  const favoriteGames = [
    { id: 1, title: "Elden Ring", img: "https://unsplash.com" },
    { id: 2, title: "Baldur's Gate 3", img: "https://unsplash.com" },
    { id: 3, title: "Zelda: Tears of the Kingdom", img: "https://unsplash.com" },
    { id: 4, title: "Cyberpunk 2077", img: "https://unsplash.com" },
    { id: 5, title: "Hades II", img: "https://unsplash.com" },
  ]

  return (
    <div className="mb-12">
      <h2 className="text-xs font-bold uppercase tracking-wider text-tertiary mb-4 border-b border-tertiary/10 pb-2">
        Juegos Favoritos
      </h2>
      
      {/* Grid de 5 columnas nativo estilo Letterboxd */}
      <div className="grid grid-cols-5 gap-3 sm:gap-4">
        {favoriteGames.map((game) => (
          <div 
            key={game.id}
            className="group aspect-[3/4] w-full rounded-lg overflow-hidden cursor-pointer bg-background-secondary border border-tertiary/15 transition-all duration-300 hover:border-primary hover:ring-2 hover:ring-primary/20"
          >
            <img 
              src={game.img} 
              alt={game.title} 
              className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
