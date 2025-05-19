import React from "react";
import { createTag } from "wasp/client/operations";
import { Button } from "../../common/Button";
import { cx } from "../../common/tailwind";

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
      <div className="flex flex-col gap-1">
        <label className="text-neutral-300"> Name:</label>
        <input
          type="text"
          name="tName"
          className="accent-wasp-yellow bg-neutral-950 text-white w-full p-2 placeholder:text-neutral-600"
          value={state.name}
          onChange={(e) => setState({ ...state, name: e.target.value })}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-neutral-300">Color:</label>
        <div className="flex flex-wrap gap-2">
          {COLORS.map(({ color, bg }, index) => {
            const isSelected = state.color === color;

            return (
              <div key={index} className="flex items-center">
                <label
                  className={cx(
                    "w-8 h-8 rounded-full cursor-pointer",
                    isSelected &&
                      "ring-2 ring-wasp-yellow ring-offset-2 ring-offset-neutral-950"
                  )}
                  style={{ background: bg }}
                  title={`Color ${index + 1}`}
                >
                  <input
                    type="radio"
                    name="tagColor"
                    value={color}
                    checked={isSelected}
                    onChange={() => setState({ ...state, color: color })}
                    className="hidden"
                  />
                </label>
              </div>
            );
          })}
        </div>
      </div>
      <Button type="submit" className="self-end">
        Create
      </Button>
    </form>
  );

  async function createNewTag(
    event: React.FormEvent<HTMLFormElement>
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

interface ColorOption {
  color: CreateTagFormValues["color"];
  bg: string;
}

const COLORS: ColorOption[] = [
  {
    color: undefined,
    bg: `\
      conic-gradient(
        hsl(360 100% 50%),
        hsl(315 100% 50%),
        hsl(270 100% 50%),
        hsl(225 100% 50%),
        hsl(180 100% 50%),
        hsl(135 100% 50%),
        hsl(90 100% 50%),
        hsl(45 100% 50%),
        hsl(0 100% 50%)
      )`,
  },
  ...generateBrightColors(),
];

function generateBrightColors(): ColorOption[] {
  const colors: ColorOption[] = [];
  for (let hue = 0; hue <= 360; hue += 30) {
    const hslColor = `hsl(${hue}, 100%, 65%)`;
    colors.push({ bg: hslColor, color: hslColor });
  }
  return colors;
}
