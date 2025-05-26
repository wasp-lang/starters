import { type AuthUser } from "wasp/auth";
import { CreateTaskForm } from "./components/CreateTaskForm";
import { TaskList } from "./components/TaskList";

export const TaskDashboardPage = ({ user }: { user: AuthUser }) => {
  return (
    <div className="flex flex-col items-center gap-12 p-12 py-24">
      <h1 className="text-4xl font-bold">{`${user.username}'s tasks 📋`}</h1>
      <div className="flex w-full flex-col items-center gap-8">
        <section className="card flex w-full max-w-3xl flex-col gap-6">
          <CreateTaskForm />
        </section>
        <section className="card flex w-full max-w-3xl flex-col gap-6">
          <TaskList />
        </section>
      </div>
    </div>
  );
};
