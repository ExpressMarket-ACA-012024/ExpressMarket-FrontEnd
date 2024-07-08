import { allProductServices } from "../../services/ProductServices";
import { toast } from "react-toastify";
import { useState } from "react";
import CloudinaryUploadWidget, {
  IMAGE_URL,
} from "../CloudinaryUploadWidget/CloudinaryUploadWidget";
import { Select } from "flowbite-react";
import Datepicker from "react-tailwindcss-datepicker";
import { allCategoryServices } from "../../services/CategoryServices";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import moment from "moment-timezone";
import SaveButton from "../SaveButton/SaveButton";

const URLImageRegex = /(https?:\/\/.*\.(?:png|jpg))/i;
const DEFAULT_IMG =
  "https://i.pinimg.com/564x/7e/96/cb/7e96cb6920cfc61852ec4b8c119d8b3c.jpg";

const ProductsAdminCard = ({ products = [], categories = [], companies = [] }) => {
  moment.locale();

  const [eventToEdit, setEventToEdit] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function deleteProduct(id) {
    try {
      const response = await allProductServices.deleteProduct(id);
      if (!response.success) {
        toast("Algo salió mal.", { type: "error" });
        throw new Error("Something was wrong");
      }

      toast("Producto eliminado", { type: "success" });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  async function getProductById(id) {
    try {
      const response = await allProductServices.getProductById(id);
      if (!response.success) {
        toast("Algo salió mal", { type: "error" });
        throw new Error("Something was wrong");
      }
      setEventToEdit(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error(error);
    }
  }

  const onClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 place-items-center">
      {products.map((product) => {
        return (
          <div key={product.id} className="min-w-full max-w-xl px-8 py-4">
            <div className="flex flex-col items-center bg-white rounded-lg shadow-md hover:shadow-2xl md:flex-row min-w-full md:max-w-full max-h-full md:h-80 md:max-h-80 font-montserrat">
              <img
                className="object-cover w-full rounded-t-lg h-72 md:h-80 md:w-44 md:rounded-none md:rounded-l-lg"
                src={product.image ? product.image : DEFAULT_IMG}
                alt={product.name}
              />
              <div className="flex flex-col justify-between p-8 leading-normal w-full md:h-80 md:max-h-80">
                <p className="mb-1 font-semibold text-xl text-emerald-800 break-words">
                  <b> {product.name} </b>
                </p>
                <p className="mb-1 font-medium text-emerald-800 break-words">
                  <b>Marca </b> {product.company?.company}{" "}
                </p>
                <p className="mb-1 font-medium text-emerald-800 break-words">
                  <b>Precio </b> $ {product.price.toFixed(2)}{" "}
                </p>
                <p className="mb-1 font-medium text-emerald-800 break-words">
                  <b>Categoria </b> {product.category?.category}{" "}
                </p>
                <div className="space-x-2 text-right w-full">
                  <button
                    onClick={() => getProductById(product.id)}
                    type="submit"
                    className="rounded-lg left-2 bg-golden-yellow hover:bg-yellow-400 w-12 h-12 max-h-fit p-2 text-white md:text-sm my-auto font-montserrat"
                  >
                    <span>
                      <EditIcon className="align-text-center" />{" "}
                    </span>
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="rounded-lg bg-orange-600 hover:bg-orange-500 w-12 h-12 max-h-fit p-2 text-white md:text-sm my-auto font-montserrat"
                    type="submit"
                  >
                    <span>
                      <DeleteIcon />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {isModalOpen && (
        <EditEventModal
          product={eventToEdit}
          categories={categories}
          companies={companies}
          onClose={onClose}
        />
      )}
    </div>
  );
};

function EditEventModal({ product, categories, companies, onClose }) {

  const [name, setName] = useState(product.name);
  const [image, setImage] = useState(product.image);
  const [newImage, setNewImage] = useState("");
  const [isNewImageUploaded, setIsNewImageUploaded] = useState(false);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const [category, setCategory] = useState(product.category.id);
  const [productCategory, setProductCategory] = useState(product.category.category);
  const [company, setCompany] = useState(product.company.id);
  const [productCompany, setProductCompany] = useState(product.company.company);

  async function getCategoryId(name) {
    if (typeof name === undefined || name !== "") {
      const categoryResponse = await allCategoryServices.getCategoryByName(
        name
      );
      setCategory(categoryResponse.data.id);
      setEventCategory(categoryResponse.data.category);
      return categoryResponse.data.id;
    } else {
      toast("Seleccione una categoría válida", { type: "warning" });
    }
  }

  const onCategoryChange = (e, save) => {
    save(e.target.value);
}

const onCompanyChange = (e, save) => {
    save(e.target.value);
}

  const onChange = (e, save) => {
    save(e.target.value);
  };

  async function updateProduct() {
    try {
      let newImg = "";
      let showImgToast = true;
      setNewImage(IMAGE_URL !== "" ? IMAGE_URL : image);

      if (IMAGE_URL !== "") {
        setNewImage(IMAGE_URL);
        setIsNewImageUploaded(true);
        newImg = IMAGE_URL;
      }

      if (isNewImageUploaded) {
        if (
          name != "" &&
          description != "" &&
          price != "" &&
          company != "" &&
          category != "" &&
          newImage != ""
        ) {
          if (IMAGE_URL !== "") {
            setNewImage(IMAGE_URL);
            newImg = IMAGE_URL;
          } else {
            setNewImage(image);
            newImg = image;
          }
          const response = await allProductServices.updateProduct(
            name,
            newImg,
            category,
            description,
            price,
            company,
            product.id,
          );

          if (!response.success) {
            toast("Algo salió mal!!! Intentelo en otro momento", {
              type: "error",
            });
            throw new Error("Algo salió mal !!! :/");
          }

          toast("Evento actualizado correctamente", { type: "success" });
          showImgToast = false;
          window.location.reload();
        } else if (title == '' || address == '' || place == '' || date == '' || hour == '') {
          toast("Campos vacíos, favor completar formulario", { type: "warning" });
        }
      } else if (!isNewImageUploaded) {
        if (
          name != product.name && name != '' ||
          price != product.price && price != '' ||
          description != product.description && description != '' ||
          (category != product.category.id && newImage != "")
        ) {
          if (IMAGE_URL !== "") {
            setNewImage(IMAGE_URL);
            newImg = IMAGE_URL;
          } else {
            setNewImage(image);
            newImg = image;
          }
          const response = await allProductServices.updateProduct(
            name,
            newImg,
            category,
            description,
            price,
            company,
            product.id,
          );

          if (!response.success) {
            toast("Algo salió mal!!! Intentelo en otro momento", {
              type: "error",
            });
            throw new Error("Algo salió mal !!! :/");
          }

          toast("Evento actualizado correctamente", { type: "success" });
          window.location.reload();
        } else if (title == '' || address == '' || place == '' || date == '' || hour == '') {
          toast("Campos vacíos, favor completar formulario", { type: "warning" });
        } 
      } 

      if (newImage != "" && IMAGE_URL !== "" && showImgToast) {
        toast(
          "Imagen subida, haga click el botón de 'Guardar' para actualizar",
          { type: "info" }
        );
        showImgToast = false;
      }
    } catch (error) {
      console.error({ error });
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    updateProduct();
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10">
      <div className="bg-white w-10/12 md:w-1/2 py-2 px-4 rounded-lg shadow-md my-auto h-modal overflow-y-auto">
        <h2 className="text-lg text-emerald-800 font-montserrat font-extrabold">Editar producto</h2>
        <div>
            <form action="post" className="font-montserrat font-semibold" onSubmit={onSubmit}>
                <div className="p-4">
                    <label htmlFor="productName" className="block mb-2 text-base text-emerald-800">Producto</label>
                    <input type="text" id="name" onChange={(e) => onChange(e, setName)} value={name} autoComplete="off" placeholder="Nombre del producto" className="block w-full mb-4 p-2 text-emerald-800 border border-emerald-600 hover:border-violet-700 rounded-lg shadow-md text-base focus:ring-blue-500 focus:border-blue-500" />            
                    
                    <label htmlFor="description" className="block mb-2 text-base text-emerald-800">Descripción del producto</label>
                    <textarea type="text" id="description" onChange={(e) => onChange(e, setDescription)} value={description} autoComplete="off" placeholder="Descripción del producto" className="block w-full mb-4 p-2.5 text-emerald-800  border border-emerald-600 rounded-lg shadow-md text-base hover:border-violet-700 focus:ring-blue-500 focus:border-blue-500 resize-none" />
                    <div className="grid grid-flow-cols grid-cols-1 md:grid-cols-2">
                       <div className="mb-4 md:pr-2">
                            <label htmlFor="productCategory" className="block mb-2 text-base text-emerald-800">Categoría</label>
                            <Select id="productCategory"
                                onChange={(e) => onCategoryChange(e, setCategory)}
                                value={category}
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
                                onChange={(e) => onCompanyChange(e, setCompany)}
                                value={company}
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
        </div>
      </div>
    </div>
  );
}

export default ProductsAdminCard;
