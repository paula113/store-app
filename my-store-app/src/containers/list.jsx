import React, { Fragment, useState } from 'react';
import ResponsiveAppBar from '../Components/app-bar'
import { getProductsList, postProduct } from '../queries'
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Chip from '@mui/material/Chip';

const List = () =>{
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { 
    control, formState: { errors }, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      description: '',
      price: '',
      select: {}
    }
  });

  const fetchProjects = ({ pageParam = 20 }) => getProductsList(pageParam);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(['products'], fetchProjects, {
    // determining if there is more data to load and the information to fetch it. 
    getNextPageParam: (lastPage, page) => {
      if (lastPage.next !== null) {
        return lastPage.next = page.length;
      }
      return lastPage;
    }
  })

  const mutation = useMutation(postProduct, {
    onSuccess: async (result) => {
      queryClient.invalidateQueries(['products'])
      reset(result)
    },
  })

  if (status === 'loading') {
    return  <p>Loading...</p>
  }
  
  if (error === 'error') {
    return  <h1>ERROR!!!</h1>
  }

  const onSubmit = data => mutation.mutate(data);//console.log(data.category)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const groupBy = (objectArray, property) =>{
    return objectArray.reduce((acc, obj) => {
      const key = obj[property];
      const curGroup = acc[key] ?? [];
  
      return { ...acc, [key]: [...curGroup, obj] };
    }, {});
  }

  const categories = data?.pages?.map(group => groupBy(group, 'category'));
  const uniqueCategories = data?.pages ? categories.flatMap(category => Object.keys(category)) : null;
  const options = uniqueCategories?.map(category => ({ value: category, label: category }));

  return (
    <>
    <ResponsiveAppBar/>
    <>
    <Stack 
      direction="row"
      justifyContent='flex-end'
       spacing={2}
       mt={4}
      >
      <IconButton 
       color="primary"
       variant="contained" 
       aria-label="Add product" 
       component="label"
       onClick={handleClickOpen}
       >
       
        <AddIcon />
      </IconButton>
      </Stack>

    <Grid2 container spacing={{ xs: 2, md: 3, lg: 3 }} mt={2} columns={{ xs: 4, sm: 8, md: 12, lg: 12}}>
    {data?.pages !== undefined  && (data.pages.map(group => (
      <>
        {group.map(product =>
        <Grid2 xs={2} sm={4} md={4} lg={3} key={product.id} >
        <Card  sx={{ maxWidth: 345, height: '100%' }}>
        <CardActionArea>
          <CardMedia
            component="img"
            image={product.image}
            height="200"
            alt={product.title}
          />
        </CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="body1" component="div">
            {product.title}
            </Typography>
            <Chip label={product.category} variant="outlined" />
            <Typography variant="body2" color="text.secondary">
             {product.description.slice(0, 100)}...
            </Typography>
          </CardContent>
          <Stack 
            direction="row"
            justifyContent='flex-end'
            alignItems="flex-end"
            >
          <IconButton 
            color="primary"
            variant="contained" 
            aria-label="Add product" 
            component="label"
            onClick={handleClickOpen}
            >
          <EditIcon />
         </IconButton>
         </Stack>
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
    </>
    {open && (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{minHeight: '300px'}}>
        <FormControl sx={{ width: '100%', mb: 2 }}>
        <Controller
            label="Name"
            name="name"
            color="secondary" focused
            control={control}
            rules={{ required: 'Name  is required' }}
            render={({ field }) => <TextField  label="Name"{...field} />}
          />
        {errors.name &&  <FormHelperText  error>{errors.name?.message}</FormHelperText>}

        </FormControl>

        <FormControl sx={{ width: '25ch', mb: 2, mr: 2}}>
           <Controller
           label="Price"
            name="price"
            color="secondary" 
            focused
            inputProps={{ inputMode: 'decimal', pattern: /^\d*\.?\d+$/ }}
            control={control}
            rules={{ required: 'Price  is required' }}
            render={({ field }) => <TextField
            label="Price"
            {...field} />}
          />
          {errors.price &&  <FormHelperText  error>{errors.price?.message}</FormHelperText>}

         </FormControl>

         <FormControl sx={{ width: '25ch' }}>
          <Controller
            name="category"
            color="secondary" focused
            control={control}
            rules={{ required: 'Select is category' }}
            render={({ 
              field: { onChange, onBlur, value, ref},
             }) => <Select
              label="Category" 
              inputRef={ref}
              onBlur={onBlur}
              options={options}
              onChange={(val) => onChange(val.value)}
              value={options.find(c => c.value === value)} 
            />}
          />
           {errors.price &&  <FormHelperText  error>{errors.price?.message}</FormHelperText>}
          </FormControl>
        <FormControl sx={{ width: '100%', mb: 2}}>
           <Controller
           label="Description"
            name="description"
            color="secondary" 
            focused
            control={control}
            rules={{ required: 'Description is required' }}
            render={({ field }) => <TextField multiline label="Description" {...field} />}
          />
          {errors.price &&  <FormHelperText  error>{errors.price?.message}</FormHelperText>}
        </FormControl>

        <FormControl  sx={{ width: '100%', mb: 2 }}>
        <Controller
            label="Picture Link"
            name="image"
            color="secondary" focused
            control={control}
            rules={{ required: 'Image is required'}}
            render={({ 
              field: { onChange, onBlur},
             }) => <TextField
             label="Picture Link"
              onChange={onChange}
            />}
          />
           {errors.price &&  <FormHelperText  error>{errors.price?.message}</FormHelperText>}
        </FormControl>
    
       
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button  type="submit" >Send</Button>
        </DialogActions>
        </form>

      </Dialog>
    )}
  </>
)}
export default List;