import React from 'react';

export default function GameOfTheWeek() {
  return (
    // CONTENEDOR PRINCIPAL: Centra todo horizontal y verticalmente en la pantalla
    <div className="w-full bg-background flex items-center justify-center py-6 sm:py-8 md:py-10 px-3 sm:px-4 md:px-6">
      
      {/* Tarjeta del Juego */}
      <div className="w-full max-w-4xl bg-background-secondary border border-tertiary/15 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 items-start font-sans text-white select-none relative overflow-hidden">
        
        {/* Background con gradientes y blur */}
        <div 
          className="absolute inset-0 rounded-xl"
          style={{
            background: 'radial-gradient(circle at 20% 30%, rgba(103,228,91,0.16) 0%, rgba(103,228,91,0.08) 18%, rgba(103,228,91,0.03) 38%, rgba(103,228,91,0.01) 60%, transparent 80%), radial-gradient(circle at 80% 70%, rgba(103,228,91,0.12) 0%, rgba(103,228,91,0.05) 20%, rgba(103,228,91,0.02) 40%, transparent 70%)',
            filter: 'blur(18px)',
            pointerEvents: 'none'
          }}
        ></div>

        {/* Contenido */}
        <div className="relative z-10 w-full flex flex-col sm:flex-row gap-6 items-start">
        
        {/* Imagen de Portada */}
        <div className="w-full sm:w-32 md:w-36 lg:w-40 h-40 sm:h-44 md:h-48 lg:h-52 shrink-0 rounded-md sm:rounded-lg overflow-hidden border border-tertiary/15 shadow-md">
          <img 
            src="https://unsplash.com" 
            alt="Game Cover" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Contenido de Texto */}
        <div className="flex-1 min-w-0">
          <span className="text-primary font-extrabold text-xs sm:text-xs md:text-sm tracking-wider uppercase block mb-1">
            Juego de la semana
          </span>
          
          <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-secondary mb-2">
            Dark Souls III
          </h2>

          {/* Calificación y Logs */}
          <div className="flex items-center gap-1 sm:gap-2 mb-3 sm:mb-4 flex-wrap">
            <div className="flex text-primary text-xs sm:text-sm">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>
            <span className="text-tertiary text-xs sm:text-sm font-medium">4.8</span>
            <span className="text-tertiary/10 text-xs sm:text-sm font-medium">·</span>
            <span className="text-tertiary/40 text-xs sm:text-sm font-medium">12.4K logs</span>
          </div>

          {/* Descripción */}
          <p className="text-tertiary text-xs sm:text-sm md:text-base leading-relaxed max-w-xl line-clamp-3 sm:line-clamp-2 md:line-clamp-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum et, corporis aut officiis hic deleniti sit unde ad alias ab natus! Ullam id asperiores illum incidunt eius rem inventore accusamus!
          </p>
        </div>
        </div>

      </div>

    </div>
  );
}
