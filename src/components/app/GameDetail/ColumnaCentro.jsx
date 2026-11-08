import { useState, useRef, useEffect } from 'react';

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

const labelClass = "text-[color:var(--color-tertiary)] uppercase tracking-wider text-[10px]"
const chipClass = "text-primary bg-primary/15 border border-primary/20 px-2.5 py-1 rounded-sm"

export default function ColumnaCentro({ genres = [], platforms = [], studios = [], publishers = [], title, releaseDate, description }) {
    const tabs = [
        { id: 'details', label: 'Detalles' },
        { id: 'genres', label: 'Géneros' },
        { id: 'platforms', label: 'Plataformas' }
    ];

    const [activeTabIdx, setActiveTabIdx] = useState(0);
    const selectedTab = tabs[activeTabIdx].id;

    // Estado para guardar las dimensiones físicas de la barra animada
    const [lineStyle, setLineStyle] = useState({ width: 0, left: 0 });
    
    // Referencias para enganchar los contenedores en el DOM
    const tabsContainerRef = useRef(null);
    const tabRefs = useRef([]);

    // Mide la pestaña activa al cambiar de pestaña y cada vez que el contenedor cambia de tamaño
    useEffect(() => {
        const containerEl = tabsContainerRef.current;
        if (!containerEl) return;

        const measure = () => {
            const activeTabEl = tabRefs.current[activeTabIdx];
            if (!activeTabEl) return;
            const activeRect = activeTabEl.getBoundingClientRect();
            const containerRect = containerEl.getBoundingClientRect();
            setLineStyle({ width: activeRect.width, left: activeRect.left - containerRect.left });
        };

        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(containerEl);
        return () => observer.disconnect();
    }, [activeTabIdx]);

    // Se guarda para qué descripción está expandido, así al cambiar de juego vuelve a resumirse solo
    const [expandedFor, setExpandedFor] = useState(null);
    const isExpanded = expandedFor === description;
    const [isTruncated, setIsTruncated] = useState(false);
    const descriptionRef = useRef(null);

    // Con line-clamp el texto cortado tiene más alto de contenido que de caja visible
    useEffect(() => {
        const el = descriptionRef.current;
        if (!el || isExpanded) return;

        const check = () => setIsTruncated(el.scrollHeight > el.clientHeight + 1);
        check();
        const observer = new ResizeObserver(check);
        observer.observe(el);
        return () => observer.disconnect();
    }, [description, isExpanded]);

    return (
        <section className="space-y-8 flex-1 min-w-0">
            {/* Encabezado e Info General */}
            <div>
                <div className="flex items-baseline gap-3 flex-wrap">
                    <h1 className="text-4xl font-mono font-black tracking-tight text-white">{title}</h1>
                    <span className="text-xl text-[color:var(--color-tertiary)] font-light">{releaseDate}</span>
                    {studios.length > 0 && (
                        <span className="text-xs text-[color:var(--color-tertiary)]">Por <span className="text-white font-medium">{studios.join(", ")}</span></span>
                    )}
                </div>

                {/* Sinopsis */}
                {description && (
                    <div className="mt-4">
                        <p
                            ref={descriptionRef}
                            className={`text-sm text-zinc-300 leading-relaxed font-light ${isExpanded ? "" : "line-clamp-3"}`}
                        >
                            {description}
                        </p>
                        {(isTruncated || isExpanded) && (
                            <button
                                type="button"
                                onClick={() => setExpandedFor(isExpanded ? null : description)}
                                aria-expanded={isExpanded}
                                className="mt-1 text-xs font-semibold text-primary hover:underline cursor-pointer"
                            >
                                {isExpanded ? "Ver menos" : "Ver más"}
                            </button>
                        )}
                    </div>
                )}
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
                        <button
                            key={tab.id}
                            type="button"
                            role="tab"
                            aria-selected={activeTabIdx === idx}
                            ref={(el) => (tabRefs.current[idx] = el)} // Guarda la referencia de cada pestaña individual
                            className={`pb-2 cursor-pointer z-10 uppercase tracking-wider transition-colors duration-200 ${activeTabIdx === idx ? 'text-white' : 'hover:text-zinc-300'}`}
                            onClick={() => setActiveTabIdx(idx)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Renderizado de Paneles */}
                <div className="min-h-[100px]" role="tabpanel">
                    {selectedTab === 'details' && (
                        <div className="text-xs grid grid-cols-[110px_1fr] items-center gap-x-3 gap-y-3 py-1">
                            <span className={`${labelClass} pt-1`}>Estudio</span>
                            <div className="flex flex-wrap gap-2">
                                {studios.length > 0 ? studios.map((studio) => (
                                    <span key={studio} className={chipClass}>{studio}</span>
                                )) : <span className="text-tertiary">Sin datos</span>}
                            </div>
                            <span className={`${labelClass} pt-1`}>Distribuidora</span>
                            <div className="flex flex-wrap gap-2">
                                {publishers.length > 0 ? publishers.map((publisher) => (
                                    <span key={publisher} className={chipClass}>{publisher}</span>
                                )) : <span className="text-tertiary">Sin datos</span>}
                            </div>
                            <span className={labelClass}>Lanzamiento</span>
                            <div className="flex"><span className={chipClass}>{releaseDate || "Sin datos"}</span></div>
                        </div>
                    )}
                    
                    {selectedTab === 'genres' && (
                        <div className="text-xs grid grid-cols-[110px_1fr] gap-x-3 py-1">
                            <span className={`${labelClass} pt-1`}>Géneros</span>
                            <div className="flex flex-wrap gap-2">
                                {genres.length > 0 ? genres.map((genre) => (
                                    <span key={genre} className={chipClass}>{genre}</span>
                                )) : <span className="text-tertiary">Sin datos</span>}
                            </div>
                        </div>
                    )}

                    {selectedTab === 'platforms' && (
                        <div className="text-xs grid grid-cols-[110px_1fr] gap-x-3 py-1">
                            <span className={`${labelClass} pt-1`}>Plataformas</span>
                            <div className="flex flex-wrap gap-2">
                                {platforms.length > 0 ? platforms.map((platform) => (
                                    <span key={platform} className={chipClass}>{platform}</span>
                                )) : <span className="text-tertiary">Sin datos</span>}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Reseñas Recientes */}
            <div className="space-y-4">
                <div className="flex justify-between items-baseline border-b border-zinc-900 pb-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[color:var(--color-tertiary)]">Reviews Recientes</h3>
                    <span className="text-[10px] uppercase text-zinc-500">Ver Más</span>
                </div>

                {game.reviews.map((review, index) => (
                    <div key={index} className="border-b border-zinc-900/60 pb-4 space-y-2">
                        <div className="flex items-center gap-2 text-xs">
                            <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center font-bold text-black text-[10px]">{review.user.charAt(0)}</div>
                            <span className="text-zinc-400">Reseña por <span className="text-white font-bold">{review.user}</span></span>
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
