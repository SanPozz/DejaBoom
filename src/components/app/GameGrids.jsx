import React from 'react';

export default function GameDashboard() {
  // Datos simulados para la primera sección (Popular This Week)
  const popularGames = [
    { id: 1, image: 'https://unsplash.com' },
    { id: 2, image: 'https://unsplash.com' },
    { id: 3, image: 'https://unsplash.com' },
    { id: 4, image: 'https://unsplash.com' },
    { id: 5, image: 'https://unsplash.com' },
    { id: 6, image: 'https://unsplash.com' },
  ];

  // Datos simulados para la segunda sección (New From Friends)
  const friendGames = [
    { id: 1, image: 'https://unsplash.com', initial: 'L', color: 'bg-cyan-500', stars: 5 },
    { id: 2, image: 'https://unsplash.com', initial: 'K', color: 'bg-teal-500', stars: 4 },
    { id: 3, image: 'https://unsplash.com', initial: 'M', color: 'bg-amber-500', stars: 4 },
    { id: 4, image: 'https://unsplash.com', initial: 'T', color: 'bg-rose-500', stars: 4 },
    { id: 5, image: 'https://unsplash.com', initial: 'D', color: 'bg-yellow-500', stars: 5 },
    { id: 6, image: 'https://unsplash.com', initial: 'N', color: 'bg-emerald-500', stars: 5 },
  ];

  return (
    <div className="w-full min-h-screen bg-background text-secondary p-30 font-sans select-none space-y-12">
      
      {/* SECCIÓN 1: POPULAR THIS WEEK */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xs font-bold tracking-wider text-zinc-400 uppercase">Populares esta semana</h3>
          <a href="#" className="text-xs text-zinc-500 hover:text-secondary flex items-center gap-1 transition-colors">
            Ver Más <span className="text-[10px]">&gt;</span>
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {popularGames.map((game) => (
            <div 
              key={game.id} 
              className="group aspect-[3/4] w-full rounded-xl overflow-hidden cursor-pointer bg-zinc-900 border border-zinc-800 transition-all duration-300 ease-out hover:border-primary hover:ring-2 hover:ring-primary/20"
            >
              <img 
                src={game.image} 
                alt="Game poster" 
                className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105" 
              />
            </div>
          ))}
        </div>
      </div>

      {/* SECCIÓN 2: NEW FROM FRIENDS */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xs font-bold tracking-wider text-zinc-400 uppercase">Nueva actividad de amigos</h3>
          <a href="#" className="text-xs text-zinc-500 hover:text-secondary flex items-center gap-1 transition-colors">
          Ver Más <span className="text-[10px]">&gt;</span>
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {friendGames.map((game) => (
            <div key={game.id} className="flex flex-col gap-2 cursor-pointer">
              {/* Contenedor de la Imagen con efecto hover individual */}
              <div className="group aspect-[3/4] w-full rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 transition-all duration-300 ease-out hover:border-primary hover:ring-2 hover:ring-primary/20">
                <img 
                  src={game.image} 
                  alt="Game poster" 
                  className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105" 
                />
              </div>

              {/* Indicadores de Amigo y Estrellas Inferiores (Fuera del contenedor del zoom) */}
              <div className="flex items-center gap-1.5 px-0.5">
                {/* Avatar circular con inicial */}
                <div className={`w-4 h-4 rounded-full ${game.color} flex items-center justify-center text-[10px] font-black text-black shrink-0`}>
                  {game.initial}
                </div>
                {/* Sistema de 5 estrellas */}
                <div className="flex text-[10px] tracking-tight">
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i} 
                      className={i < game.stars ? 'text-primary' : 'text-zinc-700'}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
