import { type AuthUser } from "wasp/auth";
import { getTasks, useQuery } from "wasp/client/operations";
import { TaskList } from "./TaskList";

export const TaskDashboardPage = ({ user }: { user: AuthUser }) => {
  const { data: tasks, isLoading, error } = useQuery(getTasks);

  if (isLoading) return "Loading...";
  if (error) return "Error: " + error;

  return (
    <section className="flex flex-col items-center gap-12 p-12 py-24">
      <h1 className="text-4xl font-bold">
        {user.username}'s tasks{" "}
        <span className="mx-2 text-wasp-yellow">{"=}"}</span>
      </h1>
      {tasks && <TaskList tasks={tasks} />}
    </section>
  );
};
