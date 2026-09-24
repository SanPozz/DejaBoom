import { ArrowUpRight } from 'lucide-react';
import minecraftCover from '../../assets/covers/minecraft_cover.png';
import eldenRingCover from '../../assets/covers/EldenRing_Cover.png';
import ds3Cover from '../../assets/covers/ds3_cover.png';
import isaacCover from '../../assets/covers/cover_isaac.png';

export default function GameDashboard() {
  const popularGames = [
    { id: 1, name: 'Dark Souls III', image: ds3Cover },
    { id: 2, name: 'Elden Ring', image: eldenRingCover },
    { id: 3, name: 'The Binding of Isaac', image: isaacCover },
    { id: 4, name: 'Minecraft', image: minecraftCover },
    { id: 5, name: 'Elden Ring', image: eldenRingCover },
    { id: 6, name: 'Dark Souls III', image: ds3Cover },
  ];

  const friendGames = [
    { id: 1, name: 'Elden Ring', image: eldenRingCover, initial: 'L', color: 'bg-cyan-500', stars: 5 },
    { id: 2, name: 'Minecraft', image: minecraftCover, initial: 'K', color: 'bg-teal-500', stars: 4 },
    { id: 3, name: 'Dark Souls III', image: ds3Cover, initial: 'M', color: 'bg-amber-500', stars: 4 },
    { id: 4, name: 'The Binding of Isaac', image: isaacCover, initial: 'T', color: 'bg-rose-500', stars: 4 },
    { id: 5, name: 'Minecraft', image: minecraftCover, initial: 'D', color: 'bg-yellow-500', stars: 5 },
    { id: 6, name: 'Elden Ring', image: eldenRingCover, initial: 'N', color: 'bg-emerald-500', stars: 5 },
  ];

  return (
    <section className="w-full bg-background text-secondary px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-10 font-sans select-none">
      <div className="max-w-6xl mx-auto space-y-10">
        <div>
          <div className="flex items-end justify-between gap-4 mb-5">
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase mb-1">Explora ahora</p>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-secondary">Populares esta semana</h3>
            </div>
            <a href="#" className="text-xs font-semibold text-zinc-400 hover:text-primary flex items-center gap-1 transition-colors shrink-0">
              Ver más <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {popularGames.map((game) => (
              <article key={game.id} className="group min-w-0 cursor-pointer">
                <div className="aspect-3/4 w-full rounded-xl overflow-hidden bg-zinc-900 border border-white/8 group-hover:border-primary/60 group-hover:ring-2 group-hover:ring-primary/10 transition-all duration-300">
                  <img src={game.image} alt={`Portada de ${game.name}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <h4 className="mt-2 text-sm font-bold text-zinc-200 truncate group-hover:text-primary transition-colors">{game.name}</h4>
              </article>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-end justify-between gap-4 mb-5">
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase mb-1">Tu círculo</p>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-secondary">Nueva actividad de amigos</h3>
            </div>
            <a href="#" className="text-xs font-semibold text-zinc-400 hover:text-primary flex items-center gap-1 transition-colors shrink-0">
              Ver más <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {friendGames.map((game) => (
              <article key={game.id} className="group min-w-0 cursor-pointer">
                <div className="aspect-3/4 w-full rounded-xl overflow-hidden bg-zinc-900 border border-white/8 group-hover:border-primary/60 group-hover:ring-2 group-hover:ring-primary/10 transition-all duration-300">
                  <img src={game.image} alt={`Portada de ${game.name}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <h4 className="mt-2 text-sm font-bold text-zinc-200 truncate group-hover:text-primary transition-colors">{game.name}</h4>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className={`w-5 h-5 rounded-full ${game.color} flex items-center justify-center text-[10px] font-black text-black shrink-0`}>{game.initial}</div>
                  <div className="flex text-[11px] tracking-tight" aria-label={`${game.stars} de 5 estrellas`}>
                    {[...Array(5)].map((_, i) => <span key={i} className={i < game.stars ? 'text-primary' : 'text-zinc-700'}>★</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
