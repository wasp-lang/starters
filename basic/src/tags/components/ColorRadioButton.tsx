import { cx } from "../../common/tailwind";
import { ColorOption } from "./colors";

interface ColorRadioButtonProps extends ColorOption {
  isSelected: boolean;
  onChange: (color: string | undefined) => void;
}

export function ColorRadioButton({
  isSelected,
  color,
  bg,
  onChange,
}: ColorRadioButtonProps) {
  return (
    <div className="relative flex items-center">
      <label
        className={cx(
          "duration-500-sm flex h-8 w-8 cursor-pointer items-center justify-center rounded-full drop-shadow-lg transition-all",
          isSelected && [
            "ring-[1px] ring-black",
            "before:absolute before:h-3/5 before:w-[1px] before:rotate-45 before:bg-black",
            "after:absolute after:h-3/5 after:w-[1px] after:-rotate-45 after:bg-black",
          ],
        )}
        style={{ background: bg }}
      >
        <input
          type="radio"
          name="tagColor"
          value={color}
          checked={isSelected}
          onChange={() => onChange(color)}
          className="hidden"
        />
      </label>
    </div>
  );
}
