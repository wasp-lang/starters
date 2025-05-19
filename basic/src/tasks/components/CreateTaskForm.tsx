import React from "react";
import { createTask, getTags, useQuery } from "wasp/client/operations";
import { Tag } from "wasp/entities";
import { Button } from "../../common/Button";
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
    <form
      onSubmit={createNewTask}
      className="flex w-full flex-col gap-6 bg-neutral-900 p-4 py-6 border border-neutral-800 rounded-lg"
    >
      <h2 className="text-xl font-semibold">Create a new task:</h2>
      <div className="flex flex-col gap-1">
        <label className="text-neutral-300">Description:</label>
        <input
          type="text"
          name="description"
          placeholder="What do I need to do?"
          className="accent-wasp-yellow bg-neutral-950 text-white rounded w-full p-2 placeholder:text-neutral-600"
          value={state.description}
          onChange={(e) => setState({ ...state, description: e.target.value })}
        />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-neutral-300">Select tags:</span>
        <ul className="flex flex-wrap gap-x-4 gap-y-2">
          {tags?.map((tag) => (
            <TagLabel
              key={tag.id}
              tag={tag}
              isActive={state.tagIds.includes(tag.id)}
              onClick={toggleTag}
            />
          ))}
        </ul>
      </div>
      <Button type="submit" className="self-end">
        Create
      </Button>
    </form>
  );

  async function createNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { description, tagIds } = state;

    try {
      await createTask({ description, tagIds });
      setState(initialState);
    } catch (err: unknown) {
      if (err instanceof Error) {
        window.alert("Error while creating task: " + err.message);
      }
      window.alert("Error while creating task: " + err);
    }
  }

  function toggleTag(tag: Tag) {
    if (state.tagIds.includes(tag.id)) {
      setState({
        ...state,
        tagIds: state.tagIds.filter((id) => id !== tag.id),
      });
    } else {
      setState({ ...state, tagIds: [...state.tagIds, tag.id] });
    }
  }
}
