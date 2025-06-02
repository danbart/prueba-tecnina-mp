import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import { AuthProvider, useAuth } from './context/AuthContext';
import CasoCrear from './pages/CasoCrear';
import CasoDetalle from './pages/CasoDetalle';
import Casos from './pages/Casos';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

function ProtectedRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
}

function App() {

  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/casos"
          element={
            <ProtectedRoute>
              <Casos />
            </ProtectedRoute>
          }
        />
        <Route path="/casos/nuevo" element={<ProtectedRoute><CasoCrear /></ProtectedRoute>} />
        <Route
          path="/casos/:id"
          element={
            <ProtectedRoute>
              <CasoDetalle />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  )
}

export default App
