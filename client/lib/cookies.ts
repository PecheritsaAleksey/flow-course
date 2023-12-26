import { setCookie, getCookie, deleteCookie } from "cookies-next";

export const AUTH_TOKEN = "accessToken";
export const AUTH_REFRESH_TOKEN = "refreshToken";

export const setAuthCookie = (token: string, name: string) => {
  const toBase64 = Buffer.from(token).toString("base64");

  setCookie(name, toBase64, {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
    // more security options here
    // sameSite: 'strict',
    // httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
  });
};

export const getAuthCookie = (name: string) => {
  const cookie = getCookie(name);

  if (!cookie) return undefined;

  return Buffer.from(cookie, "base64").toString("ascii");
};

export const setLangCookie = (lang: string) => {
  setCookie("lang", lang, {
    path: "/",
  });
};

export const getLangCookie = () => {
  const cookie = getCookie("lang");

  if (!cookie) return undefined;

  return cookie;
};

export const removeCookies = (cookies: string[]) => {
  cookies.forEach((cookie) => {
    deleteCookie(cookie);
  });
};

export const expireCookies = (cookies: string[]) => {
  cookies.forEach((cookie) => {
    setCookie(cookie, "", {
      maxAge: 0,
      path: "/",
    });
  });
};

export const getValidAuthTokens = (t?: string, rT?: string) => {
  const accessToken = t || getAuthCookie(AUTH_TOKEN);
  const refreshToken = rT || getAuthCookie(AUTH_REFRESH_TOKEN);

  return {
    accessToken,
    refreshToken,
  };
};

export const isTokenExpired = (expiryDate?: string) => {
  if (!expiryDate) return true;

  const now = new Date();
  const expiry = new Date(expiryDate);

  return now.getTime() > expiry.getTime();
};
