import axios from "axios";
import { 
    BASE_URL, fetchAllStores, updateStore
} from "../helpers/MapHelper";



export const AllStoresService = async () => {
    try {
      const result = await fetchAllStores();
      return { user: result, success: true }
    } catch (error) {
      console.error(error);
      return { }
    }
}

export const updateUserStore = async (id) => {
    try {
        const result = await updateStore(id);
        return { success: true }
    } catch (error) {
        console.error(error);
        return { }
    }
  }