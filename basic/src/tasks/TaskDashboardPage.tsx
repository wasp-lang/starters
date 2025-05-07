import { FormEvent, FormEventHandler } from "react";
import { type AuthUser } from "wasp/auth";
import { logout } from "wasp/client/auth";
import {
  createTask,
  deleteTasks,
  getTasks,
  updateTaskStatus,
  useQuery,
} from "wasp/client/operations";
import { type Task } from "wasp/entities";

export const TaskDashboardPage = ({ user }: { user: AuthUser }) => {
  const { data: tasks, isLoading, error } = useQuery(getTasks);

  if (isLoading) return "Loading...";
  if (error) return "Error: " + error;

  const completed = tasks?.filter((task) => task.isDone).map((task) => task.id);

  return (
    <main>
      <h1>
        {user.username}
        {`'s tasks :)`}
      </h1>
      <NewTaskForm />
      {tasks && <TasksList tasks={tasks} />}
      <div className="buttons">
        <button
          className="logout"
          onClick={() => void deleteTasks(completed ?? [])}
        >
          Delete completed
        </button>
        <button className="logout" onClick={logout}>
          Logout
        </button>
      </div>
    </main>
  );
};

function Todo({ id, isDone, description }: Task) {
  const handleIsDoneChange: FormEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      await updateTaskStatus({
        id,
        isDone: event.currentTarget.checked,
      });
    } catch (err: any) {
      window.alert("Error while updating task " + err?.message);
    }
  };

  return (
    <li>
      <span className="todo-item">
        <input
          type="checkbox"
          id={id.toString()}
          checked={isDone}
          onChange={handleIsDoneChange}
        />
        <span>{description}</span>
        <button onClick={() => void deleteTasks([id])}>Delete</button>
      </span>
    </li>
  );
}

function TasksList({ tasks }: { tasks: Task[] }) {
  if (tasks.length === 0) return <p>No tasks yet.</p>;
  return (
    <ol className="tasklist">
      {tasks.map((task, idx) => (
        <Todo {...task} key={idx} />
      ))}
    </ol>
  );
}

function NewTaskForm() {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const description = event.currentTarget.description.value;
      console.log(description);
      event.currentTarget.reset();
      await createTask({ description });
    } catch (err: any) {
      window.alert("Error: " + err?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="description" type="text" defaultValue="" />
      <input type="submit" value="Create task" />
    </form>
  );
}
