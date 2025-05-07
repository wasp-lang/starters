import { type Task } from "wasp/entities";
import { HttpError } from "wasp/server";
import {
  type CreateTask,
  type DeleteTasks,
  type UpdateTaskStatus,
} from "wasp/server/operations";

type CreateTaskArgs = Pick<Task, "description">;

export const createTask: CreateTask<CreateTaskArgs, Task> = async (
  { description },
  context
) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  return context.entities.Task.create({
    data: {
      description,
      isDone: false,
      user: {
        connect: {
          id: context.user.id,
        },
      },
    },
  });
};

type UpdateTaskStatusArgs = Pick<Task, "id" | "isDone">;

export const updateTaskStatus: UpdateTaskStatus<UpdateTaskStatusArgs> = async (
  { id, isDone },
  context
) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  return context.entities.Task.update({
    where: {
      id,
    },
    data: { isDone },
  });
};

export const deleteTasks: DeleteTasks<Task["id"][]> = async (
  idsToDelete,
  context
) => {
  return context.entities.Task.deleteMany({
    where: {
      id: {
        in: idsToDelete,
      },
    },
  });
};
