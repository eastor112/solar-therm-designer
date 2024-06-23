import TextField, { TextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import { FC } from 'react';

const inputStyle = {
  '& input[type=number]': {
    MozAppearance: 'textfield',
  },
  '& input[type=number]::-webkit-outer-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  },
  '& input[type=number]::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  },
};

type CustomInputProps = TextFieldProps & {
  tooltipText?: string;
};

const InputField: FC<CustomInputProps> = ({ tooltipText, ...rest }) => {
  return (
    <TextField
      {...rest}
      variant='outlined'
      sx={{
        ...inputStyle,
        width: '100%',
      }}
      size='small'
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        endAdornment: tooltipText ? (
          <InputAdornment position='end'>
            <Tooltip title={tooltipText} placement='top'>
              <InfoIcon sx={{ width: '18px' }} />
            </Tooltip>
          </InputAdornment>
        ) : undefined,
      }}
    />
  );
};

export default InputField;
