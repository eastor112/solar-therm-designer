import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { setOpenModal } from '../../redux/UISlice';
import { useState, useEffect } from 'react';
import { createProject } from '../../redux/locationsSlice';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
};

const ModalNewProject = () => {
  const dispatch = useAppDispatch();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const { currentProject } = useAppSelector(state => state.locations);
  const [projectName, setProjectName] = useState('');

  useEffect(() => {
    if (currentProject && !isFirstLoad) {
      setProjectName(currentProject.name);
      handleClose();
    }
    setIsFirstLoad(false);
  }, [currentProject]);

  const handleClose = () => {
    dispatch(setOpenModal(false));
  };

  const handleCreateProject = () => {
    dispatch(createProject(projectName));
  };

  return (
    <Box sx={style}>
      <Typography
        sx={{
          mb: 3,
        }}
        id='modal-modal-title'
        variant='h6'
        component='h2'
      >
        Crear nuevo proyecto
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <TextField
          id='name'
          label='nombre de proyecto'
          variant='outlined'
          name='projectName'
          value={projectName}
          onChange={e => setProjectName(e.target.value)}
        />
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            justifyContent: 'center',
          }}
        >
          <Button
            variant='outlined'
            sx={{
              width: '7rem',
            }}
            onClick={handleClose}
          >
            cancelar
          </Button>
          <Button
            variant='contained'
            sx={{
              width: '7rem',
            }}
            onClick={handleCreateProject}
          >
            Crear
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ModalNewProject;
