'use client';
import Trix from '@/components/textEditor';
import { postSchema } from '@/lib/forms';
import { Regions } from '@/lib/locations';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { useFormik } from 'formik';

export default function Create() {
  const { handleSubmit, handleChange, values, touched, errors, status } =
    useFormik({
      initialValues: {
        title: '',
        region: 'North America',
        country: '',
        city: '',
        details: '',
        media: [],
        length_of_stay: [],
        date_travelled: '',
        size_of_group: 1,
        total_budget: {
          accommodation: 0,
          food_drinks: 0,
          activities: 0,
          transportation: 0
        }
      },
      initialStatus: null,
      enableReinitialize: true,
      validationSchema: postSchema,
      onSubmit: async (values, { setStatus }) => {
        console.log({ values });
      }
    });

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
            value={values.title}
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
              value={values.region}
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
            value={values.country}
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
            value={values.city}
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
            defaultValue={values.details}
            onChange={handleChange}
            placeholder='Share trip details here...'
            className='editor'
          />
        </Box>
      </Box>
    </Box>
  );
}
