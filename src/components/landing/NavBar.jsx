import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import logo from '../../assets/dejaboompng.png'
import { Link } from 'react-router-dom'
import links from '../../consts/links'

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const closeMenu = () => setIsMenuOpen(false)

  return (
        <header className='sticky top-0 z-50 border-b-2 border-tertiary bg-background backdrop-blur-xl'>

                <nav className='container mx-auto w-full flex items-center justify-between px-3 sm:px-6 lg:px-8 py-3 sm:py-4 font-mono min-h-20'>

                        <Link to="/" className='flex items-center gap-2' onClick={closeMenu}>
                <img src={logo} alt="Logo" className='h-12 sm:h-14 lg:h-16 w-auto' />
            </Link>

            {/* <div className='hidden md:flex items-center gap-6 '>

                {links.map((link, index) => (
                    <Link key={index} to={link.href} className='px-3 text-sm font-medium text-secondary hover:text-primary transition-colors duration-300'>
                        {link.label}
                    </Link>
                ))}

            </div> */}

            <div className='flex items-center gap-2 sm:gap-4'>
                
                                <Link to="/login" className='hidden sm:inline-flex px-3 text-sm font-medium text-secondary hover:text-primary transition-colors duration-300'>Log In</Link>

                <Link to="/register" className='px-3 sm:px-4 py-2 bg-primary rounded-xl text-xs sm:text-sm font-medium text-background hover:cursor-pointer btn-glow transition-all duration-300 whitespace-nowrap'>Empieza Ahora</Link>

                                <button
                                    type='button'
                                    className='md:hidden p-2 rounded-lg border border-tertiary/40 text-secondary hover:text-primary hover:border-primary/50 transition-colors'
                                    onClick={() => setIsMenuOpen((prev) => !prev)}
                                    aria-label='Abrir menu'
                                >
                                    {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
                                </button>

            </div>

        </nav>

                {isMenuOpen && (
                    <div className='md:hidden border-t border-tertiary/40 bg-background-secondary/95 backdrop-blur-xl'>
                        <div className='px-4 py-4 flex flex-col gap-2'>
                            {/* {links.map((link, index) => (
                                <Link
                                    key={index}
                                    to={link.href}
                                    onClick={closeMenu}
                                    className='px-3 py-2 rounded-lg text-sm font-medium text-secondary hover:text-primary hover:bg-primary/10 transition-colors duration-300'
                                >
                                    {link.label}
                                </Link>
                            ))} */}

                            <div className='mt-2 pt-3 border-t border-tertiary/30 flex flex-col gap-2'>
                                <Link
                                    to='/login'
                                    onClick={closeMenu}
                                    className='px-3 py-2 rounded-lg text-sm font-medium text-secondary hover:text-primary hover:bg-primary/10 transition-colors duration-300'
                                >
                                    Log In
                                </Link>
                                <Link
                                    to='/register'
                                    onClick={closeMenu}
                                    className='px-3 py-2 rounded-lg text-sm font-medium text-background bg-primary text-center'
                                >
                                    Empieza Ahora
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

    </header>
  )
}

export default NavBar