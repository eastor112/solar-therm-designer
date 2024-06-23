import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Folder from '@mui/icons-material/Folder';
// import NewspaperIcon from '@mui/icons-material/Newspaper';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from '@mui/icons-material/Info';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { logout } from '../../redux/usersSlice';
import { ModalType } from '../Modal/getModalSelector';

interface MainListItemsProps {
  handleOpenGlobalModal: (value: ModalType) => void;
}

export const MainListItems: React.FC<MainListItemsProps> = ({
  handleOpenGlobalModal,
}) => {
  const { currentProject, thereAreChanges } = useAppSelector(
    state => state.locations
  );
  return (
    <>
      <ListItemButton onClick={() => handleOpenGlobalModal(ModalType.NEW)}>
        <ListItemIcon>
          <NoteAddIcon />
        </ListItemIcon>
        <ListItemText primary='Nuevo' />
      </ListItemButton>

      <ListItemButton onClick={() => handleOpenGlobalModal(ModalType.OPEN)}>
        <ListItemIcon>
          <Folder />
        </ListItemIcon>
        <ListItemText primary='Abrir' />
      </ListItemButton>

      <ListItemButton
        onClick={() => handleOpenGlobalModal(ModalType.SAVE)}
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
        onClick={() => handleOpenGlobalModal(ModalType.CLOSE)}
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
  handleOpenGlobalModal: (value: ModalType) => void;
}

export const SecondaryListItems: React.FC<SecondaryListItemsProps> = ({
  handleOpenGlobalModal,
}) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <ListItemButton onClick={() => handleOpenGlobalModal(ModalType.ABOUT)}>
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary='Acerca de' />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          dispatch(logout());
        }}
      >
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary='Salir' />
      </ListItemButton>
    </>
  );
};
