import React, { useState, useRef, useEffect } from 'react';

const game = {
    title: "Dark Souls III",
    img: "https://unsplash.com",
    rating: 4.8,
    logs: 12400,
    onLists: 3200,
    id: 1,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum et, corporis aut officiis hic deleniti sit unde ad alias ab natus! Ullam id asperiores illum incidunt eius rem inventore accusamus!",
    details: {
        studio: "FromSoftware",
        director: "Hidetaka Miyazaki",
        releaseDate: "2016-04-12",
        genres: ["Action", "RPG", "Adventure"],
        platforms: ["PC", "PlayStation 4", "Xbox One"]
    },
    reviews: [
      {
        user: "David Sur",
        game: "Dark Souls III",
        review: "Una experiencia desafiante y gratificante, con un mundo oscuro y atmosférico que te atrapa desde el primer momento.",
        rating: 5,
        timeAgo: "Hace 2 horas"
      },
      {
        user: "María López",
        game: "Dark Souls III",
        review: "Me encantó la historia y la jugabilidad, aunque a veces puede ser frustrante. ¡Totalmente recomendado para los amantes de los retos!",
        rating: 4.5,
        timeAgo: "Hace 5 horas"
      },
      {
        user: "Carlos Pérez",
        game: "Dark Souls III",
        review: "Un juego que exige paciencia y habilidad, pero la satisfacción de superar sus desafíos es incomparable.",
        rating: 4,
        timeAgo: "Hace 1 hora",
      }
    ]
}

export default function ColumnaCentro() {
    const tabs = [
        { id: 'details', label: 'Detalles' },
        { id: 'genres', label: 'Generos' },
        { id: 'platforms', label: 'Plataformas' }
    ];

    const [activeTabIdx, setActiveTabIdx] = useState(0);
    const selectedTab = tabs[activeTabIdx].id;

    // Estado para guardar las dimensiones físicas de la barra animada
    const [lineStyle, setLineStyle] = useState({ width: 0, left: 0 });
    
    // Referencias para enganchar los contenedores en el DOM
    const tabsContainerRef = useRef(null);
    const tabRefs = useRef([]);

    // Cada vez que cambia la pestaña, medimos su tamaño y posición real en píxeles
    useEffect(() => {
        const activeTabEl = tabRefs.current[activeTabIdx];
        const containerEl = tabsContainerRef.current;

        if (activeTabEl && containerEl) {
            const activeRect = activeTabEl.getBoundingClientRect();
            const containerRect = containerEl.getBoundingClientRect();

            // Calculamos la posición horizontal relativa al contenedor padre de las pestañas
            const leftOffset = activeRect.left - containerRect.left;

            setLineStyle({
                width: activeRect.width,
                left: leftOffset
            });
        }
    }, [activeTabIdx]);

    return (
        <section className="space-y-8 flex-1 min-w-0">
            {/* Encabezado e Info General */}
            <div>
                <div className="flex items-baseline gap-3 flex-wrap">
                    <h1 className="text-4xl font-mono font-black tracking-tight text-white">{game.title}</h1>
                    <span className="text-xl text-[color:var(--color-tertiary)] font-light">{game.details.releaseDate}</span>
                    <span className="text-xs text-[color:var(--color-tertiary)]">Dirigido por  <span className="text-white hover:underline cursor-pointer font-medium">{game.details.director}</span></span>
                </div>

                {/* Sinopsis */}
                <p className="mt-4 text-sm text-zinc-300 leading-relaxed font-light">
                    {game.description} <span className="text-[color:var(--color-tertiary)] hover:text-white cursor-pointer font-sm">Ver Más...</span>
                </p>
            </div>

            {/* Contenedor de Pestañas con Medición Dinámica */}
            <div className="border-t border-zinc-900 pt-4">
                <div 
                    ref={tabsContainerRef}
                    className="relative flex gap-4 text-xs font-bold uppercase tracking-wider text-[color:var(--color-tertiary)] border-b border-zinc-900 pb-2 mb-3"
                >
                    {/* BARRA ANIMADA: Ahora lee valores exactos en píxeles */}
                    <div 
                        className="absolute bottom-0 h-[2px] bg-[color:var(--color-primary)] transition-all duration-300 ease-out"
                        style={{
                            width: `${lineStyle.width}px`,
                            transform: `translateX(${lineStyle.left}px)`
                        }}
                    />

                    {tabs.map((tab, idx) => (
                        <span
                            key={tab.id}
                            ref={(el) => (tabRefs.current[idx] = el)} // Guarda la referencia de cada pestaña individual
                            className={`pb-2 cursor-pointer z-10 transition-colors duration-200 ${activeTabIdx === idx ? 'text-white' : 'hover:text-zinc-300'}`}
                            onClick={() => setActiveTabIdx(idx)}
                        >
                            {tab.label}
                        </span>
                    ))}
                </div>

                {/* Renderizado de Paneles */}
                <div className="min-h-[100px]">
                    {selectedTab === 'details' && (
                        <div className="text-xs grid grid-cols-[80px_1fr] gap-2 py-1">
                            <span className="text-[color:var(--color-tertiary)] uppercase tracking-wider text-[10px]">Director</span>
                            <span className="text-primary bg-primary/30 px-2 py-0.5 rounded self-start hover:bg-primary/15 cursor-pointer transition-colors transition-400">{game.details.director}</span>
                            <span className="text-[color:var(--color-tertiary)] uppercase tracking-wider text-[10px]">Estudio</span>
                            <span className="text-primary bg-primary/30 px-2 py-0.5 rounded self-start hover:bg-primary/15 cursor-pointer transition-colors transition-400">{game.details.studio}</span>
                            <span className="text-[color:var(--color-tertiary)] uppercase tracking-wider text-[10px]">Fecha de lanzamiento</span>
                            <span className="text-primary bg-primary/30 px-2 py-0.5 rounded self-start hover:bg-primary/15 cursor-pointer transition-colors transition-400">{game.details.releaseDate}</span>
                        </div>
                    )}
                    
                    {selectedTab === 'genres' && (
                        <div className="text-xs grid grid-cols-[80px_1fr] gap-2 py-1">
                            <span className="text-[color:var(--color-tertiary)] uppercase tracking-wider text-[10px] pt-0.5">Géneros</span>
                            <div className="flex flex-col gap-1.5 items-start">
                                {game.details.genres.map((genre, index) => (
                                    <span key={index} className="text-primary bg-primary/30 px-2 py-0.5 rounded hover:bg-primary/15 cursor-pointer transition-colors transition-400 text-xs">
                                        {genre}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {selectedTab === 'platforms' && (
                        <div className="text-xs grid grid-cols-[80px_1fr] gap-2 py-1">
                            <span className="text-[color:var(--color-tertiary)] uppercase tracking-wider text-[10px] pt-0.5">Platformas</span>
                            <div className="flex flex-col gap-1.5 items-start">
                                {game.details.platforms.map((platform, index) => (
                                    <span key={index} className="text-primary bg-primary/30 px-2 py-0.5 rounded hover:bg-primary/15 cursor-pointer transition-colors transition-400 text-xs">
                                        {platform}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Reseñas Recientes */}
            <div className="space-y-4">
                <div className="flex justify-between items-baseline border-b border-zinc-900 pb-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[color:var(--color-tertiary)]">Reviews Recientes</h3>
                    <span className="text-[10px] uppercase text-zinc-500 hover:text-white cursor-pointer">Ver Más</span>
                </div>

                {game.reviews.map((review, index) => (
                    <div key={index} className="border-b border-zinc-900/60 pb-4 space-y-2">
                        <div className="flex items-center gap-2 text-xs">
                            <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center font-bold text-black text-[10px]">{review.user.charAt(0)}</div>
                            <span className="text-zinc-400">Reseña por <span className="text-white font-bold hover:underline cursor-pointer">{review.user}</span></span>
                            <span className="text-[color:var(--color-primary)]">
                                {Array.from({ length: 5 }).map((_, s) => {
                                    const ratingValue = s + 1;
                                    const isFilled = ratingValue <= Math.floor(review.rating);
                                    const isHalf = ratingValue === Math.ceil(review.rating) && review.rating % 1 !== 0;
                                    return (
                                        <span key={s} className={`text-[color:var(--color-primary)] ${isFilled ? 'text-[color:var(--color-primary)]' : isHalf ? 'text-[color:var(--color-primary)]' : 'text-zinc-600'}`}>
                                            {isFilled ? '★' : isHalf ? '★' : '☆'}
                                        </span>
                                    );
                                })}
                            </span>
                        </div>
                        <p className="text-sm text-zinc-400 font-light">{review.review}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
