import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Folder from '@mui/icons-material/Folder';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from '@mui/icons-material/Info';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { ModalType } from '../Modal/getModalSelector';
import { useDesignerStore } from '../../store/designerStore';
import { useUserStore } from '../../store/userStore';

interface MainListItemsProps {
  handleOpenGlobalModal: (value: ModalType) => void;
}

export const MainListItems: React.FC<MainListItemsProps> = ({
  handleOpenGlobalModal,
}) => {
  const { currentProject } = useDesignerStore();
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

      <ListItemButton onClick={() => handleOpenGlobalModal(ModalType.SAVE)}>
        <ListItemIcon>
          <SaveIcon />
        </ListItemIcon>
        <ListItemText primary='Guardar' />
      </ListItemButton>

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
  const { logout } = useUserStore();
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
          logout();
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
