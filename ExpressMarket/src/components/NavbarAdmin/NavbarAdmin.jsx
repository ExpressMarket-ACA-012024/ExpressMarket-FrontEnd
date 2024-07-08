import { useState } from 'react'
import logo from '../../assets/img/ticketifyLogo.png'
import iconNav from '../../assets/img/iconNav.png'
import SidebarAdmin from './SidebarAdmin/SidebarAdmin'

const NavbarAdmin = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleSidebar = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className='w-full fixed'>
            <nav className='grid grid-flow-col-dense w-full h-12 bg-emerald-700 py-2 md:py-0'>
                <div className='w-auto h-full relative'>
                    <button onClick={toggleSidebar} type="button" className="md:absolute md:inset-y-1 md:left-0 md:mr-4 p-2 ml-4 text-right text-sm text-white rounded-lg" aria-controls="navbar-hamburger" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <img src={iconNav} className="h-4 w-5" alt="#" />
                    </button>
                </div>
                {/*<div className='w-fit h-full'>
                    <a href={'/'} className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
                    </a>
                </div>*/}
            </nav>
            {isVisible && (<SidebarAdmin />)}
        </div>
    )
}

export default NavbarAdmin