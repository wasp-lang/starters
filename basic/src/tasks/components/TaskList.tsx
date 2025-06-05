import { deleteTasks, getTasks, useQuery } from "wasp/client/operations";
import { TaskListItem } from "./TaskListItem";

export function TaskList() {
  const { data: tasks, isLoading, isSuccess } = useQuery(getTasks);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!isSuccess) {
    return <p>Error loading tasks.</p>;
  }

  const completedTasks = tasks.filter((task) => task.isDone);

  async function deleteCompletedTasks() {
    if (completedTasks.length === 0) {
      return;
    }

    const taskIds = completedTasks.map((task) => task.id);
    try {
      await deleteTasks(taskIds);
    } catch (err: unknown) {
      window.alert(`Error while deleting tasks: ${String(err)}`);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <span>
            {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
          </span>
          <span className="mx-2">·</span>
          <span>{completedTasks.length} completed</span>
        </div>
        {completedTasks.length > 0 && (
          <button
            className="flex items-center gap-1 font-medium"
            onClick={deleteCompletedTasks}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              className="fill-black"
            >
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
            </svg>
            Clear completed
          </button>
        )}
      </div>
      <ul className="overflow-clip rounded">
        {tasks.map((task) => (
          <TaskListItem task={task} key={task.id} />
        ))}
      </ul>
    </div>
  );
}
