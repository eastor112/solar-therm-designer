import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FC } from 'react';

interface ButtonsModalsProps {
  handleAccept: () => void;
  handleCancel: () => void;
  isSubmit?: boolean;
}

const ButtonsModals: FC<ButtonsModalsProps> = ({
  handleAccept,
  handleCancel,
  isSubmit = true,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 3,
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <Button type='button' sx={{ mt: 2 }} size='small' onClick={handleCancel}>
        Cancelar
      </Button>
      <Button
        type={isSubmit ? 'submit' : 'button'}
        variant='contained'
        sx={{ mt: 2 }}
        size='small'
        onClick={handleAccept}
      >
        Aceptar
      </Button>
    </Box>
  );
};

export default ButtonsModals;
