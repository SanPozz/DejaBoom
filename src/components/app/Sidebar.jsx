import React from "react"
import logo from "../../assets/dejaboompng.png"
import { LogOut, Home, Compass, List, Bell, Plus } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

const linksSidebar = [
  { name: "Inicio", path: "/home", icon: <Home size={20} /> },
  { name: "Descubrir", path: "", icon: <Compass size={20} /> },
  { name: "Mis Listas", path: "/lists", icon: <List size={20} /> },
  { name: "Notificaciones", path: "", icon: <Bell size={20} /> },
]

const Sidebar = () => {
  const location = useLocation() // Nos permite detectar la página actual para pintar el enlace activo

  return (
    <>
      {/* 1. MÓVIL: Barra inferior fija (Se muestra solo desde pantallas pequeñas hasta lg) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-background-secondary border-t border-[color:var(--color-tertiary)]/15 z-50 flex items-center justify-around px-4 box-border">
        {linksSidebar.map((link) => {
          const isActive = location.pathname === link.path
          return (
            <Link
              key={link.name}
              to={link.path}
              className={`flex flex-col items-center justify-center gap-0.5 text-[10px] font-sans transition-colors duration-200 ${
                isActive ? "text-[color:var(--color-primary)]" : "text-[color:var(--color-tertiary)] hover:text-white"
              }`}
            >
              <div className={isActive ? "scale-110 transition-transform" : ""}>
                {link.icon}
              </div>
              <span className="font-medium">{link.name}</span>
            </Link>
          );
        })}
        
        {/* Botón flotante compacto de Nueva Reseña en móvil */}
        <button className="bg-[color:var(--color-primary)] p-2.5 rounded-full text-black shadow-lg shadow-[color:var(--color-primary)]/20 active:scale-95 transition-transform cursor-pointer -translate-y-4 border-4 border-[color:var(--color-background)]">
          <Plus size={20} strokeWidth={3} />
        </button>
      </div>


      {/* 2. ESCRITORIO: Tu Sidebar tradicional (Se oculta en móvil, aparece a partir de lg) */}
      <aside className="hidden lg:flex flex-col bg-background-secondary w-[220px] xl:w-[260px] shrink-0 sticky top-0 left-0 h-screen border-r border-[color:var(--color-tertiary)]/15 z-40 box-border">
        
        <nav className="flex flex-col justify-between h-full py-6 px-4">
          <div className="flex flex-col items-center w-full">
            {/* Logo */}
            <Link to="/home" className="mb-8 block">
              <img src={logo} alt="DejaBoom Logo" className="w-32 object-contain" />
            </Link>

            {/* Links de Navegación */}
            <div className="flex flex-col gap-1.5 w-full">
              {linksSidebar.map((link) => {
                const isActive = location.pathname === link.path
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-base transition-all duration-300 font-sans group ${
                      isActive
                        ? "text-[color:var(--color-primary)] bg-[color:var(--color-primary)]/10 font-bold"
                        : "text-[color:var(--color-tertiary)] hover:text-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)]/5"
                    }`}
                  >
                    <div className={`${isActive ? "" : "text-[color:var(--color-tertiary)] group-hover:text-[color:var(--color-primary)]"} transition-colors`}>
                      {link.icon}
                    </div>
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Botón Nueva Reseña */}
            <button className="w-full bg-[color:var(--color-primary)] py-2.5 mt-6 rounded-xl text-black font-bold hover:opacity-90 shadow-md shadow-[color:var(--color-primary)]/10 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 text-sm ">
              <Plus size={16} strokeWidth={2.5} />
              <span>Nueva Reseña</span>
            </button>
          </div>

          {/* Botón Cerrar Sesión */}
          <div className="w-full px-2">
            <Link 
              to="/logout" 
              className="text-[color:var(--color-tertiary)] hover:text-rose-400 flex gap-3 items-center text-sm font-semibold transition-colors duration-200 group"
            >
              <LogOut size={18} className="text-[color:var(--color-tertiary)] group-hover:text-rose-400 transition-colors" /> 
              Cerrar Sesión
            </Link>
          </div>
        </nav>

      </aside>
    </>
  )
}

export default Sidebar
