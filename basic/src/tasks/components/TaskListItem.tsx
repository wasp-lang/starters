import { updateTaskStatus } from "wasp/client/operations";
import { TagLabel } from "../../tags/components/TagLabel";
import { TaskWithTags } from "../queries";

interface TaskListItemProps {
  task: TaskWithTags;
}

export function TaskListItem({ task }: TaskListItemProps) {
  return (
    <li className="group flex justify-between gap-4 rounded-lg px-6 py-3 odd:bg-neutral-100 even:bg-white">
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          className="h-5 w-5 shrink-0 accent-wasp-yellow"
          id={task.id.toString()}
          checked={task.isDone}
          onChange={setTaskDone}
        />
        <div className="flex flex-col">
          <span>{task.description}</span>
          <span className="text-xs text-neutral-500">
            {task.createdAt.toLocaleDateString()}
          </span>
        </div>
      </div>
      <ul className="flex flex-wrap gap-2 self-center">
        {task.tags.map((tag) => (
          <TagLabel
            as="li"
            key={tag.id}
            tag={tag}
            isActive={true}
            size="small"
          />
        ))}
      </ul>
    </li>
  );

  async function setTaskDone(
    event: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> {
    try {
      await updateTaskStatus({
        id: task.id,
        isDone: event.currentTarget.checked,
      });
    } catch (err: unknown) {
      window.alert(`Error while updating task: ${String(err)}`);
    }
  }
}
