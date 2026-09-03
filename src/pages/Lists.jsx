import React from "react"
import { BookmarkPlus, Check, Gamepad2, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"
import Sidebar from "../components/app/Sidebar"
import SearchBar from "../components/app/SearchBar"

const myLists = [
  {
    id: 1,
    title: "Juegos que me hicieron llorar",
    description: "Títulos con historias que se quedan contigo días después.",
    count: 12,
    author: "Tú",
    visibility: "Pública",
    mood: "Emocionales",
    covers: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1528819622761-bec1b7a8d4f8?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: 2,
    title: "100% recomendado",
    description: "Los mejores juegos para sugerirle a cualquiera en una charla.",
    count: 18,
    author: "Tú",
    visibility: "Pública",
    mood: "Clásicos",
    covers: [
      "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526509867162-5f2ca1d7d460?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592155931584-901ac15763e3?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: 3,
    title: "Para jugar en la noche",
    description: "La mejor selección para tardes largas, calma y buena música.",
    count: 9,
    author: "Tú",
    visibility: "Privada",
    mood: "Relax",
    covers: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518655048521-f130df041f66?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: 4,
    title: "GOTY candidates",
    description: "Mis apuestas para el mejor juego del año según lo que he probado.",
    count: 15,
    author: "Tú",
    visibility: "Pública",
    mood: "Nuevos lanzamientos",
    covers: [
      "https://images.unsplash.com/photo-1528819622761-bec1b7a8d4f8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: 5,
    title: "Compañeros de co-op",
    description: "Juegos perfectos para jugar con amigos y compartir sesiones largas.",
    count: 11,
    author: "Tú",
    visibility: "Pública",
    mood: "Cooperativos",
    covers: [
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526509867162-5f2ca1d7d460?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: 6,
    title: "RPGs que cambiarán tu vida",
    description: "Historias largas, decisiones importantes y mundos enormes.",
    count: 20,
    author: "Tú",
    visibility: "Pública",
    mood: "RPG",
    covers: [
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1528819622761-bec1b7a8d4f8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592155931584-901ac15763e3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
    ],
  },
]

const filters = ["Todas", "Públicas", "Privadas", "Favoritas"]

const Lists = () => {
  return (
    <div className="flex w-full min-h-screen bg-background text-secondary">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-30 bg-background/90 backdrop-blur-xl border-b border-tertiary/10">
          <SearchBar />
        </header>

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-tertiary mb-2">
                  Biblioteca
                </p>
                <h1 className="text-3xl sm:text-4xl font-bold text-secondary">Mis Listas</h1>
              </div>

              <button className="inline-flex items-center justify-center gap-2 bg-primary text-black font-bold px-4 py-2.5 rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
                <BookmarkPlus size={18} />
                Nueva lista
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-background-secondary border border-tertiary/15 rounded-2xl p-5">
                <div className="flex items-center gap-3 text-tertiary mb-3">
                  <Gamepad2 size={18} className="text-primary" />
                  <span className="text-xs uppercase tracking-[0.18em]">Total</span>
                </div>
                <p className="text-3xl font-bold text-secondary">{myLists.length}</p>
                <p className="text-sm text-tertiary mt-1">listas creadas</p>
              </div>

              <div className="bg-background-secondary border border-tertiary/15 rounded-2xl p-5">
                <div className="flex items-center gap-3 text-tertiary mb-3">
                  <Check size={18} className="text-primary" />
                  <span className="text-xs uppercase tracking-[0.18em]">Completadas</span>
                </div>
                <p className="text-3xl font-bold text-secondary">84</p>
                <p className="text-sm text-tertiary mt-1">juegos marcados</p>
              </div>

              <div className="bg-background-secondary border border-tertiary/15 rounded-2xl p-5">
                <div className="flex items-center gap-3 text-tertiary mb-3">
                  <Sparkles size={18} className="text-primary" />
                  <span className="text-xs uppercase tracking-[0.18em]">Favoritas</span>
                </div>
                <p className="text-3xl font-bold text-secondary">6</p>
                <p className="text-sm text-tertiary mt-1">listas destacadas</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {filters.map((filter, index) => (
                <button
                  key={filter}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.14em] border transition-all ${
                    index === 0
                      ? "bg-primary text-black border-primary"
                      : "border-tertiary/20 text-tertiary hover:border-primary/40 hover:text-secondary"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {myLists.map((list) => (
                <article
                  key={list.id}
                  className="group bg-background-secondary border border-tertiary/15 rounded-2xl overflow-hidden hover:border-primary/35 transition-all duration-300"
                >
                  <div className="flex items-center justify-between px-4 pt-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-tertiary">
                      {list.visibility}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
                      {list.mood}
                    </span>
                  </div>

                  <div className="px-4 pb-3 pt-3">
                    <div className="flex -space-x-4 mb-4 overflow-hidden">
                      {list.covers.map((cover, index) => (
                        <div
                          key={`${list.id}-${index}`}
                          className="w-16 h-20 rounded-lg overflow-hidden border-2 border-background-secondary ring-1 ring-white/5 shadow-lg shrink-0"
                          style={{ zIndex: list.covers.length - index }}
                        >
                          <img src={cover} alt={list.title} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>

                    <h2 className="text-xl font-bold text-secondary group-hover:text-primary transition-colors line-clamp-2 min-h-[3.2rem]">
                      {list.title}
                    </h2>
                    <p className="text-sm text-tertiary mt-2 leading-relaxed line-clamp-2 min-h-10">
                      {list.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between px-4 pb-4 pt-1">
                    <div>
                      <p className="text-xs text-tertiary">por {list.author}</p>
                      <p className="text-xs font-medium text-secondary mt-1">{list.count} juegos</p>
                    </div>

                    <Link
                      to={`/lists/${list.id}`}
                      className="text-xs font-bold uppercase tracking-[0.14em] text-primary hover:text-white transition-colors"
                    >
                      Ver lista
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Lists
