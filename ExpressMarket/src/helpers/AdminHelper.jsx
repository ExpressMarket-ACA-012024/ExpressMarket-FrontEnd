import axios from "axios";
import { getToken, getId } from '../context/AppContext'
export const BASE_URL = "http://localhost:8080/";
export const CLOUD_NAME = 'duxqteogb'
export const UPLOAD_PRESET = 'jw3jwwpb'

// Event
export const fetchAllProducts = async ({ title, size, page }) => {
    const response = await axios.get(`${BASE_URL}product/get/all`,
        {
            headers: {
                "Authorization": `Bearer ${getToken()}`
            },
            params: {
                name: title,
                page: page,
                size: size
            }
        });

    if (response.status === 200)
        return response.data 
};
/*export const fetchAllProducts = async ({ title, size, page }) => {
    const response = await axios.get(`${BASE_URL}product/get/all`,
        {
            headers: {
                "Authorization": `Bearer ${getToken()}`
            },
            params: {
                name: title,
                page: page,
                size: size
            }
        });

    if (response.status === 200)
        return response.data 
};*/

export const getProductById = async ({ id }) => {
    const response = await axios.get(`${BASE_URL}product/get/one/${id}`,
        {
            headers: {
                "Authorization": `Bearer ${getToken()}`
            }
        })

    console.log("helper")
    console.log(response)

    if (response.status === 200)
        return response.data;
};

export const getOneEventByTitle = async ({ event }) => {
    const formData = new FormData();
    formData.append("title", event);

    const response = await axios.get(`${BASE_URL}events/all`,
        {
            headers: {
                "Authorization": `Bearer ${getToken()}`
            },
            params: {
                title: event
            }
        })

    if (response.status === 200)
        return response.data.content;
};

export const getEventsByCategory = async ({ category }) => {
    const formData = new FormData();
    formData.append("id", category);

    const response = await axios.get(`${BASE_URL}events/category/${category}`,
        {
            headers: {
                "Authorization": `Bearer ${getToken()}`
            }
        })

    if (response.status === 200)
        return response.data;
};

export const createProduct = async ({ name, image, description, price, productCategory, productCompany }) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("category", productCategory);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("company", productCompany);

    const response = await axios.post(`${BASE_URL}product/save`, formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${getToken()}`
            }
        });

    console.log(response)

    if (response.status === 200)
        return response.data;
}

export const updateProduct = async ({ name, image, category, description, price, company, id }) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("company", company);
    formData.append("product", id);

    const response = await axios.post(`${BASE_URL}product/edit`, formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${getToken()}`
            }
        });

    return response.data;
}

export const changeEventStatus = async (id) => {
    const response = await axios.post(`${BASE_URL}events/switch/${id}`, null,
        {
            headers: {
                "Authorization": `Bearer ${getToken()}`
            }
        });

    return response.data;
}

// Category
export const fetchAllCategories = async () => {
    const response = await axios.get(`${BASE_URL}category/get/all`,
        {
            headers: {
                "Authorization": `Bearer ${getToken()}`
            },
        });

    //const postResponse = await response.data;
    if(response.status === 200)
        return response.data
};

export const getOneCategory = async ({ id }) => {
    const response = await axios.get(`${BASE_URL}category/get/${id}`,
        {
            headers: {
                "Authorization": `Bearer ${getToken()}`
            }
        })

    if (response.status === 200)
        return response.data;
};

export const getOneCategoryByName = async ({ categoryName }) => {
    const formData = new FormData();
    formData.append("categoryName", categoryName);

    const response = await axios.get(`${BASE_URL}categories/category/${categoryName}`,
        {
            headers: {
                "Authorization": `Bearer ${getToken()}`
            }
        })

    if (response.status === 200)
        return response.data;
};

export const createCategory = async ({ id, category }) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("category", category);


    const response = await axios.post(`${BASE_URL}categories/save`, formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${getToken()}`
            }
        });

    if (response.status === 200)
        return response.data;
}


export const deleteCategory = async (id) => {
    const response = await axios.delete(`${BASE_URL}categories/delete/${id}`,
        {
            headers: {
                "Authorization": `Bearer ${getToken()}`
            }
        });

    return response.data;
}

// Role
export const getAllRoles = async () => {
    const response = await axios.get(`${BASE_URL}role/all`,
        {
            headers: {
                "Authorization": `Bearer ${getToken()}`
            }
        });

    const postResponse = await response.data;

    return { items: postResponse }
}

// UserRole
export const getAllUserRoles = async () => {
    const response = await axios.get(`${BASE_URL}user/userroles/all`,
        {
            headers: {
                "Authorization": `Bearer ${getToken()}`
            }
        });

    const postResponse = await response.data;

    return { items: postResponse }
}

// Company
export const fetchAllCompanies = async () => {
    const response = await axios.get(`${BASE_URL}company/get/all`,
        {
            headers: {
                "Authorization": `Bearer ${getToken()}`
            }
        });
    
    if (response.status === 200)
        return response.data
}

export const getOneCompanyById = async ({ id }) => {
    const response = await axios.get(`${BASE_URL}company/get/${id}`,
        {
            headers: {
                "Authorization": `Bearer ${getToken()}`
            },
        })

    if (response.status === 200)
        return response.data;
}

export const createTier = async ({ tier, capacity, price, event }) => {
    const formData = new FormData();
    formData.append("tier", tier);
    formData.append("capacity", capacity);
    formData.append("price", price);
    formData.append("event", event);

    const response = await axios.post(`${BASE_URL}tiers/save`, formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${getToken()}`
            }
        });

    if (response.status === 200)
        return response.data;
}

export const updateTier = async ({ tier, name, capacity, price }) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("capacity", capacity);
    formData.append("price", price);

    const response = await axios.put(`${BASE_URL}tiers/${tier}`, formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${getToken()}`
            }
        });

    return response.data;
}

export const deleteTier = async (id) => {
    const response = await axios.delete(`${BASE_URL}tiers/delete/${id}`,
        {
            headers: {
                "Authorization": `Bearer ${getToken()}`
            }
        });

    return response.data;
}

// Involved
export const getAllInvolved = async ({ size, page }) => {
    const response = await axios.get(`${BASE_URL}involved/`,
        {
            headers: {
                "Authorization": `Bearer ${getToken()}`
            },
            params: {
                size: size,
                page: page
            }
        });

    const postResponse = await response.data;

    return { items: postResponse, totalElements: postResponse.totalElements, totalPages: postResponse.totalPages, isNextPageAvailable: page + 1 < postResponse.totalPages }
};

export const getInvolvedById = async ({ id }) => {
    const response = await axios.get(`${BASE_URL}involved/${id}`,
        {
            headers: {
                "Authorization": `Bearer ${getToken()}`
            },
        });

    const postResponse = await response.data;

    return { items: postResponse, totalElements: postResponse.totalElements, totalPages: postResponse.totalPages, isNextPageAvailable: page + 1 < postResponse.totalPages }
};

export const createInvolved = async ({ id, involved, event }) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("involved", involved);
    formData.append("event", event);


    const response = await axios.post(`${BASE_URL}involved/save`, formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${getToken()}`
            }
        });

    if (response.status === 200)
        return response.data;
    else {
        console.log(response)
    }
}

export const deleteInvolved = async (id) => {
    const response = await axios.delete(`${BASE_URL}involved/delete/${id}`,
        {
            headers: {
                "Authorization": `Bearer ${getToken()}`
            }
        });

    return response.data;
}

// Orders
export const getAllOrders = async ({ size, page }) => {
    const response = await axios.get(`${BASE_URL}order/all`,
        {
            headers: {
                "Authorization": `Bearer ${getToken()}`
            },
            params: {
                size: size,
                page: page
            }
        });

    const postResponse = await response.data;
    console.log(postResponse)

    return { items: postResponse, totalElements: postResponse.totalElements, totalPages: postResponse.totalPages, isNextPageAvailable: page + 1 < postResponse.totalPages }
};

export const getOneOrderById = async ({ id }) => {
    const formData = new FormData();
    formData.append("id", id);

    const response = await axios.get(`${BASE_URL}order/${id}`,
        {
            headers: {
                "Authorization": `Bearer ${getToken()}`
            },
        });
    console.log(response)

    if (response.status === 200)
        return response.data 
};

// TICKET EXCHANGE 
export const ticketExchange = async (ticketCode) => {
    try { 
        const response = await axios.post(`${BASE_URL}ticket/exchange`, null, {
            params: {
                "qr": ticketCode
            },
            headers: {
                "Authorization": `Bearer ${getToken()}`,
                "Content-Type": "application/json",
            },
        });
        
        console.log(response.data);
        
        return response.data;
    } catch (error) {
        console.error("Error during ticket exchange:", error);
        throw error;
    }
};