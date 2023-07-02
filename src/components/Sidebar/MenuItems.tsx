import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Folder from '@mui/icons-material/Folder';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';

interface MainListItemsProps {
  handleOpenGlobalModal: (value: string) => void;
}

export const MainListItems: React.FC<MainListItemsProps> = ({
  handleOpenGlobalModal,
}) => {
  return (
    <>
      <ListItemButton onClick={() => handleOpenGlobalModal('open')}>
        <ListItemIcon>
          <Folder />
        </ListItemIcon>
        <ListItemText primary='Abrir' />
      </ListItemButton>

      <ListItemButton onClick={() => handleOpenGlobalModal('new')}>
        <ListItemIcon>
          <AddCircleIcon />
        </ListItemIcon>
        <ListItemText primary='Nuevo' />
      </ListItemButton>

      <ListItemButton onClick={() => handleOpenGlobalModal('save')}>
        <ListItemIcon>
          <SaveIcon />
        </ListItemIcon>
        <ListItemText primary='Guardar' />
      </ListItemButton>

      <ListItemButton onClick={() => handleOpenGlobalModal('report')}>
        <ListItemIcon>
          <NewspaperIcon />
        </ListItemIcon>
        <ListItemText primary='Reporte' />
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
