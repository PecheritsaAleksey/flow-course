"use client";

import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getValidAuthTokens } from "@/lib/cookies";
import { RootState } from "@/store";
import { useLayoutEffect } from "react";
import { logout } from "@/store/slices/auth";

const ALLOWED_URLS = ["/signin", "/signup"];

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const { push } = useRouter();
  const { userEmail } = useSelector((state: RootState) => state.auth);
  const { accessToken } = getValidAuthTokens();

  // if the user doesnt have a valid token, redirect to login page
  useLayoutEffect(() => {
    if (!accessToken) {
      push("/signin");
      dispatch(logout());
    }
  }, [accessToken, push]);

  const pathname = usePathname();
  if (ALLOWED_URLS.includes(pathname) || userEmail) {
    return <>{children}</>;
  }

  // optional: show a loading indicator
  if (userEmail === undefined) {
    return <div>Loading...</div>;
  }
};

export default AuthWrapper;
