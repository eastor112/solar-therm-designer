import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useEffect, useState } from 'react';
import { loginUser, setError } from '../../redux/usersSlice';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Copyright = (props: any) => {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link color='inherit' href='https://www.unitru.edu.pe/'>
        Mecatrónica UNT
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

const Login = () => {
  const dispatch = useAppDispatch();
  const { error, isAuthenticated } = useAppSelector(state => state.users);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated]);

  const handleChange = (e: any) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
      dispatch(setError(null));
    } else {
      setPassword(e.target.value);
      dispatch(setError(null));
    }
    return;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!email.trim()) {
      dispatch(setError('El email es requerido'));
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      dispatch(setError('El formato del email no es válido'));
      return;
    }

    if (!password.trim()) {
      dispatch(setError('La contraseña es requerida'));
      return;
    }

    dispatch(loginUser({ email, password }));
    return;
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Log In
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email'
              name='email'
              autoComplete='email'
              autoFocus
              error={error?.includes('email')}
              value={email}
              onChange={handleChange}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Contraseña'
              type='password'
              id='password'
              autoComplete='current-password'
              error={error?.includes('contraseña')}
              value={password}
              onChange={handleChange}
            />
            {error && <Alert severity='error'>{error}</Alert>}
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Ingresar
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </div>
  );
};

export default Login;
