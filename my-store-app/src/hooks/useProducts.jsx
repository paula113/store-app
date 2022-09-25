import { useQuery } from '@tanstack/react-query'
import axios from 'axios';

const getProducts = async () => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const useProducts = () => {
  const query = useQuery(['products'], getProducts, { retry: 0 });
  return {
    ...query,
    products: query.data,
  };
};