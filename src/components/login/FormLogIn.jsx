import { Link, useNavigate } from "react-router-dom"

const FormLogIn = () => {

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/home');
  }

  return (
    <div className="flex w-full items-center justify-center px-6 py-12 sm:px-12 lg:w-1/2 lg:py-0">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        
        <h2 className="mb-6 text-2xl font-bold text-white sm:mb-8 sm:text-3xl">Iniciar Sesión</h2>

        
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
            Email
          </label>
          <input 
            id="email" 
            type="email" 
            placeholder="email@example.com"
            className="w-full px-4 py-3 bg-background-secondary border border-tertiary rounded-lg text-white placeholder-tertiary/50 focus:outline-none focus:border-primary transition-colors duration-300"
          />
        </div>

        
        <div className="mb-8">
          <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
            Contraseña
          </label>
          <input 
            id="password" 
            type="password" 
            placeholder="*******"
            className="w-full px-4 py-3 bg-background-secondary border border-tertiary rounded-lg text-white placeholder-tertiary/50 focus:outline-none focus:border-primary transition-colors duration-300"
          />
        </div>

        
        <button 
          type="submit"
          className="w-full py-3 bg-primary text-background font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 cursor-pointer"
        >
          Iniciar Sesión
        </button>

        
        <p className="text-center text-tertiary text-sm mt-6">
          ¿No tienes cuenta? <Link to="/register" className="text-primary hover:underline cursor-pointer">Regístrate aquí</Link>
        </p>
      </form>
    </div>
  )
}

export default FormLogIn