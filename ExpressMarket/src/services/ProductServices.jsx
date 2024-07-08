import axios from "axios";
import { fetchAllProducts, createProduct, updateProduct, deleteProduct, getProductById, getOneEventByTitle, getEventsByCategory } from "../helpers/AdminHelper";

const services = {};

export const allProductServices = {
    // Servicio para obtener todos los productos
    getProducts: async (name, size, page) => {
        try {
            const result = await fetchAllProducts( name, size, page )
            return { items: result, success: true }
        } catch (error) {
            return { items: [], success: false }
        }
    },

    // Servicio para obtener un producto por id
    getProductById: async (id) => {
        try {
            const result = await getProductById({ id });
            return { data: result, success: true };

        } catch (error) {
            console.error({ error });
            return { data: '', success: false };
        }
    },

    // Servicio para crear un producto
    createProduct: async ( name, image, description, price, productCategory, productCompany ) => {
        try {
            const result = await createProduct({ name, image, description, price, productCategory, productCompany });
            return { data: result, success: true };

        } catch (error) {
            console.error({ error });
            return { data: '', success: false };
        }
    },

    // Servicio para actualizar un producto
    updateProduct: async ( name, image, category, description, price, company, id ) => {
        try {
            const result = await updateProduct({ name, image, category, description, price, company, id });
            return { data: result, success: true };

        } catch (error) {
            console.error({ error });
            return { data: '', success: false };
        }
    },

    // Servicio para eliminar un producto
    deleteProduct: async (id) => {
        try {
            const result = await deleteProduct(id);
            return { data: result, success: true };

        } catch (error) {
            console.error({ error });
            return { data: '', success: false };
        }
    },

    getEventByTitle: async (event) => {
        try {
            const result = await getOneEventByTitle({ event });
            return { data: result, success: true };

        } catch (error) {
            console.error({ error });
            return { data: '', success: false };
        }
    },

    getEventsByCategory: async (category) => {
        try {
            const result = await getEventsByCategory({ category });
            return { data: result, success: true }
        } catch (error) {
            return { data: '', success: false }
        }
    },
}

export default services;