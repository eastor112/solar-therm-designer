import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import InputField from '../InputField/InputField';
import { generalStyles } from '../../styles/general';
import { useAppSelector } from '../../hooks/reduxHooks';
import {
  setExternalDiameter,
  setInternalDiameter,
  setPipelineLength,
} from '../../redux/designerSlice';
import { setModalComponent, setOpenModal } from '../../redux/UISlice';
import { ModalType, getModalSelector } from '../Modal/getModalSelector';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { pipelines } from './helper';
import Settings from '../Settings/Settings';

const fieldInfo = {
  d_int: {
    label: 'D. Interno (mm)',
    tooltip: 'Diámetro interno del tubo al vacío [m]',
    initialValue: 48,
  },
  d_ext: {
    label: 'D. Externo (mm)',
    tooltip: 'Diámetro externo del tubo al vacío [m]',
    initialValue: 58,
  },
  l_tubo: {
    label: 'Longitud (m)',
    tooltip: 'Longitud efectiva del tubo al vacío expuesto al sol [m]',
    initialValue: 1.8,
  },
  s_sep: {
    label: 'Separación entre tubos (m)',
    tooltip: 'Distancia de separación entre centro de tubos [m]',
    initialValue: 0.056,
  },
  n_tubos: {
    label: 'Número de tubos',
    tooltip: 'Número de tubos al vacío que tiene la termosolar',
    initialValue: 30,
  },
};

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
  const dispatch = useDispatch();
  const { externalDiameter, internalDiameter, pipelineLength } = useAppSelector(
    state => state.designer
  );
  const [standarPipeSelected, setStandarPipeSelected] = useState('0');

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
      dispatch(setInternalDiameter(Number(values.d_int)));
      dispatch(setExternalDiameter(Number(values.d_ext)));
      dispatch(setPipelineLength(Number(values.l_tubo)));
    },
  });

  useEffect(() => {
    const standarPipe = pipelines.find(
      pipeline =>
        pipeline.length === pipelineLength &&
        pipeline.innerDiameter === internalDiameter &&
        pipeline.outerDiameter === externalDiameter
    );

    if (standarPipe) {
      setStandarPipeSelected(standarPipe.id.toString());
    } else {
      setStandarPipeSelected('0');
    }
  }, [externalDiameter, internalDiameter, pipelineLength]);

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
    dispatch(setOpenModal(true));
    dispatch(setModalComponent(getModalSelector[ModalType.OTHER_PIPE_PARAMS]));
  };

  return (
    <Box>
      <Typography variant='h3' sx={generalStyles.h3}>
        Tubos
      </Typography>
      <Box sx={{ width: '250px' }}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl fullWidth sx={{ my: 2 }}>
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
                }mm, De=${pipeline.outerDiameter}mm`;
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
    </Box>
  );
};

export default PipelineParamsV2;
