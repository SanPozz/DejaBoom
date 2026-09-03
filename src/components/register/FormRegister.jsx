import { Link, useNavigate } from "react-router-dom"

const FormRegister = () => {

  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    navigate('/login');
  }

  

  return (
    <div className="w-1/2 flex items-center justify-center px-12">
      <form onSubmit={handlesubmit} className="w-full max-w-md">
        
        <h2 className="text-3xl font-bold text-white mb-8">Crear Cuenta</h2>

        
        <div className="mb-6">
          <label htmlFor="fullname" className="block text-sm font-medium text-white mb-2">
            Nombre Completo
          </label>
          <input 
            id="fullname" 
            type="text" 
            placeholder="Juan Pérez"
            className="w-full px-4 py-3 bg-background-secondary border border-tertiary rounded-lg text-white placeholder-tertiary/50 focus:outline-none focus:border-primary transition-colors duration-300"
          />
        </div>

        
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

        
        <div className="mb-6">
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

        
        <div className="mb-8">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
            Confirmar Contraseña
          </label>
          <input 
            id="confirmPassword" 
            type="password" 
            placeholder="*******"
            className="w-full px-4 py-3 bg-background-secondary border border-tertiary rounded-lg text-white placeholder-tertiary/50 focus:outline-none focus:border-primary transition-colors duration-300"
          />
        </div>

        
        <button 
          type="submit"
          className="w-full py-3 bg-primary text-background font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 cursor-pointer"
        >
          Crear Cuenta
        </button>

        
        <p className="text-center text-tertiary text-sm mt-6">
          ¿Ya tienes cuenta? <Link to="/login" className="text-primary hover:underline cursor-pointer">Inicia sesión aquí</Link>
        </p>
      </form>
    </div>
  )
}

export default FormRegister
