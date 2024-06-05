import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes/routesList.tsx';
import { Provider } from 'react-redux';
import store from './redux/store.ts';
import 'leaflet/dist/leaflet.css';

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
