import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header = () => {

  const { logout } = useAuth();
  return (
    <header className="py-10 bg-indigo-600">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <h1 className="font-bold text-2xl text-indigo-200 text-center">Administrador de pacientes {" "} <span className="text-white font-black">de Veterinaria</span></h1>
        <nav className="flex flex-col lg:flex-row items-center gap-4 mt-5 lg:mt-0">
          <Link to="/admin" className="text-white text-lg uppercase font-bold">Pacientes</Link>
          <Link to="/admin/profile" className="text-white text-lg uppercase font-bold">Perfil</Link>
          <button type="button" className="text-white text-lg uppercase font-bold" onClick={logout}>Cerrar Sesión</button>
        </nav>
      </div>
    </header>
  )
};

export default Header;