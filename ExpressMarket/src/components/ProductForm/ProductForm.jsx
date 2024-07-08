import { Select } from "flowbite-react"
import Datepicker from "react-tailwindcss-datepicker"
import { useState } from "react";
import SaveButton from "../SaveButton/SaveButton";
import { allProductServices } from "../../services/ProductServices";
import moment from "moment";
import { allCategoryServices } from "../../services/CategoryServices";
import { ToastContainer, toast } from "react-toastify";
import CloudinaryUploadWidget, { IMAGE_URL } from "../CloudinaryUploadWidget/CloudinaryUploadWidget";
import { allCompanyServices } from "../../services/CompanyServices";

const URLImageRegex = /(https?:\/\/.*\.(?:png|jpg))/i;
const DEFAULT_IMG = "https://i.pinimg.com/564x/7e/96/cb/7e96cb6920cfc61852ec4b8c119d8b3c.jpg"

const ProductForm = ({ events = [], categories = [], companies = [] }) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    //const [category, setCategory] = useState('')
    const [productCategory, setProductCategory] = useState('')
    const [company, setCompany] = useState([])
    const [productCompany, setProductCompany] = useState('')
    const [price, setPrice] = useState(0)

    const onChange = (e, save) => {
        save(e.target.value);
    }

    /*async function getCategoryId(name) {
        if (typeof (name) === undefined || name !== '') {
            const categoryResponse = await allCategoryServices.getCategory(name)
            console.log(categoryResponse)
            setCategory(categoryResponse.data.id)
            setProductCategory(categoryResponse.data.category)
            return categoryResponse.data.id
        } else {
            toast("Seleccione una categoría válida", { type: "warning" })
        }
    }*/

    /*async function getCompanyId(name) {
        if (typeof (name) === undefined || name !== '') {
            const companyResponse = await allCompanyServices.getOneById(name)
            setCompany(companyResponse.data.id)
            setProductCompany(companyResponse.data.company)
            return categoryResponse.data.id
        } else {
            toast("Seleccione una categoría válida", { type: "warning" })
        }
    }*/

    const onCategoryChange = (e, save) => {
        //getCategoryId(e.target.value)
        console.log(e.target.value)
        save(e.target.value);
    }

    const onCompanyChange = (e, save) => {
        //getCompanyId(e.target.value)
        console.log(e.target.value)
        save(e.target.value);
    }

    async function onSubmit(e) {
        e.preventDefault();
        createProduct()
    }

    async function createProduct() {
        
        try {
            setImage(IMAGE_URL !== '' ? IMAGE_URL : DEFAULT_IMG)
            if (name != '' && price != '' && productCompany != '' && productCategory != '' && image != '') {
                //getCategoryId(productCategory)
                
                const response = await allProductServices.createProduct(name, IMAGE_URL, description, price, productCategory, productCompany)

                if (!response.success) {
                    toast("Algo salió mal!!! Intentelo en otro momento", { type: "error" })
                    throw new Error("Algo salió mal !!! :/")
                }

                toast('Evento creado correctamente', { type: 'success' })
                setName('')
                setImage('')
                setPrice('')
                setDescription('')
                setProductCategory('')
                setProductCompany('')
                window.location.reload()

            } else if (name != '' && price != '' && productCompany != '' && productCategory != '' && image == '') {
                toast("Seleccione una imagen, por favor", { type: "warning" })
            } else {
                toast("Campos vacíos, favor completar formulario", { type: "warning" })
            }

        } catch (error) {
            console.error({ error })
        }
    }

    return (
        <>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <form action="post" className="font-montserrat font-semibold" onSubmit={onSubmit}>
                <div className="p-4">
                    <label htmlFor="eventName" className="block mb-2 text-base text-emerald-800">Producto</label>
                    <input type="text" id="name" onChange={(e) => onChange(e, setName)} value={name} autoComplete="off" placeholder="Nombre del producto" className="block w-full mb-4 p-2 text-emerald-800 border border-emerald-600 hover:border-violet-700 rounded-lg shadow-md text-base focus:ring-blue-500 focus:border-blue-500" />
                    
                    <label htmlFor="description" className="block mb-2 text-base text-emerald-800">Descripción del producto</label>
                    <textarea type="text" id="description" onChange={(e) => onChange(e, setDescription)} value={description} autoComplete="off" placeholder="Descripción del producto" className="block w-full mb-4 p-2.5 text-emerald-800  border border-emerald-600 rounded-lg shadow-md text-base hover:border-violet-700 focus:ring-blue-500 focus:border-blue-500 resize-none" />

                    <div className="grid grid-flow-cols grid-cols-1 md:grid-cols-2">
                        <div className="mb-4 md:pr-2">
                            <label htmlFor="productCategory" className="block mb-2 text-base text-emerald-800">Categoría</label>
                            <Select id="productCategory"
                                onChange={(e) => onCategoryChange(e, setProductCategory)}
                                value={productCategory}
                                className="w-full mb-4 border border-emerald-600 rounded-lg shadow-md text-emerald-800 font-medium bg-white hover:border-violet-700 focus:ring-dark-violet focus:border-emerald-600">
                                <option > </option>
                                {categories.map((category) => {
                                    return (
                                        <option key={category.id} value={category.id}> {category.category} </option>
                                    )
                                })}
                            </Select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="price" className="block mb-2 text-base text-emerald-800">Precio</label>
                            <input type="number" id="price" step="0.01" onChange={(e) => onChange(e, setPrice)} value={price} autoComplete="off" placeholder="Precio" className="block w-full mb-4 p-2 text-emerald-800 border border-emerald-600 rounded-lg shadow-md text-base hover:border-violet-700 focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                    </div>
                    
                    <div className="grid grid-flow-cols grid-cols-1 md:grid-cols-2">
                    <div className="mb-4 md:pr-2">
                            <label htmlFor="productCompany" className="block mb-2 text-base text-emerald-800">Marca del producto</label>
                            <Select id="productCompany"
                                onChange={(e) => onCompanyChange(e, setProductCompany)}
                                value={productCompany}
                                className="w-full mb-4 border border-emerald-600 rounded-lg shadow-md text-emerald-800 font-medium bg-white hover:border-violet-700 focus:ring-dark-violet focus:border-emerald-600">
                                <option > </option>
                                {companies.map((company) => {
                                    return (
                                        <option key={company.id} value={company.id}> {company.company} </option>
                                    )
                                })}
                            </Select>
                        </div>
                        <div id="fileUpload">
                            <label htmlFor="image" className="block mb-2 text-base text-emerald-800">Imagen</label>
                            <p className="block text-base text-emerald-800 truncate">{image}</p>
                            <CloudinaryUploadWidget />
                        </div>
                    </div>

                    

                    <div className="flex justify-end mt-4">
                        <SaveButton />
                    </div>
                </div>
            </form>
        </>
    )
}

export default ProductForm