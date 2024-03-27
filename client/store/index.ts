import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/auth";
import { coursesApi } from "./services/courses";
import { authReducer } from "./slices/auth";
import { coursesReducer } from "./slices/courses";

export const store = configureStore({
  reducer: {
    // regular reduces
    auth: authReducer,
    courses: coursesReducer,
    // rtks query api
    [authApi.reducerPath]: authApi.reducer,
    [coursesApi.reducerPath]: coursesApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, coursesApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
