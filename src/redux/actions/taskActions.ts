import { Dispatch } from "redux";
import { v4 as uuid4 } from "uuid";

import * as actionTypes from "../actionTypes";
import { TaskType } from "../../types/types";

export const addTask = (title: string) => {
  return async (dispatch: Dispatch) => {
    if (!title) {
      dispatch({
        type: actionTypes.ERROR_OCCURED,
        payload: { title: "Enter valid title for task", type: "error" },
      });
      return false;
    }

    dispatch({ type: actionTypes.LOADING });
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title }),
        }
      );
      console.log("response: ", await response.json());
      dispatch({ type: actionTypes.ADD_TASK, payload: { id: uuid4(), title } });
      return true;
    } catch (err) {
      console.log("addTask Error: ", err);
      dispatch({
        type: actionTypes.ERROR_OCCURED,
        payload: { title: "Something went wrong", type: "error" },
      });
      return false;
    }
  };
};

export const editTask = ({ id, title }: TaskType) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: actionTypes.LOADING });

    if (!title) {
      dispatch({
        type: actionTypes.ERROR_OCCURED,
        payload: { title: "Enter valid title for task", type: "error" },
      });
      return false;
    }
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/1`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title }),
        }
      );
      console.log("response: ", await response.json());
      dispatch({ type: actionTypes.EDIT_TASK, payload: { id, title } });
      return true;
    } catch (err) {
      console.log("editTask Error: ", err);
      dispatch({
        type: actionTypes.ERROR_OCCURED,
        payload: { title: "Something went wrong", type: "error" },
      });
      return false;
    }
  };
};

type DeleteTaskProp = {
  id: string;
};

export const deleteTask = ({ id }: DeleteTaskProp) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: actionTypes.LOADING });

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/1`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response: ", await response.json());
      dispatch({ type: actionTypes.DELETE_TASK, payload: { id } });
      return true;
    } catch (err) {
      console.log("deleteTask Error: ", err);
      dispatch({
        type: actionTypes.ERROR_OCCURED,
        payload: { title: "Something went wrong", type: "error" },
      });
      return false;
    }
  };
};

export const getTasks = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: actionTypes.LOADING });
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const tasks = await response.json();
      console.log("response: ", tasks);
      dispatch({ type: actionTypes.GET_TASKS, payload: { tasks } });
    } catch (err) {
      console.log("getTasks Error: ", err);
      dispatch({
        type: actionTypes.ERROR_OCCURED,
        payload: { title: "Something went wrong", type: "error" },
      });
    }
  };
};
