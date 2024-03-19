export type CreateCourseRequest = {
  name: string;
  urlName: string;
};

export type CreateCourseResponse = {
  name: string;
  urlName: string;
  owner: string;
  isRunning: boolean;
};
