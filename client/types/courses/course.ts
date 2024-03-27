export type CreateCourseRequest = {
  name: string;
  description: string;
  urlName: string;
};

export type CreateCourseResponse = {
  name: string;
  description: string;
  urlName: string;
  owner: string;
  isRunning: boolean;
};

export type Course = {
  name: string;
  description: string;
  urlName: string;
  owner: string;
  isRunning: boolean;
};
