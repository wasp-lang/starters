import { type Task } from "wasp/entities";
import { HttpError } from "wasp/server";
import {
  type CreateTask,
  type DeleteTasks,
  type UpdateTaskStatus,
} from "wasp/server/operations";

type CreateTaskArgs = Pick<Task, "description"> & {
  tagIds: number[];
};

export const createTask: CreateTask<CreateTaskArgs, Task> = async (
  { description, tagIds },
  context,
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
      tags: {
        connect: tagIds.map((tag) => ({
          id: tag,
        })),
      },
    },
  });
};

type UpdateTaskStatusArgs = Pick<Task, "id" | "isDone">;

export const updateTaskStatus: UpdateTaskStatus<UpdateTaskStatusArgs> = async (
  { id, isDone },
  context,
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

type DeleteTasksArgs = Task["id"][];

export const deleteTasks: DeleteTasks<DeleteTasksArgs> = async (
  idsToDelete,
  context,
) => {
  return context.entities.Task.deleteMany({
    where: {
      id: {
        in: idsToDelete,
      },
    },
  });
};
