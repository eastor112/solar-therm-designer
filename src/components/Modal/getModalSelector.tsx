import ModalAbout from './ModalAbout';
import ModalCloseProject from './ModalCloseProject';
import ModalConfirmDiscard from './ModalConfirmDiscard';
import ModalFile from './ModalFile';
import ModalNewProject from './ModalNewProject';
import ModalOpenProject from './ModalOpenProject';
import ModalReports from './ModalReport';
import ModalSaveChanges from './ModalSaveChanges';
import ModalOtherGeneralParams from './Params/ModalOtherGeneralParams';
import ModalOtherPipeParams from './Params/ModalOtherPipeParams';
import ModalOtherTankParams from './Params/ModalOtherTankParams';

export enum ModalType {
  ABOUT = 'about',
  FILE = 'file',
  NEW = 'new',
  OPEN = 'open',
  REPORT = 'report',
  SAVE = 'save',
  CLOSE = 'close',
  DISCARD = 'discard',
  OTHER_TANK_PARAMS = 'otherTankParams',
  OTHER_PIPE_PARAMS = 'otherPipeParams',
  OTHER_GENERAL_PARAMS = 'otherGeneralParams',
}

export const getModalSelector: { [key in ModalType]: JSX.Element } = {
  [ModalType.ABOUT]: <ModalAbout />,
  [ModalType.FILE]: <ModalFile />,
  [ModalType.NEW]: <ModalNewProject />,
  [ModalType.OPEN]: <ModalOpenProject />,
  [ModalType.REPORT]: <ModalReports />,
  [ModalType.SAVE]: <ModalSaveChanges />,
  [ModalType.CLOSE]: <ModalCloseProject />,
  [ModalType.DISCARD]: <ModalConfirmDiscard />,
  [ModalType.OTHER_TANK_PARAMS]: <ModalOtherTankParams />,
  [ModalType.OTHER_PIPE_PARAMS]: <ModalOtherPipeParams />,
  [ModalType.OTHER_GENERAL_PARAMS]: <ModalOtherGeneralParams />,
};

export const destructiveModals: ModalType[] = [
  ModalType.NEW,
  ModalType.OPEN,
  ModalType.DISCARD,
  ModalType.FILE,
];
