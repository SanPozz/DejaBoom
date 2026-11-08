import { Search, Check, Gamepad2 } from "lucide-react"
import { useEffect, useState } from "react"
import axios from "axios"

import { searchGames } from "../../services/games.service"
import { useDebounce } from "../../hooks/useDebounce"

const MAX_RESULTS = 6

// Buscador de juegos con dropdown. `value` es el juego elegido (o null) y `onChange` recibe el nuevo.
const GameSearchSelect = ({ value, onChange }) => {
  const [search, setSearch] = useState(value?.title ?? "")

  // Con un juego elegido no se busca: el input muestra su título
  const debouncedSearch = useDebounce(search, 300)
  const term = value ? "" : debouncedSearch.trim()

  const [results, setResults] = useState({ term: "", games: [] })
  const isSearching = search.trim() !== term || results.term !== term

  useEffect(() => {
    if (!term) return

    const controller = new AbortController()
    searchGames(term, controller.signal)
      .then((games) => setResults({ term, games: games.slice(0, MAX_RESULTS) }))
      .catch((error) => {
        if (!axios.isCancel(error)) setResults({ term, games: [] })
      })

    return () => controller.abort()
  }, [term])

  const handleSelect = (game) => {
    setSearch(game.title)
    onChange(game)
  }

  const handleChangeSearch = (text) => {
    setSearch(text)
    // Si edita el texto de un juego ya elegido, se deselecciona y vuelve a buscar
    if (value && text !== value.title) onChange(null)
  }

  return (
    <div>
      <label htmlFor="review-game-search" className="block text-sm font-semibold text-secondary mb-2">
        Juego
      </label>
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-tertiary" />
        <input
          id="review-game-search"
          type="text"
          value={search}
          onChange={(e) => handleChangeSearch(e.target.value)}
          placeholder="Busca un juego..."
          maxLength={100}
          className="w-full bg-background border border-primary/25 rounded-lg pl-9 pr-9 py-2 text-secondary placeholder-tertiary/50 focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none transition-colors"
          autoComplete="off"
        />
        {value && (
          <Check size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary" />
        )}
      </div>

      {/* Resultados de búsqueda */}
      {search.trim() && !value && (
        <div className="dropdown-reveal list-games-scrollbar mt-2 max-h-56 overflow-y-auto rounded-lg border border-primary/20 bg-background-secondary">
          {isSearching ? (
            <p className="px-3 py-3 text-sm text-tertiary">Buscando...</p>
          ) : results.games.length > 0 ? (
            results.games.map((game) => (
              <button
                key={game.id}
                type="button"
                onClick={() => handleSelect(game)}
                className="cursor-pointer w-full flex items-center gap-3 border-b border-primary/10 px-3 py-2.5 text-left transition-colors last:border-b-0 hover:bg-primary/10"
              >
                {game.cover ? (
                  <img
                    src={game.cover}
                    alt={game.title}
                    className="size-10 rounded-md object-cover shrink-0 border border-primary/10"
                  />
                ) : (
                  <div className="size-10 rounded-md shrink-0 border border-primary/10 bg-background flex items-center justify-center">
                    <Gamepad2 size={18} className="text-tertiary" />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-secondary truncate">{game.title}</p>
                  <p className="text-xs text-tertiary truncate">
                    {[game.releaseDate?.getUTCFullYear(), game.platforms.join(", ")].filter(Boolean).join(" · ")}
                  </p>
                </div>
              </button>
            ))
          ) : (
            <p className="px-3 py-3 text-sm text-tertiary">No se encontraron juegos</p>
          )}
        </div>
      )}
    </div>
  )
}

export default GameSearchSelect
