import React, { useEffect, useState } from 'react';
import Footer from "../../components/Footer/Footer"
import Navbar from "../../components/Navbar/Navbar"
import Carousel from '../../components/Carousel/Carousel'
import Slider from '../../components/Carousel/Slider'
import { getEvents } from '../../services/UserService'
import NavbarAdmin from '../../components/NavbarAdmin/NavbarAdmin';
import logo from "../../assets/img/ExpressMarketLogo.png";
import lacteos from "../../assets/img/lacteos2.jpg";
import fyv from "../../assets/img/frutasyverduras.jpg";
import personal from "../../assets/img/cuidadopersonal.jpg";
import hogar from "../../assets/img/cuidadodelhogar.png";
import HomeProduct from '../../components/HomeProduct/HomeProduct';
import alpina from "../../assets/img/alpina.jpg";
import colgate from "../../assets/img/colgate.jpg";
import cubata from "../../assets/img/cubata.jpg";
import diamond from "../../assets/img/diamond.jpg";
import banner from "../../assets/img/bannerhome.png";


function Home() {

    const [images, setImages] = useState([]);

    useEffect(() => {
        if (images.length === 0) {
            async function fetchAllEvents() {
                let response = await getEvents();
                if (response.success) {
                    setImages(response.items);
                }
            }
            fetchAllEvents();
        }
    }, [images]);
    
    return (
        <div>
            <div className="flex flex-wrap justify-center">
                <Navbar />
                <Carousel />
            </div>
            <div className="px-4 mx-auto mt-8 text-center max-w-7xl">
                <h2 className="mb-4 text-3xl font-normal font-montserrat">Categorías destacadas</h2>
                <div className="flex justify-center gap-4">
                    <button className="relative w-1/4 overflow-hidden bg-center bg-cover rounded-lg shadow-lg" style={{ backgroundImage: `url(${lacteos})`, height: '220px' }}>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white transition duration-300 bg-green-700 bg-opacity-0 hover:bg-opacity-50">
                            <h3 className="text-xl font-semibold font-montserrat">Lácteos</h3>
                        </div>
                    </button>
                    <button className="relative w-1/4 overflow-hidden bg-center bg-cover rounded-lg shadow-lg" style={{ backgroundImage: `url(${fyv})`, height: '220px' }}>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white transition duration-300 bg-green-700 bg-opacity-0 hover:bg-opacity-50">
                            <h3 className="text-xl font-semibold font-montserrat">Frutas y Verduras</h3>
                        </div>
                    </button>
                    <button className="relative w-1/4 overflow-hidden bg-center bg-cover rounded-lg shadow-lg" style={{ backgroundImage: `url(${personal})`, height: '220px' }}>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white transition duration-300 bg-green-700 bg-opacity-0 hover:bg-opacity-50">
                            <h3 className="text-xl font-semibold font-montserrat">Cuidado Personal</h3>
                        </div>
                    </button>
                    <button className="relative w-1/4 overflow-hidden bg-center bg-cover rounded-lg shadow-lg" style={{ backgroundImage: `url(${hogar})`, height: '220px' }}>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white transition duration-300 bg-green-700 bg-opacity-0 hover:bg-opacity-50">
                            <h3 className="text-xl font-semibold font-montserrat">Cuidado del Hogar</h3>
                        </div>
                    </button>
                </div>
                <img  className=" my-9" src={banner} />
            </div>
            <div className='text-center'>
                <p className= "mt-5 mb-2 text-3xl font-normal font-montserrat">Productos de temporada</p>
                <div className="grid grid-cols-1 gap-6 mx-auto mt-6 max-w-7xl sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                    <HomeProduct
                            image={alpina}
                            name="Leche Entera"
                            category="Lácteos"
                            price={2.99}
                            savingsPercentage={10}
                    />
                    <HomeProduct
                            image={cubata}
                            name="Manzanas"
                            category="Frutas y Verduras"
                            price={1.49}
                            savingsPercentage={10}
                    />
                    <HomeProduct
                            image={diamond}
                            name="Jabón Corporal"
                            category="Cuidado Personal"
                            price={3.99}
                            savingsPercentage={10}
                    />
                    <HomeProduct
                            image={colgate}
                            name="Detergente"
                            category="Cuidado del Hogar"
                            price={4.49}
                            savingsPercentage={10}
                    />
                </div>
            </div>
            <Slider images={images} />
            <Footer />
        </div>
    )
}

export default Home;