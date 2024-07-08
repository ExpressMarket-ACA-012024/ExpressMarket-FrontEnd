import axios from "axios"
export const BASE_URL = "http://localhost:8080/";
import { getToken, getId } from '../context/AppContext'


export const fetchAllStores = async () => {
    const response = await axios.get(`${BASE_URL}store/all` ,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        }
      });

    if (response.status === 200) {
      const data = await response.data;
      return data;
    }
    return {};
};

export const updateStore = async (id) => {
    const response = await axios.post(`${BASE_URL}store/user/save`, null, {
      params: {
        'idStore': id
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      }
    });
  
    if (response.status === 200) {
      return response.status;
    }
    return {};
  }