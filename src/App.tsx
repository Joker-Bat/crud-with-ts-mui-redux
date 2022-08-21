import { useState, useEffect, useRef } from "react";
import classes from "./App.module.css";

import { TextField, Button, Alert, Typography } from "@mui/material";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";

import { useTypedSelector, useTypedDispatch } from "./redux";
import { TaskType, FormValues } from "./types/types";
import Task from "./components/Task/Task";
import { addTask, deleteTask, editTask } from "./redux/actions/taskActions";

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.title ? values : {},
    errors: !values.title
      ? {
          title: {
            type: "required",
            message: "Enter valid title for task.",
          },
        }
      : {},
  };
};

/**
 *
 * @returns App component
 */

function App() {
  const {
    register,
    handleSubmit,
    resetField,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const dispatch = useTypedDispatch();
  const { tasks, loading, message } = useTypedSelector((state) => state.task);

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmitTask: SubmitHandler<FormValues> = async (data) => {
    // If it is editMode then update the task
    if (isEditMode) {
      if (await dispatch(editTask({ id: selectedId, title: data.title }))) {
        resetField("title");
        setIsEditMode(false);
        setSelectedId("");
      }
    } else {
      if (await dispatch(addTask(data.title))) {
        resetField("title");
      }
    }

    inputRef.current?.focus();
  };

  const handleDeleteTask = async (id: string) => {
    if (await dispatch(deleteTask({ id }))) {
      // After deleting an task if its in editMode reset values
      if (isEditMode && selectedId === id) {
        resetField("title");
        setIsEditMode(false);
        setSelectedId("");
      }
    }
  };

  const handleEditTask = (task: TaskType) => {
    if (isEditMode && selectedId === task.id) return;

    setIsEditMode(true);
    setSelectedId(task.id);
    setValue("title", task.title);
    inputRef.current?.focus();
  };

  return (
    <div className={classes.App}>
      <h1 className={classes.Title}>Task Manager</h1>
      <form onSubmit={handleSubmit(handleSubmitTask)} className={classes.Form}>
        <TextField
          className={classes.TextField}
          inputRef={inputRef}
          inputProps={{
            className: classes.InputField,
          }}
          disabled={loading}
          {...register("title", { required: true })}
        />

        <Button
          type="submit"
          className={classes.SubmitButton}
          disabled={loading}
        >
          {isEditMode ? "Update" : "Add"}
        </Button>
        <span
          className={`${classes.Spinner} ${loading ? classes.Show : ""}`}
        ></span>
      </form>

      {errors?.title && (
        <Alert severity="error" className={classes.Alert}>
          {errors.title.message}
        </Alert>
      )}

      {message?.title && (
        <Alert
          severity={message.type === "success" ? "success" : "error"}
          className={classes.Alert}
        >
          {message.title}
        </Alert>
      )}

      {/* Show Task list */}
      {tasks.length > 0 ? (
        tasks.map((task: TaskType) => (
          <Task
            key={task.id}
            task={task}
            isActionDisabled={loading || (isEditMode && task.id !== selectedId)}
            editTask={handleEditTask}
            deleteTask={handleDeleteTask}
          />
        ))
      ) : (
        <Typography variant="h6" color="gray">
          No Tasks yet.
        </Typography>
      )}
    </div>
  );
}

export default App;
