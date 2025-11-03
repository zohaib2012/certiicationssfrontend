import { configureStore } from '@reduxjs/toolkit';
import { certificatesApi } from './authapislice';
import { certificateApi } from './certiicateapislice';

export const store = configureStore({
  reducer: {
    [certificatesApi.reducerPath]: certificatesApi.reducer,
    [certificateApi.reducerPath]:certificateApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(certificatesApi.middleware).concat(certificateApi.middleware),
});
