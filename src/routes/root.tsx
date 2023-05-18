import Designer from '../pages/Designer/Designer';
import Login from '../pages/Login/Login';
import Results from '../pages/Results/Results';

export const routes = [
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/designer',
    element: <Designer />,
  },
  {
    path: '/results',
    element: <Results />,
  },
];
