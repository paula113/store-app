import React from 'react'
import ResponsiveAppBar from '../Components/app-bar'
import { getProducts } from '../queries'
import { useQuery } from '@tanstack/react-query'

const Home = () =>{

  const { status, data, error } = useQuery(['products'], getProducts)

  if (status === 'loading') {
    return <span>Loading...</span>
  }

  if (status === 'error') {
    return <span>Error: {error.message}</span>
  }
  return (
    <>
      <ResponsiveAppBar />
      <ul>
      {data.map(product => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
    </>
  
  )
}
export default Home;