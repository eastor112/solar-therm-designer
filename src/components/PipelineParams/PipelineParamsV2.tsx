import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { generalStyles } from '../../styles/general';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
// import { Link as LinkRouter } from 'react-router-dom';
// import Link from '@mui/material/Link';
import { useAppSelector } from '../../hooks/reduxHooks';
import { useDispatch } from 'react-redux';
import {
  setExternalDiameter,
  setInternalDiameter,
  setPipelineLength,
} from '../../redux/designerSlice';
import { pipelines } from './helper';
import { useEffect, useState } from 'react';

const minDistance = 1;

const PipelineParamsV2 = () => {
  const dispatch = useDispatch();
  const { externalDiameter, internalDiameter, pipelineLength } = useAppSelector(
    state => state.designer
  );
  const [standarPipeSelected, setStandarPipeSelected] = useState('0');

  useEffect(() => {
    // check if values are the same of a standar pipeline
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

  const handleDiameters = (
    _event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        dispatch(setInternalDiameter(clamped));
        dispatch(setExternalDiameter(clamped + minDistance));
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        dispatch(setInternalDiameter(clamped - minDistance));
        dispatch(setExternalDiameter(clamped));
      }
    } else {
      dispatch(setInternalDiameter(newValue[0]));
      dispatch(setExternalDiameter(newValue[1]));
    }
  };

  const valuetext = (value: number) => {
    return `${value}°C`;
  };

  const handleChange = (event: SelectChangeEvent) => {
    const selected = event.target.value;
    const pipelineSelected = pipelines.find(
      pipeline => pipeline.id.toString() === selected
    );
    if (pipelineSelected) {
      dispatch(setPipelineLength(pipelineSelected.length));
      dispatch(setInternalDiameter(pipelineSelected.innerDiameter));
      dispatch(setExternalDiameter(pipelineSelected.outerDiameter));
    }
    setStandarPipeSelected(selected);
  };

  return (
    <Box>
      <Typography variant='h3' sx={generalStyles.h3}>
        Parámetros de tubos
      </Typography>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl fullWidth>
            <Box sx={{ flex: 1 }}>
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
            </Box>
            {/* <Box sx={{ fontSize: 14 }}>
              <Link to='/dashboard/place/new' component={LinkRouter} sx={{}}>
                + Nuevo tipo
              </Link>
            </Box> */}
          </FormControl>

          <TextField
            type='number'
            id='pipeline_length'
            label='Longitud (m)'
            variant='outlined'
            name='pipeline_length'
            sx={{
              width: '100%',
            }}
            value={pipelineLength}
            onChange={e => {
              let newValue = +e.target.value;
              dispatch(setPipelineLength(newValue));
            }}
            size='small'
          />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flex: 1,
                gap: 2,
              }}
            >
              <Box className='font-bold'>
                D<span className='text-xs'>int</span>:
                <span className='font-normal ml-1'>
                  {internalDiameter.toFixed(2)} mm
                </span>
              </Box>
              <Box className='font-bold'>
                D<span className='text-xs'>ext</span>:
                <span className='font-normal ml-1'>
                  {externalDiameter.toFixed(2)} mm
                </span>
              </Box>
            </Box>
            <Slider
              getAriaLabel={() => 'Minimum distance shift'}
              value={[internalDiameter, externalDiameter]}
              onChange={handleDiameters}
              valueLabelDisplay='auto'
              getAriaValueText={valuetext}
              disableSwap
              step={0.01}
            />
          </Box>

          <TextField
            type='number'
            id='pipeline_separation'
            label='Separación entre tubos (m)'
            variant='outlined'
            name='pipeline_separation'
            sx={{
              width: '100%',
            }}
            value={0}
            // onChange={e => {
            //   let newValue = +e.target.value;
            //   dispatch(setPipelineLength(newValue));
            // }}
            size='small'
          />
          <TextField
            type='number'
            id='pipeline_number'
            label='Número de tubos (m)'
            variant='outlined'
            name='pipeline_number'
            sx={{
              width: '100%',
            }}
            value={0}
            // onChange={e => {
            //   let newValue = +e.target.value;
            //   dispatch(setPipelineLength(newValue));
            // }}
            size='small'
          />
          <TextField
            type='number'
            id='tau_glas'
            label='Tau'
            variant='outlined'
            name='tau_glas'
            sx={{
              width: '100%',
            }}
            value={0}
            // onChange={e => {
            //   let newValue = +e.target.value;
            //   dispatch(setPipelineLength(newValue));
            // }}
            size='small'
          />
          <TextField
            type='number'
            id='alpha_glass'
            label='Alpha'
            variant='outlined'
            name='alpha_glass'
            sx={{
              width: '100%',
            }}
            value={0}
            // onChange={e => {
            //   let newValue = +e.target.value;
            //   dispatch(setPipelineLength(newValue));
            // }}
            size='small'
          />
        </Box>
      </Box>
    </Box>
  );
};

export default PipelineParamsV2;
