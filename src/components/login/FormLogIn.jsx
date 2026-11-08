import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

import { registerUser } from "../../services/auth.service.js";

import { getAdditionalUserInfo } from "firebase/auth";

import { useState } from "react";
import GoogleSignInButton from "./GoogleSignInButton";


const FormLogIn = () => {

  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);

      navigate('/home');

    } catch (error) {
      console.error(error);
    }
  }

  const handleGoogleSignIn = async () => {
    try {

      const response = await loginWithGoogle();

      const additionalUserInfo = getAdditionalUserInfo(response);

      console.log(additionalUserInfo);

      const username = response.user.displayName;

      
      if (additionalUserInfo.isNewUser) {
        const responseBackend = await registerUser({ username });

        console.log({
          user_backend: responseBackend
        });
        

      }
      

      if (response.user) {
        navigate('/home');
      }
    } catch (error) {
      console.error(error);
    }
  }; 

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-background-secondary border border-tertiary rounded-lg text-white placeholder-tertiary/50 focus:outline-none focus:border-primary transition-colors duration-300"
          />
        </div>

        
        <button 
          type="submit"
          className="w-full py-3 bg-primary text-background font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 cursor-pointer"
        >
          Iniciar Sesión
        </button>

        <div className="my-6 flex items-center gap-4" aria-hidden="true">
          <span className="h-px flex-1 bg-tertiary/40" />
          <span className="text-sm text-tertiary">o</span>
          <span className="h-px flex-1 bg-tertiary/40" />
        </div>

        <GoogleSignInButton onClick={handleGoogleSignIn}/>

        
        <p className="text-center text-tertiary text-sm mt-6">
          ¿No tienes cuenta? <Link to="/register" className="text-primary hover:underline cursor-pointer">Regístrate aquí</Link>
        </p>
      </form>
    </div>
  )
}

export default FormLogIn