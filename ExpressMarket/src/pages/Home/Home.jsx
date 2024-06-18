import React, { useEffect, useState } from 'react';
import Footer from "../../components/Footer/Footer"
import Navbar from "../../components/Navbar/Navbar"
import Carousel from '../../components/Carousel/Carousel'
import Slider from '../../components/Carousel/Slider'
import { getEvents } from '../../services/UserService'
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
import "react-multi-carousel/lib/styles.css";
import Carousel2 from "react-multi-carousel";

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

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

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
            <div className='px-4 mx-auto mt-8 text-center max-w-7xl'>
                <p className= "mt-5 mb-2 text-3xl font-normal font-montserrat">Productos en oferta</p>
                <Carousel2 responsive={responsive} infinite={true} arrows={true}>
                    <HomeProduct
                            image={alpina}
                            name="Leche Entera"
                            category="Lácteos"
                            price={2.99}
                            savingsPercentage={5}
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
                            savingsPercentage={5}
                    />
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
                </Carousel2>
            </div>
            <Slider images={images} />
            <Footer />
        </div>
    )
}

export default Home;
