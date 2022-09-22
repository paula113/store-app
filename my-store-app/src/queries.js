import axios from 'axios';

// GET
const getProductsList = async (pageParam) => {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products?limit=${pageParam}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

const getProducts = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      return response.data;
    } catch (error) {
      console.error(error);
    }
}
  
// POST

const postProduct = async (payload) => {
  try {
    const response = await axios.post('https://fakestoreapi.com/products', payload);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export { getProducts, getProductsList, postProduct }