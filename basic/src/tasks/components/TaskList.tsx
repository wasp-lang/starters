import { deleteTasks } from "wasp/client/operations";
import { TaskWithTags } from "../queries";
import { TaskListItem } from "./TaskListItem";

interface TaskListProps {
  tasks: TaskWithTags[];
}

export function TaskList({ tasks }: TaskListProps) {
  if (tasks.length === 0) {
    return null;
  }

  const completedTasks = tasks.filter((task) => task.isDone);

  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p>
          <span>
            {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
          </span>
          <span className="mx-2">·</span>
          <span>{completedTasks.length} completed</span>
        </p>
        {completedTasks.length > 0 && (
          <button className="font-medium" onClick={deleteCompletedTasks}>
            🗑️ Clear completed
          </button>
        )}
      </div>
      <ul className="divide-y divide-neutral-800 overflow-clip rounded border border-neutral-800">
        {tasks.map((task) => (
          <TaskListItem task={task} key={task.id} />
        ))}
      </ul>
    </section>
  );

  async function deleteCompletedTasks() {
    if (completedTasks.length === 0) {
      return;
    }

    const taskIds = completedTasks.map((task) => task.id);
    try {
      await deleteTasks(taskIds);
    } catch (err: unknown) {
      if (err instanceof Error) {
        window.alert("Error while deleting tasks: " + err.message);
      }
      window.alert("Error while deleting tasks: " + err);
    }
  }
}
