import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { UserApiService } from "api";
import { UserModel } from "models";

export interface UserState {
  user?: UserModel;
}

const initialState: UserState = {
  user: undefined,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserModel>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = slice.actions;

export const userAcions = {
  setUser: (user: UserModel) => (dispatch: Dispatch) => {
    dispatch(setUser(user));
  },
  fetchMe: () => async (dispatch: Dispatch) => {
    try {
      const response = await UserApiService.getMe();
      if (response.success) {
        dispatch(setUser(response.value.data));
      }
    } catch (error) {
      console.error(error);
    }
  },
};

export const { reducer } = slice;
