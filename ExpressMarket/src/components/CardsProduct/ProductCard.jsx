import React from "react";
import CardP from "../Product/CardP";

const staticProducts = [
    {
        id: '1',
        name: 'Manzanas',
        image: 'https://media.justo.mx/products/12637-0.jpg',
        category: 'Frutas',
        description: 'Manzanas frescas',
        price: '$1.99 / lb'
    },
    {
        id: '2',
        name: 'Leche',
        image: 'https://walmartsv.vtexassets.com/arquivos/ids/404529/Leche-Fresca-Salud-Entera-Carton-900Ml-2-14876.jpg?v=638423887685370000',
        category: 'Lácteos',
        description: 'Leche entera de vaca',
        price: '$3.49 / galón'
    },
];

const ProductCard = () => {
    return (
        <div>
            <div className="container mx-auto">
                <h1 className="m-4 text-4xl font-bold text-green-700">Productos</h1>
                <div className="grid grid-cols-1 gap-8 px-4 pb-4 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {staticProducts.map((product, index) => (
                        <CardP
                            key={index}
                            code={product.id}
                            name={product.name}
                            image={product.image}
                            category={product.category}
                            description={product.description}
                            price={product.price}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductCard;


