import logo from '../../assets/img/ticketifyWhiteLogo.png'
import homeIcon from '../../assets/img/homeIcon.png'
import callIcon from '../../assets/img/callIcon.png'
import whatsappIcon from '../../assets/img/whatsappIcon.png'
import EML from '../../assets/img/ExpressMarketLogo.png'

const Footer = () => {
    return (
        <>
            <footer className="bg-emerald-700 text-white p-10">
                <div className="flex justify-center space-x-16 mb-4">
                    <img src={homeIcon} alt="Home redirection" className="h-10 hover:cursor-pointer" />
                    <img src={callIcon} alt="Numeros de telefono" className="h-10 hover:cursor-pointer" />
                    <img src={whatsappIcon} alt="WhatsApp link" className="h-10 hover:cursor-pointer" />
                </div>
                <div className="flex justify-center space-x-6 mb-4 pt-6">
                    <button className="text-white hover:underline">Info</button>
                    <a>•</a>
                    <button className="text-white hover:underline">Soporte</button>
                    <a>•</a>
                    <button className="text-white hover:underline">Marketing</button>
                </div>
                <div className="flex justify-center space-x-6 mb-4">
                    <button className="text-white hover:underline">Terms of Use</button>
                    <a>•</a>
                    <button className="text-white hover:underline">Privacy Policy</button>
                </div>
                <div className="text-gray-100 text-center mb-4 font-bold">
                    © Derechos reservados
                </div>
                <div className="flex justify-end">
                    <img src={EML} alt="Express Market Logo" className="h-10 w-10" />
                </div>
            </footer>
        </>
    )
}

export default Footer