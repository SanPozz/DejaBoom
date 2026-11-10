import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { Check, Gamepad2, Plus, Search, X } from "lucide-react"
import { searchGames } from "../../../services/games.service"
import { useDebounce } from "../../../hooks/useDebounce"

import { updateFavoriteGames } from "../../../services/users.service"
import { getErrorMessage } from "../../../services/api.service"

const FAVORITES_LIMIT = 4

export default function FavoriteGames({ games, isOwnProfile }) {
  const [favorites, setFavorites] = useState(games)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState(null)
  const [draft, setDraft] = useState([])
  const [search, setSearch] = useState("")
  const [isPickerOpen, setIsPickerOpen] = useState(false)

  // Con el input vacío no se busca, aunque el debounce todavía tenga el texto anterior
  const debouncedSearch = useDebounce(search, 300)
  const term = search.trim() ? debouncedSearch.trim() : ""

  const [results, setResults] = useState({ term: "", games: [] })
  const isSearching = search.trim() !== term || results.term !== term

  useEffect(() => {
    if (!term) return

    const controller = new AbortController()
    searchGames(term, controller.signal)
      .then((games) => setResults({ term, games }))
      .catch((error) => {
        if (!axios.isCancel(error)) setResults({ term, games: [] })
      })

    return () => controller.abort()
  }, [term])

  const isSelected = (gameId) => draft.some((game) => game.id === gameId)

  const openPicker = () => {
    setDraft(favorites)
    setSearch("")
    setSaveError(null)
    setIsPickerOpen(true)
  }

  const closePicker = () => setIsPickerOpen(false)

  const toggleGame = (game) => {
    setDraft((current) => {
      if (current.some((item) => item.id === game.id)) return current.filter((item) => item.id !== game.id)
      if (current.length >= FAVORITES_LIMIT) return current
      return [...current, game]
    })
  }

  const saveFavorites = async () => {
    setSaving(true)
    setSaveError(null)
    try {
      const updatedFavorites = await updateFavoriteGames(draft.map((game) => game.id))
      setFavorites(updatedFavorites)
      closePicker()
    } catch (error) {
      setSaveError(getErrorMessage(error, "Error al actualizar juegos favoritos"))
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="mb-12" aria-labelledby="favorite-games-title">
      <div className="mb-4 flex items-center justify-between border-b border-tertiary/10 pb-2">
        <div>
          <h2 id="favorite-games-title" className="text-xs font-bold uppercase tracking-wider text-tertiary">
            Juegos favoritos
          </h2>
          <p className="mt-1 text-xs text-tertiary">{favorites.length} de {FAVORITES_LIMIT}</p>
        </div>
        {isOwnProfile && (
          <button
            type="button"
            onClick={openPicker}
            className="inline-flex items-center gap-2 rounded-md border border-primary/30 px-3 py-2 text-xs font-semibold text-primary transition hover:bg-primary/10"
          >
            <Plus size={15} />
            {favorites.length > 0 ? "Editar favoritos" : "Elegir juegos"}
          </button>
        )}
      </div>

      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {Array.from({ length: FAVORITES_LIMIT }, (_, index) => {
          const game = favorites[index]

          return game ? (
            <Link
              key={game.id}
              to={`/game/${game.id}`}
              className="group relative aspect-[3/4] min-w-0 overflow-hidden rounded-lg border border-tertiary/15 bg-background-secondary transition-[border-color,box-shadow] duration-300 hover:border-primary/70 hover:shadow-[0_0_18px_rgba(103,228,91,0.35)] focus-visible:border-primary/70 focus-visible:shadow-[0_0_18px_rgba(103,228,91,0.35)] focus-visible:outline-none"
            >
              {game.cover && (
                <img
                  src={game.cover}
                  alt={game.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(event) => event.currentTarget.classList.add("hidden")}
                />
              )}
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 to-transparent px-2 pb-2 pt-8">
                <p className="truncate text-xs font-semibold text-white transition-colors group-hover:text-primary" title={game.title}>{game.title}</p>
              </div>
            </Link>
          ) : (
            <div
              key={`empty-${index}`}
              className="grid aspect-[3/4] min-w-0 place-items-center rounded-lg border border-dashed border-primary/25 bg-background-secondary/50 text-tertiary"
            >
              <span className="text-[11px]">No seleccionado</span>
            </div>
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
                <p className="mt-1 text-xs text-tertiary">Seleccionados: {draft.length} de {FAVORITES_LIMIT}</p>
              </div>
              <button type="button" onClick={closePicker} aria-label="Cerrar" className="grid h-9 w-9 place-items-center rounded-md text-tertiary transition hover:bg-primary/10 hover:text-primary">
                <X size={19} />
              </button>
            </header>

            <div className="space-y-3 border-b border-primary/15 p-4">
              <label className="relative block">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-tertiary" />
                <input
                  autoFocus
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Buscar un juego"
                  aria-label="Buscar juegos"
                  maxLength={100}
                  autoComplete="off"
                  className="w-full rounded-lg border border-primary/25 bg-background px-10 py-3 text-sm text-secondary outline-none transition focus:border-primary"
                />
              </label>

              {/* Seleccionados: se pueden quitar aunque no estén en los resultados de la búsqueda */}
              {draft.length > 0 && (
                <ul className="flex flex-wrap gap-2" aria-label="Juegos seleccionados">
                  {draft.map((game) => (
                    <li key={game.id}>
                      <button
                        type="button"
                        onClick={() => toggleGame(game)}
                        aria-label={`Quitar ${game.title}`}
                        className="flex max-w-48 items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 py-1 pl-1 pr-2 text-xs font-semibold text-secondary transition hover:border-rose-400/50 hover:bg-rose-400/10"
                      >
                        {game.cover ? (
                          <img src={game.cover} alt="" className="h-5 w-5 shrink-0 rounded-full object-cover" />
                        ) : (
                          <Gamepad2 size={14} className="shrink-0 text-tertiary" />
                        )}
                        <span className="truncate">{game.title}</span>
                        <X size={12} className="shrink-0 text-tertiary" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="list-games-scrollbar min-h-48 flex-1 overflow-y-auto p-3" role="listbox" aria-label="Resultados de búsqueda" aria-multiselectable="true">
              {!search.trim() ? (
                <p className="px-3 py-8 text-center text-sm text-tertiary">Escribí el nombre de un juego para buscarlo.</p>
              ) : isSearching ? (
                <p className="px-3 py-8 text-center text-sm text-tertiary">Buscando...</p>
              ) : results.games.length === 0 ? (
                <p className="px-3 py-8 text-center text-sm text-tertiary">No se encontraron juegos.</p>
              ) : (
                results.games.map((game) => {
                  const selected = isSelected(game.id)
                  const isLimitReached = draft.length >= FAVORITES_LIMIT && !selected

                  return (
                    <button
                      key={game.id}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      disabled={isLimitReached}
                      onClick={() => toggleGame(game)}
                      className="flex w-full items-center gap-3 border-b border-primary/10 px-2 py-2.5 text-left transition last:border-b-0 hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-45"
                    >
                      {game.cover ? (
                        <img src={game.cover} alt="" className="h-12 w-9 shrink-0 rounded object-cover" />
                      ) : (
                        <span className="grid h-12 w-9 shrink-0 place-items-center rounded bg-background">
                          <Gamepad2 size={16} className="text-tertiary" />
                        </span>
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-secondary">{game.title}</span>
                        {game.releaseDate && <span className="mt-1 block text-xs text-tertiary">{game.releaseDate.getUTCFullYear()}</span>}
                      </span>
                      <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border ${selected ? "border-primary bg-primary text-background" : "border-tertiary/30 text-transparent"}`}>
                        <Check size={15} />
                      </span>
                    </button>
                  )
                })
              )}
            </div>

            <footer className="flex items-center justify-end gap-3 border-t border-primary/15 px-4 py-4">
              {saveError && <p className="mr-auto text-xs text-red-400">{saveError}</p>}
              <button type="button" onClick={closePicker} className="rounded-lg border border-primary/25 px-4 py-2.5 text-sm font-semibold text-tertiary transition hover:text-secondary">
                Cancelar
              </button>
              <button type="button" onClick={saveFavorites} disabled={saving} className="rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
                {saving ? "Guardando..." : "Guardar selección"}
              </button>
            </footer>

          </section>
        </div>
      )}
    </section>
  )
}
