import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Folder from '@mui/icons-material/Folder';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';

interface MainListItemsProps {
  handleOpenGlobalModal: () => void;
}

export const MainListItems: React.FC<MainListItemsProps> = ({
  handleOpenGlobalModal,
}) => {
  return (
    <>
      <ListItemButton onClick={handleOpenGlobalModal}>
        <ListItemIcon>
          <AddCircleIcon />
        </ListItemIcon>
        <ListItemText primary='Nuevo' />
      </ListItemButton>
      <ListItemButton onClick={handleOpenGlobalModal}>
        <ListItemIcon>
          <Folder />
        </ListItemIcon>
        <ListItemText primary='Abrir' />
      </ListItemButton>
      <ListItemButton onClick={handleOpenGlobalModal}>
        <ListItemIcon>
          <NewspaperIcon />
        </ListItemIcon>
        <ListItemText primary='Reportes' />
      </ListItemButton>
    </>
  );
};

interface SecondaryListItemsProps {
  handleOpenGlobalModal: () => void;
}

export const SecondaryListItems: React.FC<SecondaryListItemsProps> = ({
  handleOpenGlobalModal,
}) => {
  return (
    <>
      <ListItemButton onClick={handleOpenGlobalModal}>
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
