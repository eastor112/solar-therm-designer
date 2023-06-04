import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dsv from '@rollup/plugin-dsv';
import svgr from 'vite-plugin-svgr';

function differMuiSourcemapsPlugins() {
  const muiPackages = ['@mui/material', '@emotion/styled', '@emotion/react'];

  return {
    name: 'differ-mui-sourcemap',
    transform(code: string, id: string) {
      if (muiPackages.some(pkg => id.includes(pkg))) {
        return {
          code: code,
          map: null,
        };
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react(), dsv(), differMuiSourcemapsPlugins()],
  server: {
    port: 3000,
  },
});
