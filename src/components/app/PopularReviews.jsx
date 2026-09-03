import React from 'react';

export default function PopularReviews() {
  const reviews = [
    {
      id: 1,
      title: "Dark Souls",
      year: "2025",
      image: "https://images.unsplash.com",
      user: "Nova",
      initial: "N",
      avatarColor: "bg-emerald-500",
      stars: 5,
      comment: "Una obra maestra brutal. Cada jefe se ganó su lugar en mis pesadillas. Sesenta horas invertidas y empezaría de nuevo mañana sin dudarlo.",
      likes: 412,
      replies: 38
    },
    {
      id: 2,
      title: "Shadow Realm",
      year: "2023",
      image: "https://images.unsplash.com",
      user: "Lena",
      initial: "L",
      avatarColor: "bg-cyan-500",
      stars: 5,
      comment: "Fácilmente mi juego del año. El diseño del mundo no tiene rival y la historia se quedó conmigo mucho después de que pasaran los créditos",
      likes: 287,
      replies: 24
    },
    {
      id: 3,
      title: "Star Drift",
      year: "2024",
      image: "https://images.unsplash.com",
      user: "Kai",
      initial: "K",
      avatarColor: "bg-teal-500",
      stars: 4,
      comment: "Logró un cierre perfecto con el final. La exploración nunca aburrió y la banda sonora ahora vive en mi cabeza sin pagar alquiler",
      likes: 196,
      replies: 17
    }
  ];

  return (
    <section className="w-full px-4 sm:px-8 lg:px-16 py-10 sm:py-12 bg-background text-secondary font-sans select-none">
      <div className="max-w-6xl mx-auto space-y-4">
      
      {/* Encabezado de la sección */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <h3 className="text-xs font-bold tracking-wider text-zinc-400 uppercase">
          Reseñas populares de la semana
        </h3>
        <a href="#" className="text-xs text-zinc-500 hover:text-secondary flex items-center gap-1 transition-colors">
          More <span className="text-[10px]">&gt;</span>
        </a>
      </div>

      {/* Lista de Reseñas */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div 
            key={review.id} 
            className="group flex flex-col sm:flex-row gap-4 sm:gap-5 bg-background-secondary border border-tertiary/15 rounded-xl p-4 sm:p-5 hover:border-tertiary/50 transition-all duration-200"
          >
            {/* Imagen del Juego con Zoom en Hover */}
            <div className="w-full h-44 sm:w-24 sm:h-32 md:w-28 md:h-36 shrink-0 rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900">
              <img 
                src={review.image} 
                alt={review.title} 
                className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105" 
              />
            </div>

            {/* Contenido Informativo */}
            <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
              <div>
                {/* Título y Año */}
                <div className="flex items-baseline gap-2 mb-1.5 flex-wrap">
                  <h4 className="text-base sm:text-lg font-black tracking-tight text-white group-hover:text-primary transition-colors duration-300">
                    {review.title}
                  </h4>
                  <span className="text-xs font-medium text-tertiary/60">
                    {review.year}
                  </span>
                </div>

                {/* Fila del Usuario y Calificación */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  {/* Avatar Circular */}
                  <div className={`w-5 h-5 rounded-full ${review.avatarColor} flex items-center justify-center text-[11px] font-black text-black shrink-0`}>
                    {review.initial}
                  </div>
                  {/* Nombre de Usuario */}
                  <span className="text-xs sm:text-sm font-bold text-secondary/70">
                    {review.user}
                  </span>
                  {/* Estrellas */}
                  <div className="flex text-xs tracking-tight ml-1">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={i < review.stars ? 'text-primary' : 'text-tertiary/15'}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                {/* Texto de la Reseña */}
                <p className="text-tertiary/90 text-xs sm:text-sm leading-relaxed max-w-3xl line-clamp-3 sm:line-clamp-2 lg:line-clamp-none">
                  {review.comment}
                </p>
              </div>

              {/* Botones de Interacción Inferiores (Likes y Respuestas) */}
              <div className="flex items-center gap-4 text-xs font-semibold text-tertiary mt-4 flex-wrap">
                {/* Corazón / Likes */}
                <button className="flex items-center gap-1.5 hover:text-rose-500 transition-colors group/btn">
                  <svg className="w-4 h-4 stroke-current fill-transparent group-hover/btn:fill-rose-500/20 transition-all" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                  </svg>
                  <span>{review.likes}</span>
                </button>

                {/* Globo de Diálogo / Comentarios */}
                <button className="flex items-center gap-1.5 hover:text-primary transition-colors group/btn">
                  <svg className="w-4 h-4 stroke-current fill-transparent group-hover/btn:fill-cyan-400/10 transition-all" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                  <span>{review.replies}</span>
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      </div>

    </section>
  );
}
