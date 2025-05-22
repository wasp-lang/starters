import React from "react";
import { createTag } from "wasp/client/operations";
import { Button } from "../../common/Button";
import { Input } from "../../common/Input";
import { ColorRadioButton } from "./ColorRadioButton";
import { TagLabel } from "./TagLabel";
import { COLORS } from "./colors";

interface CreateTagFormValues {
  name: string;
  color: string | undefined;
}

const initialState: CreateTagFormValues = {
  name: "",
  color: undefined,
} as const;

export function CreateTagForm() {
  const [state, setState] = React.useState<CreateTagFormValues>(initialState);

  return (
    <form onSubmit={createNewTag} className="flex w-full flex-col gap-6">
      <Input
        id="name"
        label="Name"
        value={state.name}
        onChange={(e) => setState({ ...state, name: e.target.value })}
      />
      <div className="flex flex-col gap-1">
        <label className="text-black">Color:</label>
        <div className="flex flex-wrap gap-2">
          {COLORS.map(({ color, bg }, index) => (
            <ColorRadioButton
              key={index}
              isSelected={state.color === color}
              color={color}
              bg={bg}
              onChange={(color) => setState({ ...state, color })}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-black">Preview:</label>
        {state.name && (
          <div className="flex flex-wrap gap-2">
            <TagLabel
              tag={{
                id: -1,
                name: state.name,
                color: state.color ?? "transparent",
              }}
              isActive={true}
            />
            <TagLabel
              tag={{
                id: -1,
                name: state.name,
                color: state.color ?? "transparent",
              }}
              isActive={false}
            />
          </div>
        )}
      </div>

      <Button type="submit" className="self-end">
        Create
      </Button>
    </form>
  );

  async function createNewTag(
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    const { name, color } = state;
    setState(initialState);

    console.log(name, color);

    try {
      await createTag({ name, color });
    } catch (err: unknown) {
      if (err instanceof Error) {
        window.alert("Error while creating tag: " + err.message);
      }
      window.alert("Error while creating tag: " + err);
    }
  }
}
