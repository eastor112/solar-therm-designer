import Designer from '../pages/Designer/Designer';
import Login from '../pages/Login/Login';
import RawDataInspector from '../pages/RawDataInspector/RawDataInspector';
import Results from '../pages/Results/Results';
import RootLayout from '../pages/RootLayout';

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
    path: '/dashboard',
    element: <RootLayout />,
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
    ],
  },
];
