import { FC } from "react";
import classes from "./Task.module.css";

import { Typography, Card, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

import { TaskType } from "../../types/types";

interface TaskProps {
  task: TaskType;
  editTask: any;
  deleteTask: any;
  isActionDisabled: boolean;
}

const Task: FC<TaskProps> = ({
  task,
  editTask,
  deleteTask,
  isActionDisabled,
}) => {
  return (
    <Card className={classes.Task}>
      <Typography className={classes.Title} variant="body1">
        {task.title}
      </Typography>
      <div className={classes.ActionButtons}>
        <IconButton
          color="primary"
          onClick={() => editTask(task)}
          disabled={isActionDisabled}
        >
          <Edit />
        </IconButton>
        <IconButton
          color="secondary"
          onClick={() => deleteTask(task.id)}
          disabled={isActionDisabled}
        >
          <Delete />
        </IconButton>
      </div>
    </Card>
  );
};

export default Task;
