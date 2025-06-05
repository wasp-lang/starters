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
          <button className="font-medium" onClick={deleteCompletedTasks}>
            🗑️ Clear completed
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
