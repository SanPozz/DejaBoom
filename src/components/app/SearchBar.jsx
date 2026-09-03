import { Search, UserIcon } from "lucide-react"
import { Link } from "react-router-dom"

const SearchBar = () => {
  return (
    <div className="w-full p-6 bg-background flex items-center justify-between border-b border-tertiary">
        <div className="relative flex mx-auto items-center w-[80%]">
            <Search className="absolute left-3 text-tertiary pointer-events-none" />
            <input
                type="text"
                placeholder="Buscar juegos, géneros, plataformas..."
                className="w-full pl-10 pr-3 py-3 bg-background-secondary border border-tertiary rounded-2xl text-white placeholder-tertiary/50 focus:outline-none focus:border-primary transition-colors duration-300"
            />
        </div>
        <Link to="/profile" className="bg-primary p-2 rounded-full btn-glow cursor-pointer">
            <UserIcon strokeWidth={2} className="text-background" />
        </Link>
    </div>
  )
}

export default SearchBar