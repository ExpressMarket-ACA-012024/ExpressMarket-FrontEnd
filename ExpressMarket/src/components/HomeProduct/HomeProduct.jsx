import React, { useState } from 'react';

const HomeProduct = ({ image, name, category, price, savingsPercentage }) => {
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);

    const addToCart = () => {
        setAddedToCart(true);
        setTimeout(() => {
            setAddedToCart(false);
        }, 2000);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    return (
        <div className="overflow-hidden rounded shadow-lg font-montserrat justify-items-center">
            <div className="flex items-center justify-center w-full h-48 bg-gray-100">
                <img className="object-contain w-full h-full" src={image} alt={name} />
            </div>
            <div className="px-4 py-2">
                <div className="mb-1 text-base font-bold">{name}</div>
                <p className="mb-1 text-gray-700">{category}</p>
                <p className="mb-1 text-gray-700">${price.toFixed(2)}</p>
                {savingsPercentage && (
                    <p className="mb-1 text-red-500">Ahorro del {savingsPercentage}%</p>
                )}
            </div>
            <div className="flex items-center justify-between px-4 py-2">
                <div className="flex items-center">
                    <button
                        className="px-4 py-2 font-normal text-white bg-green-500 rounded-l hover:bg-green-700"
                        onClick={decrementQuantity}
                    >
                        -
                    </button>
                    <span className="px-4 py-2 text-center">{quantity}</span>
                    <button
                        className="px-4 py-2 font-normal text-white bg-green-500 rounded-r hover:bg-green-700"
                        onClick={incrementQuantity}
                    >
                        +
                    </button>
                </div>
                
                <button
                    className="px-2 py-1 text-sm font-normal text-white bg-green-500 rounded hover:bg-green-700"
                    onClick={addToCart}
                >
                    {addedToCart ? 'Agregado!' : (
                        <>
                            <svg className="inline-block w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                            Agregar
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default HomeProduct;



