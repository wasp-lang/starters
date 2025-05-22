import { getTasks, useQuery } from "wasp/client/operations";
import { CreateTaskForm } from "./CreateTaskForm";
import { TaskList } from "./TaskList";

export function TasksSection() {
  const { data: tasks, isLoading, isSuccess } = useQuery(getTasks);

  return (
    <section className="card flex w-full max-w-3xl basis-4/5 flex-col gap-6">
      <CreateTaskForm />
      {isLoading && <p>Loading...</p>}
      {isSuccess && <TaskList tasks={tasks} />}
    </section>
  );
}
