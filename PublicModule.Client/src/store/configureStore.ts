import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./store";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});
