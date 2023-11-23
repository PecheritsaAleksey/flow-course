import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  value: AuthState;
};

type AuthState = {
  isAuthenticated: boolean;
  user: any;
};

const initialState = {
  value: {
    isAuthenticated: false,
    user: {},
  } as AuthState,
} as InitialState;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: () => {
      return initialState;
    },
    logIn: (_, action: PayloadAction<any>) => {
      return {
        value: {
          isAuthenticated: true,
          user: action.payload,
        },
      };
    },
  },
});

export const { logOut, logIn } = auth.actions;
export default auth.reducer;
