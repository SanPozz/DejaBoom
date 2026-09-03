import React from 'react';

export default function PopularLists() {
  const lists = [
    {
      id: 1,
      title: "Los mejores Soulslike",
      gamesCount: 24,
      author: "Pablo",
      covers: [
        "https://unsplash.com",
        "https://unsplash.com",
        "https://unsplash.com",
        "https://unsplash.com",
      ]
    },
    {
      id: 2,
      title: "Juegos para dias lluviosos",
      gamesCount: 18,
      author: "Gonzalo",
      covers: [
        "https://unsplash.com",
        "https://unsplash.com",
        "https://unsplash.com",
        "https://unsplash.com",
      ]
    },
    {
      id: 3,
      title: "Juegos cooperativos para jugar con tu mejor amigo",
      gamesCount: 12,
      author: "Maria",
      covers: [
        "https://unsplash.com",
        "https://unsplash.com",
        "https://unsplash.com",
        "https://unsplash.com",
      ]
    }
  ];

  return (
    <div className="w-full bg-background text-white px-30 pb-10 font-sans select-none mx-auto">
      
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-xs font-bold tracking-wider text-zinc-400 uppercase">
          Listas Populares
        </h3>
        <a href="#" className="text-xs text-zinc-500 hover:text-white flex items-center gap-1 transition-colors">
          Ver Más <span className="text-[10px]">&gt;</span>
        </a>
      </div>

      {/* Grid de Tarjetas de Listas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
        {lists.map((list) => (
          <div 
            key={list.id}
            className="group bg-background-secondary border border-tertiary/15 rounded-xl p-5 hover:border-tertiary/50 hover:bg-background-secondary/80 transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[180px]"
          >
            {/* Contenedor de Portadas Apiladas (Efecto abanico / cartas) */}
            <div className="flex -space-x-7 mb-4 overflow-hidden pt-1 pl-0.5">
              {list.covers.map((cover, index) => (
                <div 
                  key={index}
                  style={{ zIndex: index }}
                  className="w-14 h-20 shrink-0 rounded-md overflow-hidden border border-zinc-950 shadow-lg bg-zinc-900 transition-transform duration-300 ease-out group-hover:-translate-y-1"
                >
                  <img 
                    src={cover} 
                    alt="Game cover" 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Información de la Lista */}
            <div>
              <h4 className="font-bold text-base text-zinc-100 tracking-tight group-hover:text-primary transition-colors mb-1.5 line-clamp-1">
                {list.title}
              </h4>
              
              {/* Meta datos inferiores (Contador e Icono) */}
              <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium">
                {/* Icono de capas / listas apiladas */}
                <svg className="w-3.5 h-3.5 stroke-current fill-transparent" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 3-10 5 10 5 10-5-10-5Z"/>
                  <path d="m2 17 10 5 10-5"/>
                  <path d="m2 12 10 5 10-5"/>
                </svg>
                <span>{list.gamesCount} Juegos</span>
                <span className="text-zinc-700">·</span>
                <span>por {list.author}</span>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
