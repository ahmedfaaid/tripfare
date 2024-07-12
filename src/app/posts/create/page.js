'use client';
import Trix from '@/components/textEditor';
import { AuthContext } from '@/context/auth';
import useCreatePost from '@/hooks/useCreatePost';
import { postSchema } from '@/lib/forms';
import { Regions } from '@/lib/locations';
import { generateYears, reshapePostFields, slugify } from '@/utils/fns';
import { Add, Image } from '@mui/icons-material';
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { red } from '@mui/material/colors';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

export default function Create() {
  const { loading, user } = useContext(AuthContext);
  const [formFields, setFormFields] = useState({
    title: '',
    region: 'North America',
    country: '',
    city: '',
    details: '',
    length_of_stay_num: 1,
    length_of_stay_period: 'days',
    date_travelled_month: 'Jan',
    date_travelled_year: new Date().getFullYear(),
    size_of_group: 1,
    total_budget: 0,
    budget_accommodation: 0,
    budget_food_drinks: 0,
    budget_activities: 0,
    budget_transportation: 0
  });
  const [files, setFiles] = useState([]);
  const router = useRouter();
  const { loading: postLoading, createPost } = useCreatePost();

  const urls = files.map((file) => URL.createObjectURL(file));

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!loading && !user) {
      router.replace('/login?redirect=posts/create');
    }
  }, [loading, user, router]);

  const { handleSubmit, touched, errors, status } = useFormik({
    initialValues: {
      ...formFields,
      media: files
    },
    initialStatus: null,
    enableReinitialize: true,
    validationSchema: postSchema,
    onSubmit: async (values, { setStatus }) => {
      const reshapedValues = reshapePostFields(values);

      const dataTransformed = {
        ...reshapedValues,
        slug: slugify(values.title)
      };

      const newPost = await createPost(dataTransformed);

      if (!newPost.ok) {
        setStatus({ response: newPost.response });
      } else {
        setStatus(null);
        router.push(`/posts/${newPost.response.slug}`);
      }
    }
  });

  const handleChange = (e) => {
    setFormFields((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleUpload = (e) => {
    setFiles([...e.target.files]);
  };

  return (
    <Box
      component='form'
      sx={{ height: '100%', width: '100%' }}
      onSubmit={handleSubmit}
    >
      <Typography
        component='h2'
        variant='h4'
        sx={{ textAlign: 'center', color: 'soot', marginBottom: 4 }}
      >
        Create a post
      </Typography>
      {status && (
        <Typography
          sx={{
            textAlign: 'center',
            color: red[300],
            marginTop: 2,
            marginBottom: 2
          }}
        >
          {status.response}
        </Typography>
      )}
      <Box sx={{ marginTop: 2 }}>
        <Box>
          <TextField
            id='title'
            name='title'
            label='Title'
            variant='outlined'
            fullWidth
            color='tripfare'
            required
            onChange={handleChange}
            value={formFields.title}
            error={touched.title && errors.title}
          />
        </Box>
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <FormControl
            sx={{ width: '30%' }}
            variant='outlined'
            color='tripfare'
            required
            error={touched.region && errors.region}
          >
            <InputLabel id='region-select'>Region</InputLabel>
            <Select
              labelId='region-select'
              id='region'
              name='region'
              label='Region'
              value={formFields.region}
              onChange={handleChange}
            >
              {Regions.map((region) => (
                <MenuItem value={region} key={region}>
                  {region}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id='country'
            name='country'
            label='Country'
            variant='outlined'
            fullWidth
            color='tripfare'
            required
            onChange={handleChange}
            value={formFields.country}
            error={touched.country && errors.country}
            sx={{ width: '30%' }}
          />
          <TextField
            id='city'
            name='city'
            label='City'
            variant='outlined'
            fullWidth
            color='tripfare'
            required
            onChange={handleChange}
            value={formFields.city}
            error={touched.city && errors.city}
            sx={{ width: '30%' }}
          />
        </Box>
        <Box
          sx={{
            marginTop: 4,
            height: 300
          }}
        >
          <Trix
            id='details'
            name='details'
            defaultValue={formFields.details}
            onChange={handleChange}
            placeholder='Share trip details here...'
            className='editor'
          />
        </Box>
        <Grid container sx={{ marginTop: 8 }}>
          <Grid item xs={12} sm={4}>
            <input
              id='media'
              name='media'
              type='file'
              accept='image/*'
              multiple
              className='upload-attachment-input'
              onChange={(e) => handleUpload(e)}
            />
            <label htmlFor='media' className='upload-attachment-btn'>
              <Image alt='Image icon' />
              <span>Add Image & Video</span>
            </label>
          </Grid>
          <Grid item xs={12} sm={8}>
            {urls.length >= 1 ? (
              <AvatarGroup max={20}>
                {urls.map((url, i) => {
                  const filename = files[i].name;
                  return (
                    <Avatar
                      key={i}
                      alt={filename}
                      src={url}
                      sx={{
                        width: 56,
                        height: 56
                      }}
                    />
                  );
                })}
              </AvatarGroup>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  height: '100%'
                }}
              >
                <Typography
                  sx={{
                    color: 'soot.light',
                    marginLeft: 2
                  }}
                >
                  No files selected...
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
        <Box
          sx={{
            marginTop: 4
          }}
        >
          <Box
            component='fieldset'
            sx={{
              border: 'none',
              padding: 0,
              margin: 0
            }}
          >
            <legend className='fieldset-legend-required'>
              How long did you stay?
            </legend>
            <TextField
              id='length_of_stay_num'
              name='length_of_stay_num'
              type='number'
              value={formFields.length_of_stay_num}
              required
              onChange={handleChange}
              sx={{
                marginTop: 2
              }}
              InputLabelProps={{
                sx: {
                  display: 'none'
                }
              }}
            />
            <FormControl
              sx={{
                width: 150,
                marginLeft: 5,
                marginTop: 2
              }}
            >
              <Select
                id='length_of_stay_period'
                name='length_of_stay_period'
                value={formFields.length_of_stay_period}
                required
                onChange={handleChange}
              >
                <MenuItem value='days'>Day(s)</MenuItem>
                <MenuItem value='weeks'>Week(s)</MenuItem>
                <MenuItem value='months'>Month(s)</MenuItem>
                <MenuItem value='years'>Year(s)</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Grid
          container
          sx={{
            marginTop: 4
          }}
          spacing={2}
        >
          <Grid item xs={12} sm={6}>
            <Box
              component='fieldset'
              sx={{ border: 'none', padding: 0, margin: 0 }}
            >
              <legend className='fieldset-legend-required'>
                Select month and year travelled
              </legend>
              <FormControl
                sx={{
                  width: 150,
                  marginTop: 2
                }}
              >
                <Select
                  id='date_travelled_month'
                  name='date_travelled_month'
                  value={formFields.date_travelled_month}
                  required
                  onChange={handleChange}
                >
                  {months.map((month) => (
                    <MenuItem value={month} key={month}>
                      {month}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                sx={{
                  width: 150,
                  marginLeft: 5,
                  marginTop: 2
                }}
              >
                <Select
                  id='date_travelled_year'
                  name='date_travelled_year'
                  value={formFields.date_travelled_year}
                  required
                  onChange={handleChange}
                >
                  {generateYears().map((year) => (
                    <MenuItem value={year} key={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              component='fieldset'
              sx={{ border: 'none', padding: 0, margin: 0 }}
            >
              <legend className='fieldset-legend-required'>
                Select size of group
              </legend>
              <TextField
                id='size_of_group'
                name='size_of_group'
                type='number'
                value={formFields.size_of_group}
                required
                onChange={handleChange}
                sx={{ marginTop: 2 }}
              />
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ marginTop: 4 }}>
          <Typography
            variant='h4'
            sx={{
              color: 'rgb(63, 136, 174)',
              fontSize: 24
            }}
          >
            Budgeting
          </Typography>
          <Box sx={{ marginTop: 4 }}>
            <InputLabel
              htmlFor='total_budget'
              sx={{ color: 'soot.main' }}
              required
            >
              Total budget
            </InputLabel>
            <TextField
              id='total_budget'
              name='total_budget'
              value={formFields.total_budget}
              type='number'
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>$</InputAdornment>
                )
              }}
              sx={{ marginTop: 2 }}
              onChange={handleChange}
            />
          </Box>
          <Grid container sx={{ marginTop: 4 }} spacing={2}>
            <Grid item xs={12} sm={3}>
              <InputLabel
                htmlFor='budget_accommodation'
                sx={{ color: 'soot.main' }}
                required
              >
                Accommodation
              </InputLabel>
              <TextField
                id='budget_accommodation'
                name='budget_accommodation'
                type='number'
                value={formFields.budget_accommodation}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>$</InputAdornment>
                  )
                }}
                sx={{ marginTop: 2 }}
                onChange={handleChange}
              />
              <Button
                variant='contained'
                sx={{
                  marginTop: 2,
                  borderRadius: 30,
                  backgroundColor: '#EE8643',

                  ':hover': {
                    backgroundColor: '#ec782d'
                  }
                }}
                startIcon={<Add />}
              >
                Add a place
              </Button>
            </Grid>
            <Grid item xs={12} sm={3}>
              <InputLabel
                htmlFor='budget_food_drinks'
                sx={{ color: 'soot.main' }}
                required
              >
                Food and Drinks
              </InputLabel>
              <TextField
                id='budget_food_drinks'
                name='budget_food_drinks'
                value={formFields.budget_food_drinks}
                type='number'
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>$</InputAdornment>
                  )
                }}
                sx={{ marginTop: 2 }}
                onChange={handleChange}
              />
              <Button
                variant='contained'
                sx={{
                  marginTop: 2,
                  borderRadius: 30,
                  backgroundColor: '#EE8643',

                  ':hover': {
                    backgroundColor: '#ec782d'
                  }
                }}
                startIcon={<Add />}
              >
                Add a place
              </Button>
            </Grid>
            <Grid item xs={12} sm={3}>
              <InputLabel
                htmlFor='budget_activities'
                sx={{ color: 'soot.main' }}
                required
              >
                Activities
              </InputLabel>
              <TextField
                id='budget_activities'
                name='budget_activities'
                value={formFields.budget_activities}
                type='number'
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>$</InputAdornment>
                  )
                }}
                sx={{ marginTop: 2 }}
                onChange={handleChange}
              />
              <Button
                variant='contained'
                sx={{
                  marginTop: 2,
                  borderRadius: 30,
                  backgroundColor: '#EE8643',

                  ':hover': {
                    backgroundColor: '#ec782d'
                  }
                }}
                startIcon={<Add />}
              >
                Add a place
              </Button>
            </Grid>
            <Grid item xs={12} sm={3}>
              <InputLabel
                htmlFor='budget_transportation'
                sx={{ color: 'soot.main' }}
                required
              >
                Transportation
              </InputLabel>
              <TextField
                id='budget_transportation'
                name='budget_transportation'
                value={formFields.budget_transportation}
                type='number'
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>$</InputAdornment>
                  )
                }}
                sx={{ marginTop: 2 }}
                onChange={handleChange}
              />
              <Button
                variant='contained'
                sx={{
                  marginTop: 2,
                  borderRadius: 30,
                  backgroundColor: '#EE8643',

                  ':hover': {
                    backgroundColor: '#ec782d'
                  }
                }}
                startIcon={<Add />}
              >
                Add a place
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}
      >
        <Button variant='outlined' color='soot'>
          Cancel
        </Button>
        <Button
          variant='outlined'
          color='tripfare'
          type='submit'
          sx={{
            marginLeft: 4
          }}
          disabled={postLoading}
        >
          Post
        </Button>
      </Box>
    </Box>
  );
}
