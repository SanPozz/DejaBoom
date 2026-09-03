import { ArrowLeft, Bookmark, CalendarClock, Gamepad2, Sparkles } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import Sidebar from "../components/app/Sidebar"
import SearchBar from "../components/app/SearchBar"
import ListItem from "../components/app/ListItem"

const listDetails = [
  {
    id: 1,
    title: "Juegos que me hicieron llorar",
    description: "Títulos con historias que se quedan contigo días después.",
    visibility: "Pública",
    mood: "Emocionales",
    author: "Tú",
    createdAt: "12 de noviembre",
    covers: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1528819622761-bec1b7a8d4f8?auto=format&fit=crop&w=800&q=80",
    ],
    games: [
      { id: 101, title: "The Last of Us Part II", platform: "PS5", score: 9.5, communityRating: 4.8, cover: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80" },
      { id: 102, title: "Life is Strange", platform: "PC", score: 9.2, communityRating: 4.7, cover: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80" },
      { id: 103, title: "Red Dead Redemption 2", platform: "PS5", score: 9.8, communityRating: 4.9, cover: "https://images.unsplash.com/photo-1526509867162-5f2ca1d7d460?auto=format&fit=crop&w=800&q=80" },
      { id: 104, title: "Celeste", platform: "Switch", score: 9.4, communityRating: 4.8, cover: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80" },
      { id: 105, title: "Kentucky Route Zero", platform: "PC", score: 8.9, communityRating: 4.6, cover: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=800&q=80" },
      { id: 106, title: "Journey", platform: "PS5", score: 9.1, communityRating: 4.7, cover: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80" },
    ],
  },
  {
    id: 2,
    title: "100% recomendado",
    description: "Los mejores juegos para sugerirle a cualquiera en una charla.",
    visibility: "Pública",
    mood: "Clásicos",
    author: "Tú",
    createdAt: "24 de octubre",
    covers: [
      "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526509867162-5f2ca1d7d460?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592155931584-901ac15763e3?auto=format&fit=crop&w=800&q=80",
    ],
    games: [
      { id: 201, title: "Portal 2", platform: "PC", score: 9.7, communityRating: 4.9, cover: "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?auto=format&fit=crop&w=800&q=80" },
      { id: 202, title: "Half-Life 2", platform: "PC", score: 9.6, communityRating: 4.8, cover: "https://images.unsplash.com/photo-1526509867162-5f2ca1d7d460?auto=format&fit=crop&w=800&q=80" },
      { id: 203, title: "Bioshock Infinite", platform: "PC", score: 9.0, communityRating: 4.6, cover: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80" },
      { id: 204, title: "Hades", platform: "PC", score: 9.5, communityRating: 4.9, cover: "https://images.unsplash.com/photo-1592155931584-901ac15763e3?auto=format&fit=crop&w=800&q=80" },
      { id: 205, title: "Stardew Valley", platform: "PC", score: 9.3, communityRating: 4.7, cover: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80" },
      { id: 206, title: "Symphony", platform: "PC", score: 8.8, communityRating: 4.4, cover: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=800&q=80" },
    ],
  },
  {
    id: 3,
    title: "Para jugar en la noche",
    description: "La mejor selección para tardes largas, calma y buena música.",
    visibility: "Privada",
    mood: "Relax",
    author: "Tú",
    createdAt: "5 de septiembre",
    covers: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518655048521-f130df041f66?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    ],
    games: [
      { id: 301, title: "Animal Crossing", platform: "Switch", score: 9.2, communityRating: 4.8, cover: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80" },
      { id: 302, title: "Unpacking", platform: "PC", score: 8.9, communityRating: 4.7, cover: "https://images.unsplash.com/photo-1518655048521-f130df041f66?auto=format&fit=crop&w=800&q=80" },
      { id: 303, title: "A Short Hike", platform: "PC", score: 8.7, communityRating: 4.5, cover: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80" },
      { id: 304, title: "Spiritfarer", platform: "PC", score: 9.0, communityRating: 4.8, cover: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80" },
      { id: 305, title: "Dorfromantik", platform: "PC", score: 8.8, communityRating: 4.6, cover: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80" },
      { id: 306, title: "Sable", platform: "PC", score: 9.1, communityRating: 4.7, cover: "https://images.unsplash.com/photo-1528819622761-bec1b7a8d4f8?auto=format&fit=crop&w=800&q=80" },
    ],
  },
]

const ListDetail = () => {
  const { id } = useParams()
  const list = listDetails.find((item) => String(item.id) === String(id))

  if (!list) {
    return (
      <div className="flex w-full min-h-screen bg-background text-secondary">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-tertiary mb-3">Lista no encontrada</p>
            <Link to="/lists" className="text-primary font-bold underline underline-offset-4">
              Volver a mis listas
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full min-h-screen bg-background text-secondary">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-30 bg-background/90 backdrop-blur-xl border-b border-tertiary/10">
          <SearchBar />
        </header>

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <Link to="/lists" className="inline-flex items-center gap-2 text-sm text-tertiary hover:text-primary transition-colors">
                <ArrowLeft size={16} />
                Volver a listas
              </Link>
            </div>

            <section className="rounded-3xl border border-tertiary/15 bg-background-secondary overflow-hidden mb-8 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
              <div className="relative h-56 sm:h-72 w-full overflow-hidden">
                <img src={list.covers[0]} alt={list.title} className="w-full h-full object-cover scale-[1.03]" />
                <div className="absolute inset-0 bg-linear-to-r from-black via-black/75 to-black/30" />
                <div className="absolute inset-0 flex items-end p-6 sm:p-8">
                  <div className="max-w-2xl">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary mb-3">
                      {list.visibility}
                    </p>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
                      {list.title}
                    </h1>
                    <p className="text-sm sm:text-base text-zinc-200 max-w-xl leading-relaxed">
                      {list.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 sm:p-6">
                <div className="rounded-2xl border border-tertiary/15 bg-background/80 p-4">
                  <div className="flex items-center gap-2 text-tertiary mb-2">
                    <Gamepad2 size={16} className="text-primary" />
                    <span className="text-[10px] uppercase tracking-[0.18em]">Juegos</span>
                  </div>
                  <p className="text-2xl font-bold text-secondary">{list.games.length}</p>
                </div>

                <div className="rounded-2xl border border-tertiary/15 bg-background/80 p-4">
                  <div className="flex items-center gap-2 text-tertiary mb-2">
                    <Sparkles size={16} className="text-primary" />
                    <span className="text-[10px] uppercase tracking-[0.18em]">Mood</span>
                  </div>
                  <p className="text-xl font-bold text-secondary">{list.mood}</p>
                </div>

                <div className="rounded-2xl border border-tertiary/15 bg-background/80 p-4">
                  <div className="flex items-center gap-2 text-tertiary mb-2">
                    <CalendarClock size={16} className="text-primary" />
                    <span className="text-[10px] uppercase tracking-[0.18em]">Creada</span>
                  </div>
                  <p className="text-xl font-bold text-secondary">{list.createdAt}</p>
                </div>
              </div>
            </section>

            <section className="mb-6 flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-tertiary">Lista de {list.author}</p>
              </div>

              <button className="inline-flex items-center gap-2 bg-primary text-black font-bold px-4 py-2.5 rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
                <Bookmark size={16} />
                Guardar lista
              </button>
            </section>

            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
              {list.games.map((game) => (
                <ListItem key={game.id} game={game} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default ListDetail
