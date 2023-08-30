import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import SavedProjectCard from '../SavedProjectCard/SavedProjectCard';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { setOpenModal } from '../../redux/UISlice';
import { ChangeEvent, useEffect, useState } from 'react';
import { getAllProjects, openProject } from '../../redux/locationsSlice';
import { IProject } from '../../types/locationstypes';

const style = {
  position: 'relative',
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
  const dispatch = useAppDispatch();
  const { projectsData } = useAppSelector(state => state.locations);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [projectSelected, setProjectSelected] = useState<IProject | null>();

  const handleClose = () => {
    dispatch(setOpenModal(false));
  };

  useEffect(() => {
    dispatch(
      getAllProjects({
        limit: 4,
        page: page,
        filter: search === '' ? undefined : search,
      })
    );
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
      dispatch(openProject(projectSelected));
    }
    dispatch(setOpenModal(false));
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
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
          <Typography
            sx={{
              textAlign: 'center',
              color: 'gray',
              fontWeight: 'bold',
              fontSize: '1rem',
            }}
          >
            No se encontraron proyectos con el criterio especificado
          </Typography>
        )}

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
    </Box>
  );
};

export default ModalOpenProject;
