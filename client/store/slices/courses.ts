import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { coursesApi } from "../services/courses";

const initialState = {
  ownedCourses: [],
  joinedCourses: [],
};

const slice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      coursesApi.endpoints.createCourse.matchFulfilled,
      (state, { payload }) => {
        state.ownedCourses.push(payload);
      }
    );
  },
});

export const coursesReducer = slice.reducer;
