import { useState } from "react"
import { ArrowLeft, Check, Gamepad2, Plus, Search, Trash2 } from "lucide-react"
import { Link, useNavigate, useParams } from "react-router-dom"
import Sidebar from "../components/app/Sidebar"
import SearchBar from "../components/app/SearchBar"
import { getSavedLists, saveList } from "../utils/listsStorage"
import { gameCatalog, listEditorSeeds } from "../data/listEditorData"

const catalogGames = gameCatalog

const getInitialList = (id) => {
  if (!id) {
    return { title: "", description: "", games: [], author: "Tú", visibility: "Privada" }
  }

  const savedList = getSavedLists().find((list) => String(list.id) === String(id))
  const summary = listEditorSeeds.find((list) => String(list.id) === String(id))

  if (savedList) return savedList
  if (!summary) return null
  return summary
}

const ListForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [list, setList] = useState(() => getInitialList(id))
  const [query, setQuery] = useState("")
  const [selectedQuery, setSelectedQuery] = useState("")
  const isEditing = Boolean(id)
  const matchingGames = catalogGames.filter((game) =>
    `${game.title} ${game.platform}`.toLowerCase().includes(query.trim().toLowerCase())
  )
  const selectedGames = list?.games.filter((game) =>
    `${game.title} ${game.platform}`.toLowerCase().includes(selectedQuery.trim().toLowerCase())
  ) ?? []

  const addGame = (game) => {
    setList((current) => ({
      ...current,
      games: current.games.some((item) => item.id === game.id)
        ? current.games
        : [...current.games, game],
    }))
  }

  const removeGame = (gameId) => {
    setList((current) => ({ ...current, games: current.games.filter((game) => game.id !== gameId) }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const savedList = saveList({
      ...list,
      title: list.title.trim(),
      description: list.description.trim(),
      createdAt: list.createdAt ?? new Date().toLocaleDateString("es", { day: "numeric", month: "long" }),
    })
    navigate(`/lists/${savedList.id}`)
  }

  if (!list) {
    return (
      <div className="flex min-h-screen w-full bg-background text-secondary">
        <Sidebar />
        <main className="flex flex-1 items-center justify-center px-6">
          <div className="text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-tertiary">Lista no encontrada</p>
            <Link to="/lists" className="font-bold text-primary underline underline-offset-4">Volver a mis listas</Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full bg-background text-secondary">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-tertiary/10 bg-background/90 backdrop-blur-xl">
          <SearchBar />
        </header>

        <main className="flex-1 px-4 py-8 pb-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <Link to={isEditing ? `/lists/${id}` : "/lists"} className="mb-6 inline-flex items-center gap-2 text-sm text-tertiary transition-colors hover:text-primary">
              <ArrowLeft size={16} />
              {isEditing ? "Volver a la lista" : "Volver a mis listas"}
            </Link>

            <div className="mb-8">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">Biblioteca</p>
              <h1 className="text-3xl font-bold text-secondary sm:text-4xl">
                {isEditing ? "Editar lista" : "Crear una lista"}
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <section className="grid gap-5 border-y border-primary/20 py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-secondary">Título</span>
                  <input
                    autoFocus
                    required
                    maxLength={80}
                    value={list.title}
                    onChange={(event) => setList({ ...list, title: event.target.value })}
                    placeholder="Ej. Aventuras para perderse"
                    className="w-full rounded-lg border border-primary/25 bg-background-secondary px-4 py-3 text-sm text-secondary outline-none transition focus:border-primary"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-secondary">Descripción</span>
                  <textarea
                    rows={3}
                    maxLength={300}
                    value={list.description}
                    onChange={(event) => setList({ ...list, description: event.target.value })}
                    placeholder="¿Qué tienen en común estos juegos?"
                    className="w-full resize-y rounded-lg border border-primary/25 bg-background-secondary px-4 py-3 text-sm text-secondary outline-none transition focus:border-primary"
                  />
                </label>
              </section>

              <section className="rounded-xl border border-primary/25 bg-background-secondary p-4 sm:p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-lg font-bold">Juegos de la lista</h2>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <p className="text-sm text-tertiary">{list.games.length} en la lista</p>
                    {list.games.length > 0 && (
                      <label className="relative block w-full sm:w-64">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-tertiary" />
                        <input
                          type="search"
                          value={selectedQuery}
                          onChange={(event) => setSelectedQuery(event.target.value)}
                          placeholder="Buscar para quitar"
                          aria-label="Buscar juego para quitar"
                          className="w-full rounded-lg border border-primary/25 bg-background py-2 pl-9 pr-3 text-sm text-secondary outline-none transition focus:border-primary"
                        />
                      </label>
                    )}
                  </div>
                </div>

                {list.games.length > 0 ? (
                  <div className="list-games-scrollbar mt-4 max-h-72 overflow-y-auto rounded-lg border border-primary/20 bg-background p-2 sm:p-3" role="region" aria-label="Juegos seleccionados" tabIndex={0}>
                    {selectedGames.map((game) => (
                      <div key={game.id} className="flex min-w-0 items-center gap-3 border-b border-primary/10 px-2 py-2.5 last:border-b-0">
                        <div className="relative grid h-12 w-10 shrink-0 place-items-center overflow-hidden rounded bg-background-secondary">
                          <Gamepad2 size={18} className="absolute text-tertiary" />
                          <img src={game.cover} alt="" onError={(event) => event.currentTarget.classList.add("hidden")} className="relative h-full w-full rounded object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold leading-snug text-secondary">{game.title}</p>
                          <p className="mt-1 text-xs text-tertiary">{game.platform}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeGame(game.id)}
                          aria-label={`Quitar ${game.title} de la lista`}
                          className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-md border border-primary/20 text-tertiary transition hover:border-rose-400/50 hover:text-rose-400"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    {selectedGames.length === 0 && <p className="px-2 py-6 text-sm text-tertiary">No hay juegos que coincidan con la búsqueda.</p>}
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-tertiary">Busca un juego y agrégalo a tu lista.</p>
                )}

                <div className="mt-4 rounded-lg border border-primary/30 bg-primary/5 p-3 sm:p-4">
                  <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-primary">Agregar desde el catálogo</h3>
                      <p className="mt-1 text-xs text-primary/70">{matchingGames.length} juegos disponibles</p>
                    </div>
                    <label className="relative block w-full sm:max-w-sm sm:flex-1">
                      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/70" />
                      <input
                        type="search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Buscar juegos"
                        aria-label="Buscar juegos para agregar"
                        className="w-full rounded-lg border border-primary/25 bg-background-secondary py-2.5 pl-9 pr-3 text-sm text-secondary outline-none transition focus:border-primary"
                      />
                    </label>
                  </div>

                  <div className="list-games-scrollbar max-h-72 overflow-y-auto" role="region" aria-label="Catálogo de juegos" tabIndex={0}>
                    {matchingGames.map((game) => {
                      const alreadyAdded = list.games.some((item) => item.id === game.id)
                      return (
                        <div key={game.id} className="flex min-w-0 items-center gap-3 border-b border-primary/10 px-2 py-2.5 transition-colors last:border-b-0 hover:bg-primary/5">
                          <div className="relative grid h-14 w-11 shrink-0 place-items-center overflow-hidden rounded bg-background-secondary">
                            <Gamepad2 size={18} className="absolute text-tertiary" />
                            <img src={game.cover} alt="" onError={(event) => event.currentTarget.classList.add("hidden")} className="relative h-full w-full rounded object-cover" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold">{game.title}</p>
                            <p className="mt-1 text-xs text-tertiary">{game.platform}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => addGame(game)}
                            disabled={alreadyAdded}
                            aria-label={`${alreadyAdded ? "Agregado" : "Agregar"}: ${game.title}`}
                            className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-md border border-primary/30 bg-primary/10 text-primary transition hover:bg-primary/20 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <Plus size={17} />
                          </button>
                        </div>
                      )
                    })}
                    {matchingGames.length === 0 && <p className="py-6 text-sm text-tertiary">No hay juegos que coincidan con la búsqueda.</p>}
                  </div>
                </div>
              </section>

              <div className="flex flex-wrap justify-end gap-3 border-t border-primary/20 pt-5">
                <Link to={isEditing ? `/lists/${id}` : "/lists"} className="rounded-lg border border-primary/25 px-4 py-2.5 text-sm font-semibold text-tertiary transition hover:border-primary hover:bg-primary/5 hover:text-secondary">
                  Cancelar
                </Link>
                <button type="submit" className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-black transition hover:opacity-90">
                  <Check size={17} />
                  {isEditing ? "Guardar cambios" : "Crear lista"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}

export default ListForm