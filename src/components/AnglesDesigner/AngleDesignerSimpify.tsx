import { useFormik } from 'formik';
import * as yup from 'yup';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { generalStyles } from '../../styles/general/index';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/reduxHooks';
import { setAzimuth, setInclination } from '../../redux/designerSlice';
import InputField from '../InputField/InputField';

const validationSchema = yup.object({
  inclination: yup
    .number()
    .required('Inclinación es requerida')
    .min(0, 'La inclinación debe ser mayor o igual a 0')
    .max(90, 'La inclinación debe ser menor o igual a 90'),
  azimuth: yup
    .number()
    .required('Azimuth es requerido')
    .min(0, 'El azimuth debe ser mayor o igual a 0')
    .max(360, 'El azimuth debe ser menor o igual a 360'),
});

const AnglesDesignerSimplify = () => {
  const dispatch = useDispatch();
  const { azimuth, inclination } = useAppSelector(state => state.designer);

  const formik = useFormik({
    initialValues: {
      inclination,
      azimuth,
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      dispatch(setInclination(Number(values.inclination)));
      dispatch(setAzimuth(Number(values.azimuth)));
    },
  });

  return (
    <Box>
      <Typography variant='h3' sx={generalStyles.h3}>
        Ángulos
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <InputField
            id='inclination'
            name='inclination'
            label='Inclinación'
            type='number'
            value={formik.values.inclination}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.inclination && Boolean(formik.errors.inclination)
            }
            helperText={formik.touched.inclination && formik.errors.inclination}
            tooltipText='Ángulo de inclinación del panel solar (0-90 grados)'
            sx={{ width: '100%' }}
            size='small'
          />

          <InputField
            id='azimuth'
            name='azimuth'
            label='Azimuth'
            type='number'
            value={formik.values.azimuth}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.azimuth && Boolean(formik.errors.azimuth)}
            helperText={formik.touched.azimuth && formik.errors.azimuth}
            tooltipText='Ángulo de azimuth del panel solar (0-360 grados)'
            sx={{ width: '100%' }}
            size='small'
          />
        </Box>
      </form>
    </Box>
  );
};

export default AnglesDesignerSimplify;
