import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { Search, UserIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { searchGames } from "../../services/games.service"
import { useDebounce } from "../../utils/useDebounce"

const SearchBar = () => {
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef(null)

  const debouncedQuery = useDebounce(query, 300)
  const term = debouncedQuery.trim()

  const [response, setResponse] = useState({ term: "", games: [] })
  const results = response.games
  const isSearching = query.trim() !== term || response.term !== term
  const showDropdown = open && query.trim() !== ""

  
  useEffect(() => {
    if (!term) return

    const controller = new AbortController()
    searchGames(term, controller.signal)
      .then((games) => setResponse({ term, games }))
      .catch((error) => {
        if (!axios.isCancel(error)) setResponse({ term, games: [] })
      })

    
    return () => controller.abort()
  }, [term])

  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = () => {
    setQuery("")
    setOpen(false)
  }

  return (

    <div className="w-full p-6 bg-background flex items-center justify-between border-b border-tertiary">
      <div ref={wrapperRef} className="relative flex mx-auto items-center w-[80%]">
        <Search className="absolute left-3 text-tertiary pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
          placeholder="Buscar juegos, géneros, plataformas..."
          maxLength={100}
          className="w-full pl-10 pr-3 py-3 bg-background-secondary border border-tertiary rounded-2xl text-white placeholder-tertiary/50 focus:outline-none focus:border-primary transition-colors duration-300"
        />

        {showDropdown && (
          <div className="absolute top-full left-0 right-0 mt-2 z-40 bg-background-secondary border border-tertiary/30 rounded-2xl shadow-2xl overflow-hidden">
            {isSearching ? (
              <p className="px-4 py-3 text-sm text-tertiary">Buscando...</p>
            ) : results.length === 0 ? (
              <p className="px-4 py-3 text-sm text-tertiary">
                Sin resultados para "{debouncedQuery}"
              </p>
            ) : (
              <ul>
                {results.map((game) => (
                  <li key={game.id}>
                    <Link
                      to={`/game/${game.id}`}
                      onClick={handleSelect}
                      className="block px-4 py-3 hover:bg-primary/10 transition-colors"
                    >
                      <p className="text-sm font-semibold text-secondary">{game.title}</p>
                      <p className="text-xs text-tertiary">
                        {[game.genres?.join(" · "), game.platforms?.join(", ")].filter(Boolean).join(" — ")}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <Link to="/profile" className="bg-primary p-2 rounded-full btn-glow cursor-pointer">
        <UserIcon strokeWidth={2} className="text-background" />
      </Link>
    </div>
  );
};

export default SearchBar;
