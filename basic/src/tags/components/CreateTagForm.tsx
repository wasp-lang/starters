import React from "react";
import { createTag } from "wasp/client/operations";
import { Input } from "../../common/Input";
import { ColorRadioButtons } from "./ColorRadioButtons";
import { generateBrightColor } from "./colors";
import { TagLabel } from "./TagLabel";

interface CreateTagFormProps {
  onTagCreated?: () => void;
}

interface CreateTagFormValues {
  name: string;
  color: string;
}

const initialState: CreateTagFormValues = {
  name: "",
  color: generateBrightColor(),
};

export const CREATE_TAG_FORM_ID = "create-tag";

export function CreateTagForm({ onTagCreated }: CreateTagFormProps) {
  const [state, setState] = React.useState<CreateTagFormValues>(initialState);

  return (
    <form
      id={CREATE_TAG_FORM_ID}
      onSubmit={createNewTag}
      className="flex w-full flex-col gap-6"
    >
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
        <span className="text-black">Preview:</span>
        {state.name && (
          <div className="flex flex-wrap gap-2">
            <TagLabel tag={{ id: -1, ...state }} isActive={true} />
            <TagLabel tag={{ id: -1, ...state }} isActive={false} />
          </div>
        )}
      </div>
    </form>
  );

  async function createNewTag(
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    event.stopPropagation();

    try {
      await createTag(state);
      setState(initialState);
      onTagCreated?.();
    } catch (err: unknown) {
      window.alert(`Error while creating tag: ${String(err)}`);
    }
  }
}
