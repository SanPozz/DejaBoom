import { createContext, useState, useEffect, useContext } from "react";
import { signInWithPopup } from "firebase/auth";
import { googleProvider } from "../firebase"; 

import { getMe } from "../services/auth.service";

import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
} from "firebase/auth";

import { auth } from "../firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

    const [ user, setUser ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {

        const cleanup = onAuthStateChanged(auth, async (firebaseUser) => {
            if (!firebaseUser) {
                setUser(null);
                setLoading(false);
                return;
            }

            try {

                const data = await getMe();
                setUser(data);
                
            } catch (error) {
                console.log("No se pudo obtener el perfil", error)
                setUser(null);
            } finally {
                setLoading(false);
            }

        });

        return cleanup;

    }, []);

    const hasRole = (allowedRoles) => {
        if (!user || !user.role) {
            console.log(user)
            return false;
        }

        console.log(user.role)

        return allowedRoles.includes(user.role);
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const loginWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    }

    const register = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const logout = () => {
        return signOut(auth);
    }

    return (
        <AuthContext.Provider value={{ user, loading, hasRole, login, loginWithGoogle, register, logout }}>
            {children}
        </AuthContext.Provider>
    );

}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export default AuthContext;