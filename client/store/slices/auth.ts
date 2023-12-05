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

const isBrowser = () => typeof window !== "undefined";
const userInfo = isBrowser() && JSON.parse(localStorage.getItem("user"));

const initialState: Partial<LoginResponse> = {
  accessToken: getAuthCookie(AUTH_TOKEN),
  refreshToken: getAuthCookie(AUTH_REFRESH_TOKEN),
  userName: userInfo?.userName,
  userEmail: userInfo?.userEmail,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => {
      // remove the token and refreshToken
      removeCookies([AUTH_TOKEN, AUTH_REFRESH_TOKEN]);
      if (isBrowser()) {
        localStorage.removeItem("user");
      }
      return initialState;
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

          localStorage.setItem(
            "user",
            JSON.stringify({
              userName: payload.userName,
              userEmail: payload.userEmail,
            })
          );

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
      );
  },
});

export const authReducer = slice.reducer;
export const { logout, expireToken } = slice.actions;
