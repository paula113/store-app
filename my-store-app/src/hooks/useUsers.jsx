import { useInfiniteQuery,  } from '@tanstack/react-query'
import axios from 'axios';

const getUsers = async (pageParam) => {
  try {
    const response = await axios.get(`https://randomuser.me/api/?page=${pageParam}&results=10`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

const fetchProjects = ({ pageParam = 0 }) => getUsers(pageParam);

export const useUsers = () => {
  const query =  useInfiniteQuery(['users'], fetchProjects, {
    getNextPageParam: (lastPage, _page) => {
      return lastPage.info.page + 1
    }
  })
  return {
    ...query,
    users: query.data,
  };
};