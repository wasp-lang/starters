import React from "react";
import { createTag } from "wasp/client/operations";
import { Button } from "../../common/Button";
import { Input } from "../../common/Input";
import { generateBrightColor } from "../colors";
import { ColorRadioButtons } from "./ColorRadioButtons";
import { TagLabel } from "./TagLabel";

interface CreateTagFormProps {
  onTagCreated?: () => void;
  onCancel?: () => void;
}

export interface CreateTagFormValues {
  name: string;
  color: string;
}

const initialState: CreateTagFormValues = {
  name: "",
  color: generateBrightColor(),
} as const;

export function CreateTagForm({ onTagCreated, onCancel }: CreateTagFormProps) {
  const [state, setState] = React.useState<CreateTagFormValues>(initialState);

  return (
    <form onSubmit={createNewTag} className="flex w-full flex-col gap-6">
      <Input
        required
        id="name"
        label="Name"
        value={state.name}
        onChange={(e) => setState({ ...state, name: e.target.value })}
      />
      <ColorRadioButtons
        color={state.color}
        setColor={(color) => setState({ ...state, color })}
      />

      <div className="flex flex-col gap-2">
        <label className="text-black">Preview:</label>
        {state.name && (
          <div className="flex flex-wrap gap-2">
            <TagLabel
              tag={{
                userId: -1,
                id: -1,
                name: state.name,
                color: state.color ?? "transparent",
              }}
              isActive={true}
            />
            <TagLabel
              tag={{
                userId: -1,
                id: -1,
                name: state.name,
                color: state.color ?? "transparent",
              }}
              isActive={false}
            />
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit" className="self-end">
          Create
        </Button>

        <Button
          type="button"
          className="self-end"
          onClick={onCancel}
          variant="danger"
        >
          Cancel
        </Button>
      </div>
    </form>
  );

  async function createNewTag(
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    event.stopPropagation();

    setState(initialState);

    try {
      await createTag(state);
      onTagCreated?.();
    } catch (err: unknown) {
      window.alert(`Error while creating tag: ${String(err)}`);
    }
  }
}
