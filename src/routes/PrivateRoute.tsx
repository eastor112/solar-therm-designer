import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';
import { validateToken } from '../redux/usersSlice';
import { UserData } from '../types/usersTypes';

interface PrivateRouteProps {
  component: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(state => state.users);

  useEffect(() => {
    if (!isAuthenticated) {
      const userData = localStorage.getItem('data');
      if (userData) {
        const parsedData = JSON.parse(userData) as UserData;

        dispatch(validateToken(parsedData.token));
      } else {
        navigate('/login');
      }
    }
  }, [isAuthenticated]);

  return <>{component}</>;
};

export default PrivateRoute;
