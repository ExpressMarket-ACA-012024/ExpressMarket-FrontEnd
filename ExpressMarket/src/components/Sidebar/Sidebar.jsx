import { useAppContext } from '../../context/AppContext'
import { getToken } from '../../context/AppContext';

const Sidebar = () => {

    const { logout } = useAppContext();

    const logoutHandler = () => {
        logout()
        window.location.href = '../../'
    }

    return (
        <div>
            <ul className="absolute z-10 right-0 py-2 w-64 md:w-1/4 bg-emerald-700 shadow-lg h-full font-montserrat">
                <li>
                    <a href={'/'} className="block px-4 py-2 text-sm text-white hover:bg-emerald-400">
                        Inicio
                    </a>
                </li>
                {!getToken()  ? (
                    <li>
                        <a href={'../login'} className="block px-4 py-2 text-sm text-white hover:bg-emerald-400">
                            Iniciar sesión
                        </a>
                    </li>
                ) : null}
                <li>
                    <a href={'../profile'} className="block px-4 py-2 text-sm text-white hover:bg-emerald-400">
                        Perfil
                    </a>
                </li>
                <li>
                    <a href={'../../events'} className="block px-4 py-2 text-sm text-white hover:bg-emerald-400">
                        Eventos
                    </a>
                </li>
                {getToken() ? (
                    <li>
                        <a href={'../../mytickets'} className="block px-4 py-2 text-sm text-white hover:bg-emerald-400">
                            Mis Tickets
                        </a>
                    </li>
                ) : null}
                {getToken() ? (
                    <li>
                        <a href={'./scanner'} className="block px-4 py-2 text-sm text-white hover:bg-emerald-400">
                            Scanner
                        </a>
                    </li>
                ) : null}
                <li>
                    <a href={'../contactus'} className="block px-4 py-2 text-sm text-white hover:bg-emerald-400">
                        Contáctanos
                    </a>
                </li>
                <li>
                    <a href={'../faq'} className="block px-4 py-2 text-sm text-white hover:bg-emerald-400">
                        Preguntas frecuentes
                    </a>
                </li>
                <li>
                    <a href={'../help'} className="block px-4 py-2 text-sm text-white hover:bg-emerald-400">
                        Ayuda
                    </a>
                </li>
                <li>
                    <a href={'../aboutus'} className="block px-4 py-2 text-sm text-white hover:bg-emerald-400">
                        Quiénes somos
                    </a>
                </li>
                {getToken() ? (
                    <li>
                        <a onClick={logoutHandler} className="block px-4 py-2 text-sm text-white hover:bg-emerald-400">
                            Cerrar sesion
                        </a>
                    </li>
                ) : null}
                <li className='absolute bottom-0 left-0'>
                    <a href="#" className="block px-4 py-2">
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
