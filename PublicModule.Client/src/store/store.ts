import { combineReducers } from "@reduxjs/toolkit";
import * as userStore from "./userStore";

export interface AppState {
  user: userStore.UserState;
}

export const rootReducer = combineReducers({
  user: userStore.reducer,
});
