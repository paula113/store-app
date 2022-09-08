const axios = require('axios').default;


const getProductsList = async (pageParam) => {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products?limit=${pageParam}`);
    return response.json();
  } catch (error) {
    console.error(error);
  }
}

const getProducts = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }
  

export { getProducts, getProductsList }