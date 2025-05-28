import React from "react";
import { createTask, getTags, useQuery } from "wasp/client/operations";
import { Tag } from "wasp/entities";
import { Button } from "../../common/Button";
import { Input } from "../../common/Input";
import { CreateTagDialog } from "../../tags/components/CreateTagDialog";
import { TagLabel } from "../../tags/components/TagLabel";

interface CreateTaskFormValues {
  description: string;
  tagIds: number[];
}

const initialState: CreateTaskFormValues = {
  description: "",
  tagIds: [],
};

export function CreateTaskForm() {
  const [state, setState] = React.useState<CreateTaskFormValues>(initialState);
  const { data: tags } = useQuery(getTags);

  return (
    <form onSubmit={createNewTask} className="flex w-full flex-col gap-6">
      <h2 className="text-xl font-semibold">Create a new task:</h2>
      <Input
        required
        id="description"
        label="Description"
        placeholder="What do I need to do?"
        value={state.description}
        onChange={(e) => setState({ ...state, description: e.target.value })}
      />
      <div className="bg-00 flex flex-col gap-2">
        <span>Select tags:</span>
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {tags?.map((tag) => (
            <li key={tag.id}>
              <button type="button" onClick={() => toggleTag(tag.id)}>
                <TagLabel tag={tag} isActive={state.tagIds.includes(tag.id)} />
              </button>
            </li>
          ))}
          <li>
            <CreateTagDialog />
          </li>
        </ul>
      </div>
      <Button type="submit" className="self-end">
        Create
      </Button>
    </form>
  );

  async function createNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();

    try {
      await createTask(state);
      setState(initialState);
    } catch (err: unknown) {
      window.alert(`Error while creating task: ${String(err)}`);
    }
  }

  function toggleTag(id: Tag["id"]) {
    if (state.tagIds.includes(id)) {
      setState({
        ...state,
        tagIds: state.tagIds.filter((tagId) => tagId !== id),
      });
    } else {
      setState({ ...state, tagIds: [...state.tagIds, id] });
    }
  }
}
