import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState, useEffect, ChangeEvent } from 'react';
import { useDesignerStore } from '../../store/designerStore';
import { useUIStore } from '../../store/uiStore';

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
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const { currentProject, createProject } = useDesignerStore();
  const { setOpenModal } = useUIStore();
  const [projectName, setProjectName] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (currentProject && !isFirstLoad) {
      setProjectName(currentProject.name);
      handleClose();
    }
    setIsFirstLoad(false);
  }, [currentProject]);

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleCreateProject = () => {
    if (projectName.length > 3) {
      setError(false);
      createProject(projectName);
    } else {
      setError(true);
    }
  };

  const handleOnChage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    if (value.length > 3) {
      setError(false);
    }

    setProjectName(value);
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
          onChange={handleOnChage}
          error={error}
          helperText={error ? 'minimo 3 caracteres' : ''}
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
