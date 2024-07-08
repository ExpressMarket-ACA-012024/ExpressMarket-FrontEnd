import React, { useEffect, useState } from 'react';
import Logo from '../../assets/img/ExpressMarketLogo.png';
import { AllStoresService, updateUserStore} from "../../services/MapService"
import {MapContainer, Marker, TileLayer, Tooltip, useMapEvent} from 'react-leaflet'
import 'tailwindcss/tailwind.css';
import 'leaflet/dist/leaflet.css';

function mapa(){

    const [stores, setStores] = useState([])
    const posicionInicial = [13.683028, -89.235055]
    const [selectedStore, setSelectedStore] = useState(null)

    const customIcon = new L.Icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/3448/3448673.png', // URL de tu ícono personalizado
        iconSize: [100, 100], // Ajusta el tamaño del ícono
        //iconAnchor: [40, 40], // Punto del ícono que se ubicará en la posición del marcador
        //popupAnchor: [0, -40], // Punto desde el cual el pop-up se ubicará en relación con el icono
      });

    const fetchStores = async () => {
        try {
            let response = await AllStoresService()
            let marcadores = []

            if (!response.success) {
                toast("Algo salió mal.", { type: 'error' })
                throw new Error('Algo salió mal')
            }

            response.user.forEach((store) => {
                marcadores.push({
                    id: store.id,
                    position: [store.latitud, store.longitud],
                    description: store.description
                })
            });
            console.log(marcadores)
            setStores(marcadores)
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        fetchStores();
    }, []);

    function EventoClickMapa({ onClick }){
        useMapEvent({
            click: (e) => {
                onClick(e.latlng)
            }
        })
    }

    const EventoClickMarket = async (id) => {
        setSelectedStore(id);

        try {
            let response = await updateUserStore(id)
            //let marcadores = []

            if (!response.success) {
                toast("Algo salió mal.", { type: 'error' })
                throw new Error('Algo salió mal')
            }

            window.location.href = './';

            console.log(response)
            
        } catch (error) {
            console.error(error);
        }

        console.log(id);
    };

    return (
        <>
            <div className='h-[98vh] bg-gray-100 flex items-center justify-center p-4'> {/* Clases de Tailwind para estilizar el contenedor */}
                <MapContainer 
                    center={posicionInicial} 
                    zoom={17} 
                    scrollWheelZoom={false} 
                    className="h-full w-full max-h-[90vh] max-w-[90vw] shadow-lg rounded-lg" // Clases de Tailwind para estilizar el mapa
                >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {stores.map((store) =>(
                    <Marker key={store.id} position={store.position} icon={customIcon} eventHandlers={{
                        click: () => EventoClickMarket(store.id)
                    }}>
                        <Tooltip direction='top' offset={[0,-50]} opacity={1} permanent>{store.description}</Tooltip>
                    </Marker>
                ))}
                <EventoClickMapa onClick={(posicion) => console.log(posicion)} />
                </MapContainer>
            </div>
        </>
      );

}

export default mapa;