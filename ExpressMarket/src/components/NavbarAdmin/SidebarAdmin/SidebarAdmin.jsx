import { useAppContext, getToken } from '../../../context/AppContext'

const SidebarAdmin = () => {
    const { logout } = useAppContext();

    const logoutHandler = () => {
        logout()
        window.location.href = './login'
    }

    return (
        <div className='relative left-0 overflow-y-auto py-4 w-64 md:w-1/4 bg-emerald-700 shadow-lg h-screen font-montserrat'>
            <ul>
                <li>
                    <a href={'../exchange-ticket'} className="block px-6 py-4  text-white hover:bg-emerald-400  hover:font-extrabold">
                        Canjear Entrada
                    </a>
                </li>
                <li>
                    <a href={'../products-admin'} className="block px-6 py-4  text-white hover:bg-emerald-400  hover:font-extrabold">
                        Administrar eventos
                    </a>
                </li>
                <li>
                    <a href={'../tiers'} className="block px-6 py-4  text-white hover:bg-emerald-400  hover:font-extrabold">
                        Localidades
                    </a>
                </li>
                <li>
                    <a href={'../categories'} className="block px-6 py-4  text-white hover:bg-emerald-400  hover:font-extrabold">
                        Categorías
                    </a>
                </li>
                <li>
                    <a href={'../organizers'} className="block px-6 py-4  text-white hover:bg-emerald-400  hover:font-extrabold">
                        Organizadores
                    </a>
                </li>
                <li>
                    <a href={'../orders'} className="block px-6 py-4  text-white hover:bg-emerald-400  hover:font-extrabold">
                        Órdenes
                    </a>
                </li>
                <li>
                    <a href={'../user-roles'} className="block px-6 py-4  text-white hover:bg-emerald-400  hover:font-extrabold">
                        Permisos de usuarios
                    </a>
                </li>
                <li>
                    <a href={'../statistics'} className="block px-6 py-4  text-white hover:bg-emerald-400  hover:font-extrabold">
                        Estadísticas
                    </a>
                </li>
                {getToken() ? (
                    <li>
                        <a onClick={logoutHandler} className="block px-6 py-4  text-white hover:bg-emerald-400  hover:font-extrabold">
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
