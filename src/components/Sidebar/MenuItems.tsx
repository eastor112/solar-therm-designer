import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Folder from '@mui/icons-material/Folder';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';

export const MainListItems = () => {
  return (
    <>
      <ListItemButton>
        <ListItemIcon>
          <AddCircleIcon />
        </ListItemIcon>
        <ListItemText primary='Nuevo' />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <Folder />
        </ListItemIcon>
        <ListItemText primary='Abrir' />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <NewspaperIcon />
        </ListItemIcon>
        <ListItemText primary='Reportes' />
      </ListItemButton>
    </>
  );
};

export const SecondaryListItems = () => {
  return (
    <>
      <ListItemButton>
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
