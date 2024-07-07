import React, { useState, useEffect } from 'react'
import Image1 from '../../assets/img/imagenv1.png'
import Image2 from '../../assets/img/imagenv2.png'
import Image3 from '../../assets/img/imagenv3.png'
import Image4 from '../../assets/img/imagenv4.png'


const Carousel = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [Image1, Image2, Image3, Image4];
  const texts = [
    "Bienvenido a ExpressMarket, tu supermercado en línea de confianza",
    "Descubre nuestras ofertas y promociones exclusivas",
    "Regístrate ahora y empieza a ahorrar en tus compras diarias",
    "Explora ExpressMarket, donde cada sucursal está a un clic de distancia"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="mt-12 -z-10">
      <div className="overflow-hidden">
        <div className="flex h-full transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentImage * 100}%)` }}>
          {images.map((image, index) => (
            <div key={index} className="relative flex-shrink-0 w-full">
              <img src={image} alt={`Image ${index + 1}`} className="object-fill w-full h-96" />
              <div className="absolute left-0 right-0 flex justify-center bottom-4">
                {images.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 w-2 rounded-full mx-1 ${i === currentImage ? 'bg-white' : 'bg-silver'}`}
                  ></div>
                ))}
              </div>
              <div className="absolute font-extrabold text-center text-black transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 lg:text-5xl sm:text-2xl md:text-3xl font-monserat">
                {texts[index]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Carousel
