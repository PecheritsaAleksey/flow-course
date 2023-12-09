"use client";

import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getValidAuthTokens } from "@/lib/cookies";
import { RootState } from "@/store";
import { useEffect, useLayoutEffect } from "react";
import { logout } from "@/store/slices/auth";
import {
  useGetAuthDataQuery,
  useLazyRefreshGetAuthDataQuery,
} from "@/store/services/auth";

const ALLOWED_URLS = ["/signin", "/signup"];

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const { push } = useRouter();
  const { userEmail } = useSelector((state: RootState) => state.auth);
  const { accessToken, refreshToken } = getValidAuthTokens();

  // if the user doesnt have a valid token, redirect to login page
  useLayoutEffect(() => {
    if (!accessToken || !refreshToken) {
      push("/signin");
      dispatch(logout());
    }
  }, [accessToken, refreshToken, push]);

  const { error: authDetailsFetchError, isLoading } = useGetAuthDataQuery(
    { token: accessToken || "" },
    {
      skip: !!userEmail,
    }
  );

  const [trigger, result] = useLazyRefreshGetAuthDataQuery();

  useEffect(() => {
    if (
      accessToken &&
      refreshToken &&
      authDetailsFetchError &&
      "status" in authDetailsFetchError &&
      authDetailsFetchError.status === 403
    ) {
      trigger({ token: refreshToken });
      if (!result?.data) {
        dispatch(logout());
      }
    }
  }, [accessToken, refreshToken, authDetailsFetchError, trigger]);

  const pathname = usePathname();
  if (ALLOWED_URLS.includes(pathname) || userEmail) {
    return <>{children}</>;
  }

  // optional: show a loading indicator
  if (isLoading || result?.isLoading || userEmail === undefined) {
    return <div>Loading...</div>;
  }
};

export default AuthWrapper;
