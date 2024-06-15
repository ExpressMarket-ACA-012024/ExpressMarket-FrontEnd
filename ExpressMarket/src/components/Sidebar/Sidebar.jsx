import { useAppContext } from '../../context/AppContext'
import { getToken } from '../../context/AppContext';

const Sidebar = () => {

    const { logout } = useAppContext();

    const logoutHandler = () => {
        logout()
        window.location.href = '../../'
    }

    return (
        <div className='relative left-0 overflow-y-auto py-4 w-64 md:w-1/4 bg-emerald-700 shadow-lg h-screen font-montserrat'>
            <ul>
                <li>
                    <a href={'/'} className="block px-6 py-4  text-white hover:bg-emerald-400  hover:font-extrabold">
                        Inicio
                    </a>
                </li>
                {!getToken()  ? (
                    <li>
                        <a href={'../login'} className="block px-6 py-4  text-white hover:bg-emerald-400  hover:font-extrabold">
                            Iniciar sesión
                        </a>
                    </li>
                ) : null}
                {getToken() ? (
                <li>
                    <a href={'../profile'} className="block px-6 py-4  text-white hover:bg-emerald-400  hover:font-extrabold">
                        Perfil
                    </a>
                </li>) : null}
                <li>
                    <a href={'/'} className="block px-6 py-4  text-white hover:bg-emerald-400  hover:font-extrabold">
                        Abarrotes
                    </a>
                </li>
                <li>
                    <a href={'/'} className="block px-6 py-4  text-white hover:bg-emerald-400  hover:font-extrabold">
                        Bebidas
                    </a>
                </li>
                <li>
                    <a href={'/'} className="block px-6 py-4  text-white hover:bg-emerald-400  hover:font-extrabold">
                        Cuidado personal
                    </a>
                </li>
                <li>
                    <a href={'/'} className="block px-6 py-4  text-white hover:bg-emerald-400  hover:font-extrabold">
                        Cuidado del hogar
                    </a>
                </li>
                <li>
                    <a href={'/'} className="block px-6 py-4  text-white hover:bg-emerald-400  hover:font-extrabold">
                        Cuidado de mascotas
                    </a>
                </li>
                <li>
                    <a href={'/'} className="block px-6 py-4  text-white hover:bg-emerald-400  hover:font-extrabold">
                        Productos congelados
                    </a>
                </li>
                {getToken() ? (
                    <li>
                        <a href={'../../mytickets'} className="block px-6 py-4  text-white hover:bg-emerald-400  hover:font-extrabold">
                            Mis pedidos
                        </a>
                    </li>
                ) : null}
                <li>
                    <a href={'../contactus'} className="block px-6 py-4  text-white hover:bg-emerald-400  hover:font-extrabold">
                        Contáctanos
                    </a>
                </li>
                <li>
                    <a href={'../faq'} className="block px-6 py-4  text-white hover:bg-emerald-400  hover:font-extrabold">
                        Preguntas frecuentes
                    </a>
                </li>
                <li>
                    <a href={'../help'} className="block px-6 py-4  text-white hover:bg-emerald-400  hover:font-extrabold">
                        Ayuda
                    </a>
                </li>
                <li>
                    <a href={'../aboutus'} className="block px-6 py-4  text-white hover:bg-emerald-400  hover:font-extrabold">
                        Quiénes somos
                    </a>
                </li>
                {getToken() ? (
                    <li>
                        <a onClick={logoutHandler} className="block px-6 py-4  text-white hover:bg-emerald-400  hover:font-extrabold">
                            Cerrar sesion
                        </a>
                    </li>
                ) : null}
                <li>
                    <a href={''} className="block px-6 py-4  text-white"></a>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
