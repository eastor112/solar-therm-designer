import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Folder from '@mui/icons-material/Folder';
// import NewspaperIcon from '@mui/icons-material/Newspaper';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { useAppSelector } from '../../hooks/reduxHooks';

interface MainListItemsProps {
  handleOpenGlobalModal: (value: string) => void;
}

export const MainListItems: React.FC<MainListItemsProps> = ({
  handleOpenGlobalModal,
}) => {
  const { currentProject, thereAreChanges } = useAppSelector(
    state => state.locations
  );
  return (
    <>
      <ListItemButton onClick={() => handleOpenGlobalModal('new')}>
        <ListItemIcon>
          <NoteAddIcon />
        </ListItemIcon>
        <ListItemText primary='Nuevo' />
      </ListItemButton>

      <ListItemButton onClick={() => handleOpenGlobalModal('open')}>
        <ListItemIcon>
          <Folder />
        </ListItemIcon>
        <ListItemText primary='Abrir' />
      </ListItemButton>

      <ListItemButton
        onClick={() => handleOpenGlobalModal('save')}
        disabled={!currentProject || !thereAreChanges}
      >
        <ListItemIcon>
          <SaveIcon />
        </ListItemIcon>
        <ListItemText primary='Guardar' />
      </ListItemButton>

      {/* <ListItemButton onClick={() => handleOpenGlobalModal('report')}>
        <ListItemIcon>
          <NewspaperIcon />
        </ListItemIcon>
        <ListItemText primary='Reporte' />
      </ListItemButton> */}

      <ListItemButton
        onClick={() => handleOpenGlobalModal('close')}
        disabled={!currentProject}
      >
        <ListItemIcon>
          <CancelIcon />
        </ListItemIcon>
        <ListItemText primary='Cerrar proyecto' />
      </ListItemButton>
    </>
  );
};

interface SecondaryListItemsProps {
  handleOpenGlobalModal: (value: string) => void;
}

export const SecondaryListItems: React.FC<SecondaryListItemsProps> = ({
  handleOpenGlobalModal,
}) => {
  return (
    <>
      <ListItemButton onClick={() => handleOpenGlobalModal('about')}>
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary='Acerca de' />
      </ListItemButton>
      <ListItemButton component={Link} to='/login'>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary='Salir' />
      </ListItemButton>
    </>
  );
};
