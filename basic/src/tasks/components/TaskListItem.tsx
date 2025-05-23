import { updateTaskStatus } from "wasp/client/operations";
import { TagLabel } from "../../tags/components/TagLabel";
import { TaskWithTags } from "../queries";

interface TaskListItemProps {
  task: TaskWithTags;
}

export function TaskListItem({ task }: TaskListItemProps) {
  return (
    <li className="group flex gap-4 p-4">
      <input
        type="checkbox"
        className="h-5 w-5 shrink-0 accent-wasp-yellow"
        id={task.id.toString()}
        checked={task.isDone}
        onChange={setTaskDone}
      />
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col">
          <span>{task.description}</span>
          <span className="text-xs text-neutral-500">
            {task.createdAt.toLocaleDateString()}
          </span>
        </div>
        <ul className="flex flex-wrap gap-2">
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
      </div>
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
      if (err instanceof Error) {
        window.alert("Error while updating task: " + err.message);
      }
      window.alert("Error while updating task:" + err);
    }
  }
}
