import { ReactElement } from "react";

//interfaces
export interface signupUser {
  email: string;
  password: string;
  "confirm-password": string;
}

export interface LoggedinUser {
  id: string;
  email: string;
  password: string;
}

export interface RegisterUser {
  email: string;
  password: string;
}

export interface ErrorMessage {
  message: string;
}

export type ChildrenProps = {
  children: ReactElement | ReactElement[];
};
