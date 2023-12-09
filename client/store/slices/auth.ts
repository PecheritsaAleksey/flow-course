import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../services/auth";
import {
  AUTH_REFRESH_TOKEN,
  AUTH_TOKEN,
  expireCookies,
  getAuthCookie,
  removeCookies,
  setAuthCookie,
} from "@/lib/cookies";
import { LoginResponse } from "@/types/auth/login";

const initialState: Partial<LoginResponse> = {
  userName: undefined,
  userEmail: undefined,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => {
      // remove the token and refreshToken
      removeCookies([AUTH_TOKEN, AUTH_REFRESH_TOKEN]);

      return {
        userName: undefined,
        userEmail: undefined,
      };
    },
    expireToken: (state, action: PayloadAction<string[]>) => {
      expireCookies(action.payload);
      const token = getAuthCookie(AUTH_TOKEN);
      const refreshToken = getAuthCookie(AUTH_REFRESH_TOKEN);

      state.accessToken = token;
      state.refreshToken = refreshToken;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (_state, { payload }) => {
          // set the token and refreshToken
          setAuthCookie(payload.accessToken, AUTH_TOKEN);
          setAuthCookie(payload.refreshToken, AUTH_REFRESH_TOKEN);

          return payload;
        }
      )
      .addMatcher(
        authApi.endpoints.register.matchFulfilled,
        (_state, { payload }) => {
          // set the token and refreshToken
          setAuthCookie(payload.accessToken, AUTH_TOKEN);
          setAuthCookie(payload.refreshToken, AUTH_REFRESH_TOKEN);

          return payload;
        }
      )
      .addMatcher(
        authApi.endpoints.getAuthData.matchFulfilled,
        (_state, { payload }) => {
          setAuthCookie(payload.accessToken, AUTH_TOKEN);
          setAuthCookie(payload.refreshToken, AUTH_REFRESH_TOKEN);

          return payload;
        }
      )
      .addMatcher(
        authApi.endpoints.refreshGetAuthData.matchFulfilled,
        (_state, { payload }) => {
          setAuthCookie(payload.accessToken, AUTH_TOKEN);
          setAuthCookie(payload.refreshToken, AUTH_REFRESH_TOKEN);

          return payload;
        }
      );
  },
});

export const authReducer = slice.reducer;
export const { logout, expireToken } = slice.actions;
