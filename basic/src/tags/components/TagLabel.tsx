import { Tag } from "wasp/entities";
import { cx } from "../../common/tailwind";

interface TagLabelProps {
  tag: Tag;
  isActive: boolean;
  onClick?: (tag: Tag) => void;
  size?: "normal" | "small";
}

export function TagLabel({
  tag,
  isActive,
  onClick,
  size = "normal",
}: TagLabelProps) {
  return (
    <li
      key={tag.id}
      className={cx(
        "rounded-full border font-mono font-bold transition-all",
        size === "normal" && "px-4 py-1.5 text-sm",
        size === "small" && "px-3 py-1 text-xs",
        onClick ? "hover:cursor-pointer hover:scale-[1.02]" : "cursor-default"
      )}
      onClick={() => onClick?.(tag)}
      style={
        isActive
          ? {
              backgroundColor: tag.color,
              borderColor: "black",
              color: "black",
            }
          : {
              backgroundColor: `hsl(from ${tag.color} h s l / 0.15)`,
              borderColor: tag.color,
              color: tag.color,
            }
      }
    >
      {tag.name}
    </li>
  );
}
