import { createTier, deleteTier, fetchAllCompanies, getOneCompanyById, updateTier } from "../helpers/AdminHelper"


const services = {}

export const allCompanyServices = {
    getAllCompanies: async () => {
        try {
            const result = await fetchAllCompanies()
            return { items: result, success: true }
        } catch (error) {
            return { items: [], success: false }
        }
    },

    getOneById: async (id) => {
        try {
            const result = await getOneCompanyById({ id })
            return { items: result, success: true }
        } catch (error) {
            return { items: [], success: false }
        }
    },

    createTier: async ( tier, price, capacity, event ) => {
        try {
            const result = await createTier({ tier, price, capacity, event });
            return { data: result, success: true };

        } catch (error) {
            console.error({ error });
            return { data: '', success: false };
        }
    },

    updateTier: async ( tier, name, capacity, price ) => {
        try {
            const result = await updateTier({ tier, name, capacity, price })
            return { data: result, success: true }
        } catch (error) {
            console.error({ error })
            return { data: '', success: false }
        }
    },

    deleteTier: async (id) => {
        try {
            const result = await deleteTier(id);
            return { data: result, success: true };

        } catch (error) {
            console.error({ error });
            return { data: '', success: false };
        }
    },
}