import { createTask } from "wasp/client/operations";

export function CreateTaskForm() {
  return (
    <form
      onSubmit={createNewTask}
      className="flex w-full border border-gray-800 rounded overflow-clip"
    >
      <input
        type="text"
        name="description"
        defaultValue=""
        placeholder="Enter your task here..."
        className="accent-wasp-yellow bg-black text-white w-full px-4 placeholder:text-gray-600"
      />
      <button
        type="submit"
        className="text-black self-end font-semibold px-4 py-2 bg-wasp-yellow shrink-0"
      >
        Create
      </button>
    </form>
  );
}

const createNewTask: React.FormEventHandler<HTMLFormElement> = async (
  event
) => {
  event.preventDefault();
  const description = event.currentTarget.description.value;
  event.currentTarget.reset();

  try {
    await createTask({ description });
  } catch (err: unknown) {
    if (err instanceof Error) {
      window.alert("Error while creating task: " + err.message);
    }
    window.alert("Error while creating task: " + err);
  }
};
