import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputField from '../InputField/InputField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Settings from '../Settings/Settings';
import { generalStyles } from '../../styles/general';
import { useDesignerStore } from '../../store/designerStore';
import { Modal } from '@mui/material';
import ModalOtherTankParams from '../Modal/Params/ModalOtherTankParams';

const validationSchema = yup.object({
  vol_tk: yup
    .number()
    .required('Volumen es requerido')
    .positive('Debe ser un número positivo'),
  e_tk: yup
    .number()
    .required('Espesor tanque es requerido')
    .positive('Debe ser un número positivo'),
  e_aisl: yup
    .number()
    .required('Espesor aislante es requerido')
    .positive('Debe ser un número positivo'),
  e_cub: yup
    .number()
    .required('Espesor cubierta es requerido')
    .positive('Debe ser un número positivo'),
});

const TankParams: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);

  const {
    vol_tk,
    e_tk,
    e_aisl,
    e_cub,
    setVol_tk,
    setE_tk,
    setE_aisl,
    setE_cub,
  } = useDesignerStore();

  const fieldInfo = {
    vol_tk: {
      label: 'Volumen [m3]',
      tooltip: 'Volumen del tanque de agua [m3]',
      initialValue: vol_tk,
    },
    e_tk: {
      label: 'Espesor tanque [m]',
      tooltip: 'Espesor del termotanque (acero inoxidable) [m]',
      initialValue: e_tk,
    },
    e_aisl: {
      label: 'Espesor aislante [m]',
      tooltip: 'Espesor del aislante (poliuretano) [m]',
      initialValue: e_aisl,
    },
    e_cub: {
      label: 'Espesor cubierta [m]',
      tooltip: 'Espesor de la cubierta (acero inoxidable) [m]',
      initialValue: e_cub,
    },
  };

  const formik = useFormik({
    initialValues: Object.fromEntries(
      Object.entries(fieldInfo).map(([key, value]) => [key, value.initialValue])
    ),
    validationSchema: validationSchema,
    onSubmit: values => {
      console.log(values);
    },
  });

  useEffect(() => {
    if (formik.values.vol_tk !== vol_tk) {
      setVol_tk(Number(formik.values.vol_tk));
    }
    if (formik.values.e_tk !== e_tk) {
      setE_tk(Number(formik.values.e_tk));
    }
    if (formik.values.e_aisl !== e_aisl) {
      setE_aisl(Number(formik.values.e_aisl));
    }
    if (formik.values.e_cub !== e_cub) {
      setE_cub(Number(formik.values.e_cub));
    }
  }, [
    formik.values,
    setVol_tk,
    setE_tk,
    setE_aisl,
    setE_cub,
    vol_tk,
    e_tk,
    e_aisl,
    e_cub,
  ]);

  const handleSetCoeficients = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <Box>
      <Typography variant='h3' sx={generalStyles.h3}>
        Tanque
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
      <Settings label='Coef. térmicos tanque' onClick={handleSetCoeficients} />

      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <>
          <ModalOtherTankParams handleClose={() => setOpenModal(false)} />
        </>
      </Modal>
    </Box>
  );
};

export default TankParams;
