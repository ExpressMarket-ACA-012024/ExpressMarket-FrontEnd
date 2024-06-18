import React from 'react';
import Footer from "../../components/Footer/Footer"
import Navbar from "../../components/Navbar/Navbar"
import Carousel from '../../components/Carousel/Carousel'
import Slider from '../../components/Carousel/Slider'
import { useEffect, useState } from 'react';
import { getEvents } from '../../services/UserService'
import NavbarAdmin from '../../components/NavbarAdmin/NavbarAdmin';

function Home() {

    const [images, setImages] = useState([]);

    useEffect(() => {   
        if (images.length == 0) {
            async function fetchAllEvents() {
                let response = await getEvents();
                if (response.success) {
                    setImages(response.items);
                }
            }
            fetchAllEvents();
        }
    }), [setImages];

    return (
        <div>
            <div className="flex flex-wrap justify-center">
                <Navbar/>
                <Carousel />
                <div className="w-full md:w-1/3"></div>
                <div className="w-full">
                    <div className="w-2/3 mx-auto text-3xl text-center font-montserrat m-14 text-pure-indigo">
                        <p className='mb-2'>
                            En Ticketify podrás encontrar las entradas para los mejores conciertos, festivales, deportes y eventos en vivo de todo
                            el país.
                        </p>
                        <p className='mb-4'>
                            No pierdas la oportunidad de vivir una experiencia única.
                        </p>
                        <p className='mb-4'>
                            Compra tus entradas ahora y prepárate para disfrutar de los eventos más emocionantes del año.
                        </p>
                        <p className='mb-4 font-medium'>
                            ¡Únete a la diversión en vivo con nosotros!
                        </p>
                    </div>
                </div>
                <div className="w-full md:w-1/3"></div>
            </div>

            <hr className="m-2 bg-silver" />

            <div>
                <a href={'/events'}>
                    <p className='mt-6 ml-4 text-5xl font-extrabold text-pure-indigo font-montserrat'>Próximos eventos </p>
                </a>
            </div>

            <Slider images={images}/>
            <Footer />
        </div>
    )
}

export default Home
