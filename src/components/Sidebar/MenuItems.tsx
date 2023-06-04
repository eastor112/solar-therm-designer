import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Folder from '@mui/icons-material/Folder';
import NewspaperIcon from '@mui/icons-material/Newspaper';

export const mainListItems = (
  <React.Fragment>
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
  </React.Fragment>
);
