import React from 'react'
import ResponsiveAppBar from '../Components/app-bar'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import { useProducts } from '../hooks/useProducts'
import Container from '@mui/material/Container';

const Home = () =>{
 const {  products, isError, isLoading, isSuccess } = useProducts();

  return (
    <>
      <ResponsiveAppBar />
      <Container maxWidth="lg"  sx={{mt:12}}>
      {isLoading ?? <p>Loading...</p>}
      {isError ??  <p>Error...</p>}
     {isSuccess && ( <Grid2 container spacing={{ xs: 2, md: 3, lg: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 12}}>
      {products.map(product => (
      <Grid2 xs={2} sm={4} md={4} lg={3} key={product.id} >
      <Card  sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            image={product.image}
            height="200"
            alt={product.title}
          />
          <CardContent>
            <Typography gutterBottom variant="body1" component="div">
            {product.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
             {product.description.slice(0, 150)}...
            </Typography>
          </CardContent>
        </CardActionArea>
        </Card>
      </Grid2>
      ))}
      </Grid2>)}
      </Container>
    </>
  
  )
}
export default Home;