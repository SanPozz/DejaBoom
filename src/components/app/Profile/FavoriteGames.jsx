import { useState } from "react"
import { Check, Plus, Search, X } from "lucide-react"
import { gameCatalog } from "../../../data/listEditorData"

const FAVORITES_STORAGE_KEY = "dejaboom-favorite-games"
const FAVORITES_LIMIT = 5

const getSavedFavoriteIds = () => {
  try {
    const savedIds = JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) ?? "[]")
    return Array.isArray(savedIds)
      ? savedIds.filter((id) => gameCatalog.some((game) => game.id === id)).slice(0, FAVORITES_LIMIT)
      : []
  } catch {
    return []
  }
}

export default function FavoriteGames() {
  const [favoriteIds, setFavoriteIds] = useState(getSavedFavoriteIds)
  const [draftIds, setDraftIds] = useState([])
  const [search, setSearch] = useState("")
  const [isPickerOpen, setIsPickerOpen] = useState(false)

  const favoriteGames = favoriteIds
    .map((id) => gameCatalog.find((game) => game.id === id))
    .filter(Boolean)
  const matchingGames = gameCatalog.filter((game) =>
    `${game.title} ${game.platform}`.toLowerCase().includes(search.trim().toLowerCase())
  )

  const openPicker = () => {
    setDraftIds(favoriteIds)
    setSearch("")
    setIsPickerOpen(true)
  }

  const closePicker = () => setIsPickerOpen(false)

  const toggleGame = (gameId) => {
    setDraftIds((current) => {
      if (current.includes(gameId)) return current.filter((id) => id !== gameId)
      if (current.length >= FAVORITES_LIMIT) return current
      return [...current, gameId]
    })
  }

  const saveFavorites = () => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(draftIds))
    setFavoriteIds(draftIds)
    closePicker()
  }

  const removeFavorite = (gameId) => {
    const updatedIds = favoriteIds.filter((id) => id !== gameId)
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updatedIds))
    setFavoriteIds(updatedIds)
  }

  return (
    <section className="mb-12" aria-labelledby="favorite-games-title">
      <div className="mb-4 flex items-center justify-between border-b border-tertiary/10 pb-2">
        <div>
          <h2 id="favorite-games-title" className="text-xs font-bold uppercase tracking-wider text-tertiary">
            Juegos favoritos
          </h2>
          <p className="mt-1 text-xs text-tertiary">{favoriteGames.length} de {FAVORITES_LIMIT}</p>
        </div>
        <button
          type="button"
          onClick={openPicker}
          className="inline-flex items-center gap-2 rounded-md border border-primary/30 px-3 py-2 text-xs font-semibold text-primary transition hover:bg-primary/10"
        >
          <Plus size={15} />
          {favoriteGames.length > 0 ? "Editar favoritos" : "Elegir juegos"}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 sm:gap-4">
        {Array.from({ length: FAVORITES_LIMIT }, (_, index) => {
          const game = favoriteGames[index]

          return game ? (
            <div key={game.id} className="group relative aspect-[3/4] min-w-0 overflow-hidden rounded-lg border border-tertiary/15 bg-background-secondary">
              <img
                src={game.cover}
                alt={game.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(event) => event.currentTarget.classList.add("hidden")}
              />
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 to-transparent px-2 pb-2 pt-8">
                <p className="truncate text-xs font-semibold text-white" title={game.title}>{game.title}</p>
              </div>
              <button
                type="button"
                onClick={() => removeFavorite(game.id)}
                aria-label={`Quitar ${game.title} de favoritos`}
                className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-black/75 text-white transition hover:bg-rose-600"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <button
              key={`empty-${index}`}
              type="button"
              onClick={openPicker}
              aria-label={`Agregar juego favorito ${index + 1}`}
              className="grid aspect-[3/4] min-w-0 place-items-center rounded-lg border border-dashed border-primary/25 bg-background-secondary/50 text-tertiary transition hover:border-primary hover:text-primary"
            >
              <span className="flex flex-col items-center gap-2">
                <Plus size={20} />
                <span className="text-[11px]">Agregar</span>
              </span>
            </button>
          )
        })}
      </div>

      {isPickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <button type="button" onClick={closePicker} aria-label="Cerrar selector" className="absolute inset-0 cursor-default" />
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="favorite-picker-title"
            className="relative flex max-h-[85vh] w-full max-w-xl flex-col overflow-hidden rounded-xl border border-primary/30 bg-background-secondary shadow-2xl"
          >
            <header className="flex items-center justify-between border-b border-primary/15 px-5 py-4">
              <div>
                <h3 id="favorite-picker-title" className="font-bold text-secondary">Elige tus juegos favoritos</h3>
                <p className="mt-1 text-xs text-tertiary">Seleccionados: {draftIds.length} de {FAVORITES_LIMIT}</p>
              </div>
              <button type="button" onClick={closePicker} aria-label="Cerrar" className="grid h-9 w-9 place-items-center rounded-md text-tertiary transition hover:bg-primary/10 hover:text-primary">
                <X size={19} />
              </button>
            </header>

            <div className="border-b border-primary/15 p-4">
              <label className="relative block">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-tertiary" />
                <input
                  autoFocus
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Buscar por juego o plataforma"
                  aria-label="Buscar juegos"
                  className="w-full rounded-lg border border-primary/25 bg-background px-10 py-3 text-sm text-secondary outline-none transition focus:border-primary"
                />
              </label>
            </div>

            <div className="list-games-scrollbar min-h-0 flex-1 overflow-y-auto p-3" role="listbox" aria-label="Catálogo de juegos" aria-multiselectable="true">
              {matchingGames.length > 0 ? matchingGames.map((game) => {
                const isSelected = draftIds.includes(game.id)
                const isLimitReached = draftIds.length >= FAVORITES_LIMIT && !isSelected

                return (
                  <button
                    key={game.id}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    disabled={isLimitReached}
                    onClick={() => toggleGame(game.id)}
                    className="flex w-full items-center gap-3 border-b border-primary/10 px-2 py-2.5 text-left transition last:border-b-0 hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    <img
                      src={game.cover}
                      alt=""
                      className="h-12 w-10 shrink-0 rounded object-cover"
                      onError={(event) => event.currentTarget.classList.add("hidden")}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-secondary">{game.title}</span>
                      <span className="mt-1 block text-xs text-tertiary">{game.platform}</span>
                    </span>
                    <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border ${isSelected ? "border-primary bg-primary text-background" : "border-tertiary/30 text-transparent"}`}>
                      <Check size={15} />
                    </span>
                  </button>
                )
              }) : (
                <p className="px-3 py-8 text-center text-sm text-tertiary">No se encontraron juegos.</p>
              )}
            </div>

            <footer className="flex justify-end gap-3 border-t border-primary/15 px-4 py-4">
              <button type="button" onClick={closePicker} className="rounded-lg border border-primary/25 px-4 py-2.5 text-sm font-semibold text-tertiary transition hover:text-secondary">
                Cancelar
              </button>
              <button type="button" onClick={saveFavorites} className="rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-background transition hover:opacity-90">
                Guardar selección
              </button>
            </footer>
          </section>
        </div>
      )}
    </section>
  )
}