import ModalAbout from './ModalAbout';
import ModalCloseProject from './ModalCloseProject';
import ModalConfirmDiscard from './ModalConfirmDiscard';
import ModalFile from './ModalFile';
import ModalNewProject from './ModalNewProject';
import ModalOpenProject from './ModalOpenProject';
import ModalReports from './ModalReport';
import ModalSaveChanges from './ModalSaveChanges';

export const getModalSelector: { [key: string]: JSX.Element } = {
  about: <ModalAbout />,
  file: <ModalFile />,
  new: <ModalNewProject />,
  open: <ModalOpenProject />,
  report: <ModalReports />,
  save: <ModalSaveChanges />,
  close: <ModalCloseProject />,
  discard: <ModalConfirmDiscard />,
};
// modal log out
export const destructiveModals = ['new', 'open', 'discard', 'file'];
