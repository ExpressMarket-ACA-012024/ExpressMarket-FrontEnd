import React from 'react';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';

const CardP = ({ code, name, category, description, price, image }) => {
    return (
        <div className="max-w-md overflow-hidden transition duration-300 transform bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg hover:scale-105">
            <div className="flex items-center justify-between p-4">
                <div className="flex-shrink-0 w-32 h-32 mr-4 overflow-hidden rounded-lg">
                    <a href={`./product/${code}/`}>
                        <img className="object-cover w-full h-full" src={image} alt={name} />
                    </a>
                </div>
                <div className="flex-1">
                    <a href={`./product/${code}/`}>
                        <h5 className="mb-2 text-lg font-bold text-green-700">{name}</h5>
                        <ul className="pl-0 mt-2 space-y-2 text-sm text-green-700">
                            <li className="flex items-center">
                                <LocalGroceryStoreOutlinedIcon className="mr-2" />
                                <span className="font-semibold">{category}</span>
                            </li>
                            <li className="flex items-center">
                                <DescriptionOutlinedIcon className="mr-2" />
                                <span>{description}</span>
                            </li>
                            <li className="flex items-center">
                                <MonetizationOnOutlinedIcon className="mr-2" />
                                <span>{price}</span>
                            </li>
                        </ul>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default CardP;





