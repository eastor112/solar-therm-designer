import { configureStore } from '@reduxjs/toolkit';
import designerSlice from './designerSlice';

const store = configureStore({
  reducer: {
    designer: designerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
