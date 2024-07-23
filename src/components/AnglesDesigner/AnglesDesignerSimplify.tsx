import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import * as yup from 'yup';
import InputField from '../InputField/InputField';
import { generalStyles } from '../../styles/general';
import { useDesignerStore } from '../../store/designerStore';

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

const AnglesDesignerSimplify: React.FC = () => {
  const { azimuth, inclination, currentProject, setAzimuth, setInclination } =
    useDesignerStore();

  const fieldInfo = {
    inclination: {
      label: 'Inclinación',
      tooltip: 'Ángulo de inclinación del panel solar (0-90 grados)',
      initialValue: inclination,
    },
    azimuth: {
      label: 'Azimuth',
      tooltip: 'Ángulo de azimuth del panel solar (0-360 grados)',
      initialValue: azimuth,
    },
  };

  const formik = useFormik({
    initialValues: {
      inclination: fieldInfo.inclination.initialValue,
      azimuth: fieldInfo.azimuth.initialValue,
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      setInclination(Number(values.inclination));
      setAzimuth(Number(values.azimuth));
    },
    validateOnBlur: true,
  });

  useEffect(() => {
    if (currentProject) {
      formik.setValues({
        inclination: currentProject?.inclinacion,
        azimuth: currentProject?.azimuth,
      });
    }
  }, [currentProject]);

  useEffect(() => {
    if (formik.values.inclination !== inclination) {
      setInclination(Number(formik.values.inclination));
    }
    if (formik.values.azimuth !== azimuth) {
      setAzimuth(Number(formik.values.azimuth));
    }
  }, [formik.values, setInclination, setAzimuth, inclination, azimuth]);

  return (
    <Box>
      <Typography variant='h3' sx={generalStyles.h3}>
        Ángulos
      </Typography>
      <Box sx={{ width: '200px' }}>
        <form onSubmit={formik.handleSubmit}>
          {Object.entries(fieldInfo).map(([field, info]) => (
            <InputField
              key={field}
              id={field}
              name={field}
              label={info.label}
              type='number'
              value={formik.values[field as keyof typeof formik.values]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched[field as keyof typeof formik.touched] &&
                Boolean(formik.errors[field as keyof typeof formik.errors])
              }
              helperText={
                formik.touched[field as keyof typeof formik.touched] &&
                formik.errors[field as keyof typeof formik.errors]
              }
              tooltipText={info.tooltip}
              sx={{ width: '100%', mb: 2 }}
              size='small'
              margin='normal'
            />
          ))}
        </form>
      </Box>
    </Box>
  );
};

export default AnglesDesignerSimplify;
