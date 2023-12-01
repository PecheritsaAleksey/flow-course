"use client";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getValidAuthTokens } from "@/lib/cookies";
import { RootState } from "@/store";
import { useGetAuthDataQuery } from "@/store/services/auth";
import { useEffect } from "react";
import { logout } from "@/store/slices/auth";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const { push } = useRouter();
  const { userEmail } = useSelector((state: RootState) => state.auth);

  const { token } = getValidAuthTokens();

  // this query will only execute if the token is valid and the user email is not already in the redux store
  const { error, isLoading } = useGetAuthDataQuery(
    { token: token || "" },
    {
      // The useGetAuthDataQuery hook will not execute the query at all if these values are falsy
      skip: !!userEmail || !token,
    }
  );

  // if the user doesnt have a valid token, redirect to login page
  useEffect(() => {
    if (!token) {
      push("/signin");
      // will explain this in a moment
      dispatch(logout());
    }
  }, [token, push]);

  // optional: show a loading indicator while the query is loading
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default AuthWrapper;
