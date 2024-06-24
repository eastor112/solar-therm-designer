import React from 'react';
import Box from '@mui/material/Box';
import InputField from '../../InputField/InputField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import * as yup from 'yup';
import SelectField from '../../SelectField/SelectField';
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
  n_div: {
    label: 'Granularidad',
    tooltip:
      'Division de intervalos de tiempo en el dia (12: horaria, 24: cada media hora)',
    initialValue: 12,
    options: [12, 24, 48, 96],
  },
  nn: {
    label: 'Divisiones',
    tooltip: 'Cálculos angulares horarios',
    initialValue: 360,
  },
  beta_coef: {
    label: 'Coeficiente Beta',
    tooltip: 'Coeficiente de expansión volumétrica [1/K]',
    initialValue: 0.000257,
  },
  f_flujo: {
    label: 'Factor de Flujo',
    tooltip:
      'Es el factor de flujo - Razon de area transversal - area total donde sale agua caliente',
    initialValue: 0.45,
  },
};

const validationSchema = yup.object({
  n_div: yup
    .number()
    .required('Granularidad es requerida')
    .oneOf([12, 24, 48, 96], 'Valor no válido'),
  nn: yup
    .number()
    .required('Divisiones es requerido')
    .positive('Debe ser un número positivo'),
  beta_coef: yup
    .number()
    .required('Coeficiente Beta es requerido')
    .positive('Debe ser un número positivo'),
  f_flujo: yup
    .number()
    .required('Factor de Flujo es requerido')
    .positive('Debe ser un número positivo')
    .max(1, 'No debe ser mayor que 1'),
});

const ModalOtherGeneralParams: React.FC = () => {
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
      <Typography
        id='modal-modal-title'
        variant='h6'
        component='h2'
        sx={{ mb: 2 }}
      >
        Parámetros Generales
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <SelectField
          id='n_div'
          name='n_div'
          value={formik.values.n_div}
          label='Granularidad'
          onChange={value => formik.setFieldValue('n_div', Number(value))}
          onBlur={formik.handleBlur}
          error={formik.touched.n_div && Boolean(formik.errors.n_div)}
          options={fieldInfo.n_div.options.map(option => {
            return {
              value: option.toString(),
              label: option.toString(),
            };
          })}
          tooltipText={fieldInfo.n_div.tooltip}
        />

        {Object.entries(fieldInfo)
          .filter(([field]) => field !== 'n_div')
          .map(([field, info]) => (
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
        <ButtonsModals handleAccept={() => {}} handleCancel={() => {}} />
      </form>
    </Box>
  );
};

export default ModalOtherGeneralParams;
