import { ArrowUpRight, Layers3 } from 'lucide-react';
import minecraftCover from '../../assets/covers/minecraft_cover.png';
import eldenRingCover from '../../assets/covers/EldenRing_Cover.png';
import ds3Cover from '../../assets/covers/ds3_cover.png';
import isaacCover from '../../assets/covers/cover_isaac.png';

export default function PopularLists() {
  const lists = [
    {
      id: 1,
      title: "Los mejores Soulslike",
      gamesCount: 24,
      author: "Pablo",
      covers: [
        ds3Cover,
        eldenRingCover,
        isaacCover,
        minecraftCover,
      ]
    },
    {
      id: 2,
      title: "Juegos para dias lluviosos",
      gamesCount: 18,
      author: "Gonzalo",
      covers: [
        minecraftCover,
        isaacCover,
        eldenRingCover,
        ds3Cover,
      ]
    },
    {
      id: 3,
      title: "Juegos cooperativos para jugar con tu mejor amigo",
      gamesCount: 12,
      author: "Maria",
      covers: [
        isaacCover,
        minecraftCover,
        ds3Cover,
        eldenRingCover,
      ]
    }
  ];

  return (
    <section className="w-full bg-background text-white px-4 sm:px-8 lg:px-12 xl:px-16 pb-12 font-sans select-none">
      
      {/* Encabezado */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between gap-4 mb-5">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase mb-1">Descubre</p>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-secondary">
              Listas populares
            </h3>
          </div>
          <a href="#" className="text-xs font-semibold text-zinc-400 hover:text-primary flex items-center gap-1 transition-colors shrink-0">
            Ver más <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
          {lists.map((list) => (
            <article
              key={list.id}
              className="group bg-background-secondary border border-white/[0.07] rounded-2xl p-5 sm:p-4 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="flex gap-4 mb-5">
                <div className="flex -space-x-8 pl-1 pt-1 min-w-33 h-27 sm:h-23">
                  {list.covers.map((cover, index) => (
                    <div
                      key={index}
                      style={{ zIndex: list.covers.length - index, transform: `rotate(${(index - 1.5) * 3}deg)` }}
                      className="w-16 h-24 sm:w-14 sm:h-20 shrink-0 rounded-lg overflow-hidden border-2 border-background-secondary shadow-xl bg-zinc-900 group-hover:-translate-y-1 transition-transform duration-300"
                    >
                      <img src={cover} alt="Portada de videojuego" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="pt-1 min-w-0">
                  <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Colección</span>
                  <h4 className="font-bold text-lg sm:text-base leading-snug text-zinc-100 group-hover:text-primary transition-colors line-clamp-2 mt-1">
                    {list.title}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 sm:pt-3 border-t border-white/6 text-sm sm:text-xs text-zinc-500 font-medium">
                <Layers3 className="w-3.5 h-3.5 text-primary/80" />
                <span>{list.gamesCount} juegos</span>
                <span className="text-zinc-700">|</span>
                <span>por {list.author}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
