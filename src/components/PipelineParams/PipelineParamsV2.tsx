import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import * as yup from 'yup';
import InputField from '../InputField/InputField';
import { generalStyles } from '../../styles/general';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { pipelines } from './helper';
import Settings from '../Settings/Settings';
import { useDesignerStore } from '../../store/designerStore';
import Modal from '@mui/material/Modal';
import ModalOtherPipeParams from '../Modal/Params/ModalOtherPipeParams';

const validationSchema = yup.object({
  d_int: yup
    .number()
    .required('El diámetro interno es requerido')
    .min(0, 'El diámetro interno debe ser mayor o igual a 0'),
  d_ext: yup
    .number()
    .required('El diámetro externo es requerido')
    .min(0, 'El diámetro externo debe ser mayor o igual a 0'),
  l_tubo: yup
    .number()
    .required('La longitud es requerida')
    .min(0, 'La longitud debe ser mayor o igual a 0'),
  s_sep: yup
    .number()
    .required('La separación es requerida')
    .min(0, 'La separación debe ser mayor o igual a 0'),
  n_tubos: yup
    .number()
    .required('El número de tubos es requerido')
    .min(0, 'El número de tubos debe ser mayor o igual a 0'),
});

const PipelineParamsV2: React.FC = () => {
  // const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [standarPipeSelected, setStandarPipeSelected] = useState('0');
  const {
    d_int,
    setD_int,
    d_ext,
    setD_ext,
    l_tubo,
    setL_tubo,
    s_sep,
    setS_sep,
    n_tubos,
    setN_tubos,
    currentProject,
  } = useDesignerStore();

  const fieldInfo = {
    d_int: {
      label: 'D. Interno (m)',
      tooltip: 'Diámetro interno del tubo al vacío [m]',
      initialValue: d_int,
    },
    d_ext: {
      label: 'D. Externo (m)',
      tooltip: 'Diámetro externo del tubo al vacío [m]',
      initialValue: d_ext,
    },
    l_tubo: {
      label: 'Longitud (m)',
      tooltip: 'Longitud efectiva del tubo al vacío expuesto al sol [m]',
      initialValue: l_tubo,
    },
    s_sep: {
      label: 'Separación entre tubos (m)',
      tooltip: 'Distancia de separación entre centro de tubos [m]',
      initialValue: s_sep,
    },
    n_tubos: {
      label: 'Número de tubos',
      tooltip: 'Número de tubos al vacío que tiene la termosolar',
      initialValue: n_tubos,
    },
  };

  const formik = useFormik({
    initialValues: {
      d_int: fieldInfo.d_int.initialValue,
      d_ext: fieldInfo.d_ext.initialValue,
      l_tubo: fieldInfo.l_tubo.initialValue,
      s_sep: fieldInfo.s_sep.initialValue,
      n_tubos: fieldInfo.n_tubos.initialValue,
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      setD_int(Number(values.d_int));
      setD_ext(Number(values.d_ext));
      setL_tubo(Number(values.l_tubo));
      setS_sep(Number(values.s_sep));
      setN_tubos(Number(values.n_tubos));
    },
  });

  useEffect(() => {
    if (currentProject) {
      formik.setValues({
        d_int: currentProject.d_int,
        d_ext: currentProject.d_ext,
        l_tubo: currentProject.longitud_tubo,
        s_sep: currentProject.s_sep,
        n_tubos: currentProject.num_tubos,
      });
    }
  }, [currentProject]);

  useEffect(() => {
    if (formik.values.d_int !== d_int) {
      setD_int(Number(formik.values.d_int));
    }
    if (formik.values.d_ext !== d_ext) {
      console.log(formik.values.d_ext);
      setD_ext(Number(formik.values.d_ext));
    }
    if (formik.values.l_tubo !== l_tubo) {
      setL_tubo(Number(formik.values.l_tubo));
    }
    if (formik.values.s_sep !== s_sep) {
      setS_sep(Number(formik.values.s_sep));
    }
    if (formik.values.n_tubos !== n_tubos) {
      setN_tubos(Number(formik.values.n_tubos));
    }
  }, [
    formik.values,
    setD_int,
    setD_ext,
    setL_tubo,
    setS_sep,
    setN_tubos,
    d_int,
    d_ext,
    l_tubo,
    s_sep,
    n_tubos,
  ]);

  const handleChange = (event: SelectChangeEvent) => {
    const selected = event.target.value;
    const pipelineSelected = pipelines.find(
      pipeline => pipeline.id.toString() === selected
    );
    if (pipelineSelected) {
      formik.setFieldValue('pipelineLength', pipelineSelected.length);
      formik.setFieldValue('internalDiameter', pipelineSelected.innerDiameter);
      formik.setFieldValue('externalDiameter', pipelineSelected.outerDiameter);
    }
    setStandarPipeSelected(selected);
  };

  const handleSetCoeficients = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <Box>
      <Typography variant='h3' sx={generalStyles.h3}>
        Tubos
      </Typography>
      <Box sx={{ width: '200px' }}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl fullWidth sx={{ mt: 2, mb: 1 }}>
            <InputLabel id='type-select-label'>Tipo</InputLabel>
            <Select
              labelId='type-select-label'
              id='pipeline_type'
              label='Tipo'
              name='pipeline_type'
              fullWidth
              value={standarPipeSelected}
              onChange={handleChange}
              size='small'
            >
              <MenuItem value={0} sx={{ fontSize: 14 }}>
                Personalizado
              </MenuItem>

              {pipelines.map((pipeline, index) => {
                const name = `L=${pipeline.length.toFixed(2)}m, Di=${
                  pipeline.innerDiameter
                }m, De=${pipeline.outerDiameter}m`;
                return (
                  <MenuItem
                    key={pipeline.id}
                    value={pipeline.id.toString()}
                    sx={{
                      fontSize: 14,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {`Estandar ${index + 1}`}
                    <span className='text-[12px] ml-1'>({name})</span>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

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

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              mb: 2,
            }}
          ></Box>
        </form>
      </Box>
      <Settings label='Coef. térmicos tubos' onClick={handleSetCoeficients} />

      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <>
          <ModalOtherPipeParams handleClose={() => setOpenModal(false)} />
        </>
      </Modal>
    </Box>
  );
};

export default PipelineParamsV2;
