import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import {
  legacy_createStore,
  combineReducers,
  applyMiddleware,
  AnyAction,
} from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

import taskReducer from "./reducers/taskReducer";

const rootReducer = combineReducers({
  task: taskReducer,
});

const store = legacy_createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type ReduxState = ReturnType<typeof rootReducer>;
export type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;

export const useTypedDispatch = () => useDispatch<TypedDispatch>();
export const useTypedSelector: TypedUseSelectorHook<ReduxState> = useSelector;

export default store;
