import { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import iconNav from "../../assets/img/iconNav.png";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleSidebar = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="w-full fixed">
      <nav className="grid grid-flow-col-dense w-full bg-emerald-700 py-3.5 md:py-0">
        <div className="w-auto h-full relative">
          <button onClick={toggleSidebar} type="button" className="md:absolute md:inset-y-1 md:left-0 md:mr-4 p-2 ml-4 text-sm text-white rounded-lg" aria-controls="navbar-hamburger" aria-expanded="false">
            <span className="sr-only">Abrir menú</span>
            <img src={iconNav} className="h-4 w-5" alt="#" />
          </button>
        </div>
        <div className="w-fit h-full">
          <a href={"/"} className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"></a>
        </div>
        <div className="w-auto h-full my-auto py-2 text-right">
            <input className="w-full m-auto md:w-2/3 h-8 px-4 mr-8 rounded-lg text-emerald-700 font-montserrat border-2 border-emerald-300" placeholder="Buscar"></input>
        </div>
      </nav>
      {isVisible && <Sidebar />}
    </div>
  );
};

export default Navbar;
