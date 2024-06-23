import TextField, { TextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import { FC } from 'react';

type CustomInputProps = TextFieldProps & {
  tooltipText?: string;
};

const InputField: FC<CustomInputProps> = ({ tooltipText, ...rest }) => {
  return (
    <TextField
      {...rest}
      variant='outlined'
      sx={{
        width: '100%',
      }}
      size='small'
      InputProps={{
        endAdornment: tooltipText ? (
          <InputAdornment position='end'>
            <Tooltip title='Volumen del tanque de agua' placement='top'>
              <InfoIcon sx={{ width: '18px' }} />
            </Tooltip>
          </InputAdornment>
        ) : undefined,
      }}
    />
  );
};

export default InputField;
