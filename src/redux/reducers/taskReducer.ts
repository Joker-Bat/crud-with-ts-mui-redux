import * as actionTypes from "../actionTypes";
import { InitialStateType, ActionType } from "../types";

const initialState = {
  loading: false,
  message: {
    title: "",
    type: "",
  },
  tasks: [],
} as InitialStateType;

const taskReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case actionTypes.LOADING: {
      return { ...state, loading: true, message: { title: "", type: "" } };
    }
    case actionTypes.ERROR_OCCURED: {
      return {
        ...state,
        message: { title: action.payload.title, type: action.payload.type },
        loading: false,
      };
    }
    case actionTypes.ADD_TASK: {
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        loading: false,
        message: { title: "", type: "" },
      };
    }
    case actionTypes.EDIT_TASK: {
      const updateTasks = state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          task.title = action.payload.title;
        }
        return task;
      });
      return {
        ...state,
        tasks: updateTasks,
        loading: false,
        message: { title: "", type: "" },
      };
    }
    case actionTypes.DELETE_TASK: {
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload.id),
        loading: false,
        message: { title: "", type: "" },
      };
    }
    case actionTypes.GET_TASKS: {
      return {
        ...state,
        tasks: action.payload.tasks,
        loading: false,
        message: { title: "", type: "" },
      };
    }
    default: {
      return state;
    }
  }
};

export default taskReducer;
