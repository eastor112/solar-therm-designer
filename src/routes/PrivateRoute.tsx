import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../types/usersTypes';
import { useUserStore } from '../store/userStore';

interface PrivateRouteProps {
  component: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component }) => {
  const navigate = useNavigate();
  const { isAuthenticated, validateToken } = useUserStore();

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
  }, [isAuthenticated]);

  return <>{component}</>;
};

export default PrivateRoute;
