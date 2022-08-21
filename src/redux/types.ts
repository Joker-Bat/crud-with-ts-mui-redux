import { TaskType } from "../types/types";
import { ActionTypes } from "./actionTypes";

interface Message {
  title: string;
  type: string;
}

export type InitialStateType = {
  loading: boolean;
  message: Message;
  tasks: TaskType[];
};

export type ActionType = {
  type: ActionTypes;
  payload?: any;
};
