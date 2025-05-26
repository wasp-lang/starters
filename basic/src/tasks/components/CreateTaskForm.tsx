import React from "react";
import { createTask, getTags, useQuery } from "wasp/client/operations";
import { Tag } from "wasp/entities";
import { Button } from "../../common/Button";
import { Dialog } from "../../common/Dialog";
import { Input } from "../../common/Input";
import { CreateTagForm } from "../../tags/components/CreateTagForm";
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
  const [tagDialogOpen, setTagDialogOpen] = React.useState(false);
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
            <TagLabel
              as="li"
              key={tag.id}
              tag={tag}
              isActive={state.tagIds.includes(tag.id)}
              onClick={toggleTag}
            />
          ))}
          <li>
            {tagDialogOpen ? (
              <Dialog
                open={tagDialogOpen}
                onClose={() => setTagDialogOpen(false)}
              >
                <section className="card relative flex w-full max-w-sm flex-col gap-6">
                  <button
                    type="button"
                    onClick={() => setTagDialogOpen(false)}
                    className="absolute right-3 top-3 flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="black"
                    >
                      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                    </svg>
                  </button>
                  <h2 className="text-xl font-semibold">Create a new tag:</h2>
                  <CreateTagForm onTagCreated={() => setTagDialogOpen(false)} />
                </section>
              </Dialog>
            ) : (
              <Button
                type="button"
                size="sm"
                className="p-0"
                onClick={() => setTagDialogOpen(true)}
              >
                <span>Add a Tag</span>
                <span>+</span>
              </Button>
            )}
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

    const { description, tagIds } = state;

    try {
      await createTask({ description, tagIds });
      setState(initialState);
    } catch (err: unknown) {
      window.alert(`Error while creating task: ${String(err)}`);
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
