import axios from "axios";
import { fetchAllProducts, createProduct, updateEvent, changeEventStatus, getOneEventById, getOneEventByTitle, getEventsByCategory } from "../helpers/AdminHelper";

const services = {};

export const allProductServices = {
    getProducts: async (name, size, page) => {
        try {
            const result = await fetchAllProducts( name, size, page )
            //return { items: result.items, totalPages: result.totalPages, totalElements: result.totalElements, isNextPageAvailable: result.isNextPageAvailable, success: true }
            return { items: result, success: true }
        } catch (error) {
            return { items: [], success: false }
        }
    },

    getEventById: async (id) => {
        try {
            const result = await getOneEventById({ id });
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

    createProduct: async ( name, image, description, price, productCategory, productCompany ) => {
        try {
            const result = await createProduct({ name, image, description, price, productCategory, productCompany });
            console.log("service")
            console.log(result)
            return { data: result, success: true };

        } catch (error) {
            console.error({ error });
            return { data: '', success: false };
        }
    },

    updateEvent: async ( id, title, image, date, hour, place, address, category ) => {
        try {
            const result = await updateEvent({ id, title, image, date, hour, place, address, category });
            return { data: result, success: true };

        } catch (error) {
            console.error({ error });
            return { data: '', success: false };
        }
    },

    changeStatus: async (id) => {
        try {
            const result = await changeEventStatus(id);
            return { data: result, success: true };

        } catch (error) {
            console.error({ error });
            return { data: '', success: false };
        }
    },
}

export default services;