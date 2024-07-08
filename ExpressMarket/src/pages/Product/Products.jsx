import React, { useEffect, useState } from 'react';
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import ProductCard from '../../components/CardsProduct/ProductCard';
import { getEvents } from '../../services/UserService';

function Products() {
    const [events, setEvents] = useState([]);

    useEffect(() => {   
        if (events.length === 0) {
            async function fetchAllEvents() {
                let response = await getEvents();
                if (response.success) {
                    setEvents(response.items);
                }
            }
            fetchAllEvents();
        }
    }, [events]);

    return (
        <div className='bg-light-gray font-montserrat'>
            <Navbar />
            <ProductCard />
            <Footer />
        </div>
    );
}

export default Products;
