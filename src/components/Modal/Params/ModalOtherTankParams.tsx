import React from 'react';
import Box from '@mui/material/Box';
import { useFormik } from 'formik';
import * as yup from 'yup';
import InputField from '../../InputField/InputField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
};

const fieldInfo = {
  h_int: {
    label: 'Coef. convectivo interior',
    tooltip:
      'Coeficiente convectivo de transferencia de calor en el interior de termotanque [W/m2 K]',
    initialValue: 10,
  },
  h_ext: {
    label: 'Coef. convectivo exterior',
    tooltip:
      'Coeficiente convectivo de transferencia de calor en el exterior del termotanque [W/m2 K]',
    initialValue: 25,
  },
  k_tk: {
    label: 'Cond. térmica del tanque',
    tooltip: 'Conductividad térmica del termotanque (acero inoxidable) [W/m K]',
    initialValue: 14.9,
  },
  k_aisl: {
    label: 'Cond. térmica del aislante',
    tooltip: 'Conductividad térmica del aislante (poliuretano) [W/m K]',
    initialValue: 0.06,
  },
  k_cub: {
    label: 'Cond. térmica cubierta',
    tooltip: 'Conductividad térmica de la cubierta (acero inoxidable) [W/m K]',
    initialValue: 14.9,
  },
};

const validationSchema = yup.object(
  Object.fromEntries(
    Object.entries(fieldInfo).map(([key, value]) => [
      key,
      yup.number().required(`${value.label} es requerido`),
    ])
  )
);

const ModalOtherTankParams: React.FC = () => {
  const formik = useFormik({
    initialValues: Object.fromEntries(
      Object.entries(fieldInfo).map(([key, value]) => [key, value.initialValue])
    ),
    validationSchema: validationSchema,
    onSubmit: values => {
      console.log(values);
    },
  });

  return (
    <Box sx={style}>
      <Typography id='modal-modal-title' variant='h6' component='h2'>
        Coeficientes tanque
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        {Object.entries(fieldInfo).map(([field, info]) => (
          <InputField
            key={field}
            fullWidth
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
            margin='normal'
            tooltipText={info.tooltip}
          />
        ))}
        <Button type='submit' variant='contained'>
          Guardar
        </Button>
      </form>
    </Box>
  );
};

export default ModalOtherTankParams;
