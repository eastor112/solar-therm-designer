import React from 'react';
import Box from '@mui/material/Box';
import InputField from '../../InputField/InputField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import * as yup from 'yup';
import ButtonsModals from '../../ButtonsModals/ButtonsModals';

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
  tau_glas: {
    label: 'Tau',
    tooltip: 'Transmisividad del tubo al vacio [-]',
    initialValue: 0.93,
  },
  alpha_glass: {
    label: 'Alpha',
    tooltip: 'Absortividad del tubo al vacio [-]',
    initialValue: 0.89,
  },
};

const validationSchema = yup.object(
  Object.fromEntries(
    Object.entries(fieldInfo).map(([key, value]) => [
      key,
      yup
        .number()
        .required(`${value.label} es requerido`)
        .min(0, 'Debe ser mayor o igual a 0')
        .max(1, 'Debe ser menor o igual a 1'),
    ])
  )
);

const ModalOtherPipeParams: React.FC = () => {
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
        Coeficientes de tubería
      </Typography>
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
            sx={{ width: '100%', marginBottom: 2 }}
            size='small'
            margin='normal'
          />
        ))}
        <ButtonsModals handleAccept={() => {}} handleCancel={() => {}} />
      </form>
    </Box>
  );
};

export default ModalOtherPipeParams;
