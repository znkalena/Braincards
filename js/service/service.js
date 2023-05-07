const API_URL = 'https://soapy-enormous-foundation.glitch.me/';

export const fetchCategories = async () => {
    try{
    const response = await fetch(`${API_URL}/api/category`);
    if(response.status === 200|| response.status === 201){
        const categories = await response.json();
        return categories;
    }else{
        const error = await response.json();
        throw error;
    }
    }
    catch(error){
    return{error};
    }
};
export const fetchCards = async (id) => {
    try{
    const response = await fetch(`${API_URL}/api/category/${id}`);
    if(response.status === 200|| response.status === 201){
        const cards = await response.json();
        return cards;
    }else{
        const error = await response.json();
        throw error;
    }
    }
    catch(error){
    return{error};
    }
};
export const fetchCreateCategory = async (data) => {
    try{
    const response = await fetch(`${API_URL}/api/category/`,{
        method:'POST',
        body:JSON.stringify(data),
    });
    if(!response.status === 200|| response.status === 201){
        const error = await response.json();
        throw error;
    }else{
        const categories = await response.json();
        return categories;
    }
    }
    catch(error){
    return{error};
    }
};
export const fetchEditCategory = async (id,data) => {
    try{
    const response = await fetch(`${API_URL}/api/category/${id}`,{
        method:'PATCH',
        body:JSON.stringify(data),
    });
    if(!response.status === 200|| response.status === 201){
        const error = await response.json();
        throw error;
    }else{
        const categories = await response.json();
        return categories;
    }
    }
    catch(error){
    return{error};
    }
};
export const fetchDeleteCategory = async (id) => {
    try{
    const response = await fetch(`${API_URL}/api/category/${id}`,{
        method:'DELETE',        
    });
    if(!response.status === 200|| response.status === 201){
        const error = await response.json();
        throw error;
    }else{
        const result = await response.json();
        return result;
    }
    }
    catch(error){
    return{error};
    }
};