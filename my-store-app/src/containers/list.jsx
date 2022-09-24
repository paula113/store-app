import React, { Fragment } from 'react';
import ResponsiveAppBar from '../Components/app-bar'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import Stack from '@mui/material/Stack';
import {  useUsers } from '../hooks/useUsers';
import Container from '@mui/material/Container';

const List = () =>{
  const {    
      data,
      fetchNextPage,
      hasNextPage,
      isFetching,
      isFetchingNextPage,
      isError,
      isLoading,
      isSuccess, } = useUsers();

  return (
    <>
    <ResponsiveAppBar/>
    <Container maxWidth="lg"  sx={{mt:12}}>
    {isLoading ?? <p>Loading...</p>}
    {isError ??  <p>Error...</p>}
    <Grid2 container spacing={{ xs: 2, md: 3, lg: 3 }} mt={2} columns={{ xs: 4, sm: 8, md: 12, lg: 12}}>
    {isSuccess && (data.pages.map(group => (
      <>
        {group.results.map(product =>
        <Grid2 xs={2} sm={4} md={4} lg={3} key={product.email} >
        <Card  sx={{ maxWidth: 345, height: '100%' }}>
        <CardActionArea>
          <CardMedia
            component="img"
            image={product.picture.large}
            height="200"
          />
        </CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="body1" component="div">
            {product.name.first}
            </Typography>
          </CardContent>
        </Card>
        </Grid2>
         )}
      </>
      )))}
      </Grid2>

      <Stack 
        direction="row"
       justifyContent="center"
       alignItems="center"
       spacing={2}
       mt={4}
       mb={12}
      >
        <button
          onClick={fetchNextPage}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
        </button>
        <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div> 

      </Stack>
    </Container>
  </>
)}
export default List;