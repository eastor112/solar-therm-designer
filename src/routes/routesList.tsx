import { Navigate } from 'react-router-dom';
import Designer from '../pages/Designer/Designer';
import Login from '../pages/Login/Login';
import RawDataInspector from '../pages/RawDataInspector/RawDataInspector';
import Results from '../pages/Results/Results';
import RootLayout from '../pages/RootLayout';
import PrivateRoute from './PrivateRoute';
import ExternalService from '../pages/ExternalService/ExternalService';

export const routes = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <PrivateRoute component={<RootLayout />} />,
    children: [
      {
        path: '/dashboard/designer',
        element: <Designer />,
      },
      {
        path: '/dashboard/results',
        element: <Results />,
      },
      {
        path: '/dashboard/inspector',
        element: <RawDataInspector />,
      },
      {
        path: '/dashboard/external',
        element: <ExternalService />,
      },
      {
        path: '*',
        element: <Navigate to='/dashboard/designer' replace />,
      },
    ],
  },
  { path: '*', element: <Navigate to='/login' replace /> },
];
