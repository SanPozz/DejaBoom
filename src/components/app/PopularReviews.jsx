import { ArrowUpRight, Heart, MessageCircle } from 'lucide-react';
import ds3Cover from '../../assets/covers/ds3_cover.png';
import eldenRingCover from '../../assets/covers/EldenRing_Cover.png';
import minecraftCover from '../../assets/covers/minecraft_cover.png';

export default function PopularReviews() {
  const reviews = [
    {
      id: 1,
      title: "Dark Souls",
      year: "2025",
      image: ds3Cover,
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
      image: eldenRingCover,
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
      image: minecraftCover,
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
    <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-12 bg-background text-secondary font-sans select-none">
      <div className="max-w-6xl mx-auto">
      
      {/* Encabezado de la sección */}
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <p className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase mb-1">La comunidad opina</p>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-secondary">
            Reseñas populares
          </h3>
        </div>
        <a href="#" className="text-xs font-semibold text-zinc-400 hover:text-primary flex items-center gap-1 transition-colors shrink-0">
          Ver más <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Lista de Reseñas */}
      <div className="space-y-3">
        {reviews.map((review) => (
          <div 
            key={review.id} 
            className="group flex flex-col sm:flex-row gap-5 sm:gap-5 bg-background-secondary border border-white/[0.07] rounded-2xl p-5 sm:p-5 hover:border-primary/35 hover:bg-[#10161b] transition-all duration-300"
          >
            {/* Imagen del Juego con Zoom en Hover */}
            <div className="w-full h-56 sm:aspect-3/4 sm:w-24 md:w-28 sm:h-32 md:h-36 shrink-0 rounded-xl overflow-hidden border border-white/8 bg-zinc-900">
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
                <div className="flex items-baseline gap-2 mb-2 flex-wrap">
                  <h4 className="text-xl sm:text-xl font-black tracking-tight text-white group-hover:text-primary transition-colors duration-300">
                    {review.title}
                  </h4>
                  <span className="text-[11px] font-bold text-tertiary/60 border border-white/8 rounded-full px-2 py-0.5">
                    {review.year}
                  </span>
                </div>

                {/* Fila del Usuario y Calificación */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  {/* Avatar Circular */}
                  <div className={`w-6 h-6 rounded-full ${review.avatarColor} flex items-center justify-center text-[11px] font-black text-black shrink-0 ring-2 ring-background-secondary`}>
                    {review.initial}
                  </div>
                  {/* Nombre de Usuario */}
                  <span className="text-sm sm:text-sm font-bold text-secondary/80">
                    {review.user}
                  </span>
                  {/* Estrellas */}
                  <div className="flex text-xs tracking-tight ml-1 bg-background px-2 py-1 rounded-full">
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
                <p className="text-sm sm:text-sm text-tertiary/90 leading-relaxed max-w-3xl line-clamp-4 lg:line-clamp-2">
                  {review.comment}
                </p>
              </div>

              {/* Botones de Interacción Inferiores (Likes y Respuestas) */}
              <div className="flex items-center gap-4 text-xs font-semibold text-tertiary mt-4 pt-3 border-t border-white/6 flex-wrap">
                {/* Corazón / Likes */}
                <button className="flex items-center gap-1.5 hover:text-rose-400 transition-colors group/btn">
                  <Heart className="w-4 h-4 group-hover/btn:fill-rose-400/20 transition-all" />
                  <span>{review.likes}</span>
                </button>

                {/* Globo de Diálogo / Comentarios */}
                <button className="flex items-center gap-1.5 hover:text-primary transition-colors group/btn">
                  <MessageCircle className="w-4 h-4 group-hover/btn:fill-primary/10 transition-all" />
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
