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

export const deleteProduct = async (id) => {
  try {
    console.log('id',id);

    const response =  await axios.delete(`https://fakestoreapi.com/products/${id}`);
    console.log('response',response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
