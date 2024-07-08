import Footer from "../../components/Footer/Footer"
import ProductsAdminCard from "../../components/ProductsAdminCard/ProductsAdminCard"
import ProductForm from "../../components/ProductForm/ProductForm"
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import NavbarAdmin from "../../components/NavbarAdmin/NavbarAdmin"
import { useEffect, useState } from "react"
import { allProductServices } from "../../services/ProductServices"
import { allCategoryServices } from "../../services/CategoryServices"
import { ToastContainer, toast } from "react-toastify"
import { Select } from "flowbite-react"
import { allCompanyServices } from "../../services/CompanyServices"

const DEFAULT_IMG = "https://ipmark.com/wp-content/uploads/eventos-de-marketing-2021.jpg"

const ProductsAdmin = () => {

    const [page, setPage] = useState(0);
    const [isNextPageAvailable, setIsNextPageAvailable] = useState(true);
    const [totalPages, setTotalPages] = useState(1)
    const [products, setProducts] = useState([]);
    const [title, setTitle] = useState("");
    const [searchEvent, setSearchEvent] = useState('')
    const [categories, setCategories] = useState([])
    const [productCategory, setProductCategory] = useState('')
    const [companies, setCompanies] = useState([])
    const [productCompany, setProductCompany] = useState('')

    useEffect(() => {
        let fetchProducts = async () => {
            try {
                const filters = { name: searchEvent, size: 10, page: page }
                const response = await allProductServices.getProducts(filters)

                if (!response.success) {
                    throw new Error('Algo salió mal')
                }

                setProducts(response.items)
            } catch (error) {
                console.error(error);
            }
        };
        fetchProducts();

        let fetchCategories = async () => {
            try {
                const filters = { title: title, size: 10, page: page }
                let response = await allCategoryServices.getAllCategories(filters)

                if (!response.success) {
                    throw new Error('Algo salió mal')
                }

                setCategories(response.items)
            } catch (error) {
                console.error(error);
            }
        };
        fetchCategories();

        let fetchCompanies = async () => {
            try {
                let response = await allCompanyServices.getAllCompanies()

                if (!response.success) {
                    throw new Error('Algo salió mal')
                }

                setCompanies(response.items)
            } catch (error) {
                console.error(error);
            }
        };
        fetchCompanies();
    }, [page]);

    const next = () => {
        if (isNextPageAvailable) {
            window.scrollTo(0, 0);
            setPage(page + 1);
        }
    }

    const prev = () => {
        if (page > 0) {
            window.scrollTo(0, 0);
            setPage(page - 1);
        }
    }

    const onChange = (e, save) => {
        save(e.target.value);
    }

    const onIndexChange = (e, save) => {
        getCategoryId(e.target.value)
        save(e.target.value);
    }

    async function onSubmit(e) {
        e.preventDefault();
        searchEventByTitle()
    }

    async function onFilter(e) {
        e.preventDefault();
        searchEventsByCategory()
    }

    async function getCategoryId(name) {
        if (typeof (name) === undefined || name !== '') {
            const categoryResponse = await allCategoryServices.getCategoryByName(name)
            setCategory(categoryResponse.data.id)
            setProductCategory(categoryResponse.data.category)
            return categoryResponse.data.id
        } else {
            toast("Seleccione una categoría válida", { type: "warning" })
        }
    }

    async function searchEventByTitle() {
        try {
            const response = await allProductServices.getEventByTitle(searchEvent)

            if (!response.success) {
                toast("No se encontró el evento.", { type: 'warning' })
                throw new Error("Algo salió mal !!! :/")
            }

            toast("Evento encontrado", { type: 'success' })
            //setProducts(response.data)
            setSearchEvent('')
        } catch (error) {
            console.error({ error })
        }
    }

    async function searchEventsByCategory() {
        try {
            const response = await allProductServices.getEventsByCategory(category)

            if (!response.success) {
                toast("No se encontró el evento.", { type: 'error' })
                throw new Error("Algo salió mal !!! :/")
            } else if (response.data.length === 0) {
                toast("No hay eventos en la categoría seleccionada", { type: "info" })
            } else {
                toast("Eventos encontrados", { type: 'success' })
                setProducts(response.data)
            }

            setSearchEvent('')
        } catch (error) {
            console.error({ error })
        }
    }

    return (
        <div className="w-full max-w-full bg-light-gray">
            <NavbarAdmin />
            <div className="p-4">
                <h1 className="text-emerald-800 font-montserrat font-bold text-5xl mt-12">Productos</h1>
            </div>
            {/*<div className="grid md:grid-cols-2 p-4 mt-4 w-full max-w-full">
                <form className="mx-4" onSubmit={onSubmit}>
                    <label
                        htmlFor="searchedEvent"
                        className="mb-2 text-sm font-medium text-gray-900 sr-only">Search
                    </label>
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <input
                            type="search"
                            id="searchedEvent"
                            onChange={(e) => onChange(e, setSearchEvent)}
                            value={searchEvent}
                            className="block w-full p-2.5 pl-10 md:mt-7 text-base text-penn-blue font-medium border border-gray-300 hover:border-pure-indigo rounded-3xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar" required />
                        <button type="submit" className="text-white absolute right-2.5 bottom-1.5 bg-pure-indigo hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Buscar</button>
                    </div>
                </form>
                <form action="" onSubmit={onFilter}>
                    <div className="relative w-72 md:w-1/2">
                        <p className='mb-2 font-medium text-dark-violet'>Filtrar por categoría: </p>
                        <Select id="productCategory"
                            onChange={(e) => onIndexChange(e, setProductCategory)}
                            value={productCategory}
                            className="relative md:w-72 mb-4 border border-dark-violet rounded-lg shadow-md text-dark-violet font-medium bg-white hover:border-violet-700 focus:ring-dark-violet focus:border-dark-violet">
                            <option > </option>
                            {categories.map((category) => {
                                return (
                                    <option key={category.id}> {category.category} </option>
                                )
                            })}
                        </Select>
                        <button type="submit" className="text-white absolute -right-24 md:-right-48 lg:-right-28 bottom-1.5 bg-pure-indigo hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Filtrar</button>
                    </div>
                </form>
            </div>*/}
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
            <ProductsAdminCard 
                products={products} 
                categories={categories}
                companies={companies} 
            />
            {/*<div className="text-center mx-auto mt-8">
                <button className='rounded-full left-2 border border-pure-indigo bg-light-gray text-pure-indigo hover:bg-pure-indigo hover:text-white w-16 h-10 p-2 ml-4 md:text-sm my-auto font-montserrat' onClick={prev}>
                    <span><ArrowBackIcon /></span>
                </button>
                <button className='rounded-full left-2 border border-pure-indigo bg-light-gray text-pure-indigo hover:bg-pure-indigo hover:text-white w-16 h-10 p-2 ml-4 md:text-sm my-auto font-montserrat' onClick={next}>
                    <span><ArrowForwardIcon /></span>
                </button>
            </div>*/}
            <div className="grid grid-cols-1 p-4 mt-4 max-w-full">
                <h2 className="text-emerald-600 text-3xl font-montserrat">Agregar producto</h2>
                <hr className="mt-4 bg-penn-blue h-0.5" />
            </div>
            <div className="grid grid-cols-1 md:w-1/2 m-auto mb-8">
                <ProductForm categories={categories} companies={companies} />
            </div>
            <Footer />
        </div>
    )
}

export default ProductsAdmin