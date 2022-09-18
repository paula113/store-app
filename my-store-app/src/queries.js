import axios from 'axios';


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
  

export { getProducts, getProductsList }