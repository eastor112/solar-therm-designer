import React from 'react';
import Box from '@mui/material/Box';
import { useFormik } from 'formik';
import * as yup from 'yup';
import InputField from '../../InputField/InputField';
import Typography from '@mui/material/Typography';
import ButtonsModals from '../../ButtonsModals/ButtonsModals';
import { useDesignerStore } from '../../../store/designerStore';

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

interface ModalOtherTankParamsProps {
  handleClose: () => void;
}

const ModalOtherTankParams: React.FC<ModalOtherTankParamsProps> = ({
  handleClose,
}) => {
  const {
    h_int,
    h_ext,
    k_tk,
    k_aisl,
    k_cub,
    setH_int,
    setH_ext,
    setK_tk,
    setK_aisl,
    setK_cub,
  } = useDesignerStore();

  const fieldInfo = {
    h_int: {
      label: 'Coef. convectivo interior',
      tooltip:
        'Coeficiente convectivo de transferencia de calor en el interior de termotanque [W/m2 K]',
      initialValue: h_int,
    },
    h_ext: {
      label: 'Coef. convectivo exterior',
      tooltip:
        'Coeficiente convectivo de transferencia de calor en el exterior del termotanque [W/m2 K]',
      initialValue: h_ext,
    },
    k_tk: {
      label: 'Cond. térmica del tanque',
      tooltip:
        'Conductividad térmica del termotanque (acero inoxidable) [W/m K]',
      initialValue: k_tk,
    },
    k_aisl: {
      label: 'Cond. térmica del aislante',
      tooltip: 'Conductividad térmica del aislante (poliuretano) [W/m K]',
      initialValue: k_aisl,
    },
    k_cub: {
      label: 'Cond. térmica cubierta',
      tooltip:
        'Conductividad térmica de la cubierta (acero inoxidable) [W/m K]',
      initialValue: k_cub,
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

  const formik = useFormik({
    initialValues: Object.fromEntries(
      Object.entries(fieldInfo).map(([key, value]) => [key, value.initialValue])
    ),
    validationSchema: validationSchema,
    onSubmit: values => {
      setH_int(Number(values.h_int));
      setH_ext(Number(values.h_ext));
      setK_tk(Number(values.k_tk));
      setK_aisl(Number(values.k_aisl));
      setK_cub(Number(values.k_cub));
      handleClose();
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
        <ButtonsModals
          isSubmit
          handleAccept={() => {}}
          handleCancel={() => {
            handleClose();
          }}
        />
      </form>
    </Box>
  );
};

export default ModalOtherTankParams;
