import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../../types/usersTypes';
import { useUserStore } from '../../store/userStore';

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
  const { isAuthenticated, error, validateToken, setError, loginUser } =
    useUserStore();

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      const userData = localStorage.getItem('data');
      if (userData) {
        const parsedData = JSON.parse(userData) as UserData;

        validateToken(parsedData.token);
      } else {
        navigate('/login');
      }
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard/designer');
    }
  }, [isAuthenticated]);

  const handleChange = (e: any) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
      setError(null);
    } else {
      setPassword(e.target.value);
      setError(null);
    }
    return;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!email.trim()) {
      setError('El email es requerido');
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('El formato del email no es válido');
      return;
    }

    if (!password.trim()) {
      setError('La contraseña es requerida');
      return;
    }

    loginUser({ email, password });
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
