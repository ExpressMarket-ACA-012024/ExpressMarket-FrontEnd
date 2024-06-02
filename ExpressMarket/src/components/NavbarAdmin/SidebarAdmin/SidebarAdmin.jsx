import { useAppContext, getToken } from '../../../context/AppContext'

const SidebarAdmin = () => {
    const { logout } = useAppContext();

    const logoutHandler = () => {
        logout()
        window.location.href = './login'
    }

    return (
        <div>
            <ul className="absolute z-10 right-0 py-2 w-64 md:w-1/4 bg-emerald-700 shadow-lg h-full font-montserrat">
                <li>
                    <a href={'../exchange-ticket'} className="block px-4 py-2 text-sm text-white hover:bg-emerald-400">
                        Canjear Entrada
                    </a>
                </li>
                <li>
                    <a href={'../event-admin'} className="block px-4 py-2 text-sm text-white hover:bg-emerald-400">
                        Administrar eventos
                    </a>
                </li>
                <li>
                    <a href={'../tiers'} className="block px-4 py-2 text-sm text-white hover:bg-emerald-400">
                        Localidades
                    </a>
                </li>
                <li>
                    <a href={'../categories'} className="block px-4 py-2 text-sm text-white hover:bg-emerald-400">
                        Categorías
                    </a>
                </li>
                <li>
                    <a href={'../organizers'} className="block px-4 py-2 text-sm text-white hover:bg-emerald-400">
                        Organizadores
                    </a>
                </li>
                <li>
                    <a href={'../orders'} className="block px-4 py-2 text-sm text-white hover:bg-emerald-400">
                        Órdenes
                    </a>
                </li>
                <li>
                    <a href={'../user-roles'} className="block px-4 py-2 text-sm text-white hover:bg-emerald-400">
                        Permisos de usuarios
                    </a>
                </li>
                <li>
                    <a href={'../statistics'} className="block px-4 py-2 text-sm text-white hover:bg-emerald-400">
                        Estadísticas
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

export default SidebarAdmin;
