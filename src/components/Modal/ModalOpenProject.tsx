import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import SavedProjectCard from '../SavedProjectCard/SavedProjectCard';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useUIStore } from '../../store/uiStore';
import { useDesignerStore } from '../../store/designerStore';
import { INewProject } from '../../types/projects';
import AddIcon from '@mui/icons-material/Add';
import { getModalSelector } from './getModalSelector';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
  maxHeight: '90vh',
  overflowY: 'scroll',
};

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const ModalOpenProject = () => {
  const { setOpenModal, setModalComponent } = useUIStore();
  const { getAllProjects, openProject, projectsData, projectsPerPage } =
    useDesignerStore();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [projectSelected, setProjectSelected] = useState<INewProject | null>();

  const handleClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    getAllProjects({
      limit: projectsPerPage,
      page: page,
      filter: search === '' ? undefined : search,
    });
  }, [search, page]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const handlePaginationChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setProjectSelected(null);
    setPage(value);
  };

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch(e.target.value);
  };

  const handleOpenProject = () => {
    if (projectSelected) {
      openProject(projectSelected);
    }
    setOpenModal(false);
  };

  const onNewProject = () => {
    setModalComponent(getModalSelector['new']);
  };

  return (
    <Box sx={style}>
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mb: 3,
            position: 'sticky',
            top: 0,
          }}
        >
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Abrir proyecto
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder='Buscar…'
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleOnChange}
              value={search}
            />
          </Search>
        </Box>
      </Box>
      {(projectsData?.total || 0) > 0 ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Box sx={{ minHeight: '60vh' }}>
            {projectsData?.projects.length ? (
              projectsData?.projects.map(project => (
                <SavedProjectCard
                  key={project.id}
                  project={project}
                  selected={projectSelected?.id === project.id}
                  onClick={setProjectSelected}
                />
              ))
            ) : (
              <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                px={3}
                bgcolor='background.default'
              >
                <Typography
                  sx={{
                    textAlign: 'center',
                    color: 'text.primary',
                    fontWeight: 'bold',
                    mt: 4,
                    mb: 2,
                    lineHeight: 1.6,
                    mx: 'auto',
                    p: 3,
                    borderRadius: '4px',
                    background:
                      'linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%)',
                    border: '1px solid',
                    borderColor: 'divider',
                    transform: 'scale(1.02)',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  No se encontraron proyectos con el criterio especificado
                </Typography>
              </Box>
            )}
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Stack spacing={2}>
              <Pagination
                count={projectsData?.total}
                shape='rounded'
                onChange={handlePaginationChange}
              />
            </Stack>
          </Box>

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
              disabled={!projectSelected}
              onClick={handleOpenProject}
            >
              Abrir
            </Button>
          </Box>
        </Box>
      ) : (
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          p={3}
          textAlign='center'
        >
          <Typography variant='h6' color='textSecondary' gutterBottom>
            Aún no se ha creado ningún proyecto.
          </Typography>
          <Typography variant='body1' color='textSecondary' paragraph>
            Parece que no tienes proyectos en tu lista. Empieza a crear uno
            nuevo para comenzar.
          </Typography>
          <Button
            variant='contained'
            color='primary'
            startIcon={<AddIcon />}
            onClick={onNewProject}
          >
            Crear Proyecto
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ModalOpenProject;
