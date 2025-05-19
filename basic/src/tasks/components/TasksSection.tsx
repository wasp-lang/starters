import { getTasks, useQuery } from "wasp/client/operations";
import { CreateTaskForm } from "./CreateTaskForm";
import { TaskList } from "./TaskList";

export function TasksSection() {
  const { data: tasks, isLoading, isSuccess } = useQuery(getTasks);

  return (
    <section className="max-w-3xl flex flex-col gap-6 w-full rounded-xl p-6 py-8 bg-neutral-950 border border-wasp-yellow shadow-[0_0_50px_-20px] shadow-wasp-yellow basis-3/5">
      <h2 className="text-2xl font-semibold">Todos</h2>
      <CreateTaskForm />
      {isLoading && <p>Loading...</p>}
      {isSuccess && <TaskList tasks={tasks} />}
    </section>
  );
}
