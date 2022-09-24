import axios from 'axios';

// POST
export const postProduct = async (payload) => {
  try {
    const response = await axios.post('https://fakestoreapi.com/products', payload);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}