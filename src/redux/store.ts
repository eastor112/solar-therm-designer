import { configureStore } from '@reduxjs/toolkit';
import designerSlice from './designerSlice';
import UISlice from './UISlice';
import locationsSlice from './locationsSlice';
import usersSlice from './usersSlice';

const store = configureStore({
  reducer: {
    designer: designerSlice,
    ui: UISlice,
    locations: locationsSlice,
    users: usersSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
