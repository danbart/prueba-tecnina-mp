import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { token, logout } = useAuth();
    return (
        <nav className="block px-4 py-2 rounded hover:bg-gray-700 md:inline md:py-0">
            <Link to="/" className="font-bold">MP‑Casos</Link>
            {token ? (
                <>
                    <Link to="/casos">Casos</Link>
                    <Link to="/casos/nuevo">Nuevo caso</Link>
                    <button className="ml-auto" onClick={logout}>Cerrar sesión</button>
                </>
            ) : (
                <Link className="ml-auto" to="/register">Registrarse</Link>
            )}
        </nav>
    );
}
