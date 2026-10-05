import { Link, useNavigate } from "react-router-dom"

import axios from "axios";

import { useState } from "react";

const FormRegister = () => {

  const navigate = useNavigate();

  const handlesubmit = async (e) => {

    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', {
        username,
        email,
        password,
        confirmPassword
      });

      console.log(response.data);
      navigate('/login');
      
    } catch (error) {
      console.error(error);
    }
  }

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="flex w-full items-center justify-center px-6 py-10 sm:px-12 lg:w-1/2 lg:py-12">
      <form onSubmit={handlesubmit} className="w-full max-w-md">
        
        <h2 className="text-3xl font-bold text-white mb-8">Crear Cuenta</h2>

        
        <div className="mb-6">
          <label htmlFor="username" className="block text-sm font-medium text-white mb-2">
            Nombre de usuario
          </label>
          <input 
            id="username" 
            type="text" 
            placeholder="Juan Pérez"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
