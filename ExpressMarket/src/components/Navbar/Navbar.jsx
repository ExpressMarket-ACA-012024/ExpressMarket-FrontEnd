import { useState, useEffect, useRef } from "react";
import Sidebar from "../Sidebar/Sidebar";
import logo from "../../assets/img/ExpressMarketLogo.png";
import { FaUser, FaShoppingCart, FaBars, FaSearch, FaBoxOpen } from "react-icons/fa";
import { useAppContext, getToken } from '../../context/AppContext';
import { getUser } from '../../services/UserService'


const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const cartRef = useRef(null);
  const [store, setStore] = useState("ExpressMarket")

  const toggleSidebar = () => {
    setIsVisible(!isVisible);
  };

  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  const fetchUser = async () => {
    try {
        let response = await getUser()

        if (!response.success) {
            toast("Algo salió mal.", { type: 'error' })
            throw new Error('Algo salió mal')
        }
        //console.log(response)

        if (response=='') {
          setStore(response.user.store.description)
        }else{
          setStore(response.user.store.description)
        }

        console.log(store);
        
    } catch (error) {
        console.error(error);
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartVisible(false);
      }
    };

    fetchUser();

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed z-10 w-full font-montserrat">
      <nav className="grid items-center w-full grid-flow-col-dense py-2 bg-emerald-700">
        <div className="flex items-center w-auto h-full">
          <button
            onClick={toggleSidebar}
            type="button"
            className="p-2 mt-2 ml-4 text-sm text-white rounded-lg md:mt-0"
            aria-controls="navbar-hamburger"
            aria-expanded="false"
          >
            <span className="sr-only">Abrir menú</span>
            <FaBars className="w-5 h-5" />
          </button>
          <a href="/" className="flex items-center ml-4">
            <img src={logo} className="w-8 h-8 mr-2" alt="logo" />
            <span className="text-xl font-bold text-white">{store}</span>
          </a>
        </div>
        <div className="relative flex-grow mx-4 my-auto">
          <input
            className="w-full h-10 px-4 pr-10 placeholder-gray-400 border-2 rounded-lg text-emerald-700 font-montserrat border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="¿Qué estás buscando?"
          />
          <FaSearch className="absolute transform -translate-y-1/2 right-4 top-1/2 text-emerald-700" />
        </div>
        <div className="flex items-center ml-auto mr-4 space-x-4 text-white">
          {!getToken() ? (
            <button className="flex items-center px-4 py-2 transition duration-200 rounded-lg bg-emerald-800 hover:bg-emerald-600">
              <FaUser className="mr-2" />
              <span><a href={'./login'}> Iniciar sesión</a></span>
            </button>)
          : null}
          <div className="relative flex items-center" ref={cartRef}>
            <div className="h-6 mx-4 border-l border-white"></div>
            <button onClick={toggleCart} className="flex items-center">
              <FaShoppingCart className="mr-2" />
              <span>$0.00</span>
            </button>
            {isCartVisible && (
              <div className="absolute right-0 w-64 p-4 mt-2 bg-white rounded-lg shadow-lg top-full text-emerald-700">
                <h2 className="flex items-center mb-2 text-xl font-bold">
                  <FaBoxOpen className="mr-2" />
                  Mis productos
                </h2>
                <p className="text-gray-500">Aún no tienes productos</p>
                <button className="w-full py-2 mt-4 text-white transition duration-200 rounded-lg bg-emerald-700 hover:bg-emerald-600">
                  Proceder a pagar
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      {isVisible && <Sidebar />}
    </div>
  );
};

export default Navbar;


















