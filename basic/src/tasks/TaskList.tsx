import { deleteTasks, updateTaskStatus } from "wasp/client/operations";
import { Task } from "wasp/entities";
import { CreateTaskForm } from "./CreateTaskFrom";

interface TaskListProps {
  tasks: Task[];
}

export function TaskList({ tasks }: TaskListProps) {
  // TODO: show empty state

  return (
    <section className="max-w-3xl flex flex-col gap-6 w-full rounded-xl p-6 py-8 bg-black border border-wasp-yellow shadow-lg  shadow-wasp-yellow">
      <CreateTaskForm />
      <ul className="border border-gray-800 divide-y divide-gray-800 rounded overflow-clip">
        {tasks.map((task) => (
          <TaskListItem task={task} key={task.id} />
        ))}
      </ul>
      <button
        className="text-black rounded font-semibold px-4 py-2 bg-wasp-yellow"
        onClick={() => void deleteCompletedTasks(tasks)}
      >
        Delete completed tasks
      </button>
    </section>
  );
}

async function deleteCompletedTasks(tasks: Task[]) {
  if (tasks.length === 0) {
    return;
  }
  const taskIds = tasks.filter((task) => task.isDone).map((task) => task.id);
  try {
    await deleteTasks(taskIds);
  } catch (err: unknown) {
    if (err instanceof Error) {
      window.alert("Error while deleting tasks: " + err.message);
    }
    window.alert("Error while deleting tasks: " + err);
  }
}

interface TaskListItemProps {
  task: Task;
}

function TaskListItem({ task }: TaskListItemProps) {
  const setTaskDone: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      await updateTaskStatus({
        id: task.id,
        isDone: event.currentTarget.checked,
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        window.alert("Error while updating task: " + err.message);
      }
      window.alert("Error while updating task:" + err);
    }
  };

  return (
    <li className="flex group gap-8 justify-between px-4 py-2 items-center ">
      <div className="flex gap-2 items-center w-full">
        <input
          type="checkbox"
          className="accent-wasp-yellow h-4 w-4 shrink-0"
          id={task.id.toString()}
          checked={task.isDone}
          onChange={setTaskDone}
        />
        <span>{task.description}</span>
      </div>
      <button
        className="shrink-0 font-semibold text-wasp-yellow"
        onClick={() => void deleteTasks([task.id])}
      >
        Delete
      </button>
    </li>
  );
}
