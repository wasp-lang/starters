import { ClassNameValue, twJoin } from "tailwind-merge";
import { Tag } from "wasp/entities";

type TagLabelSize = "md" | "sm";

interface TagLabelProps {
  tag: Pick<Tag, "id" | "color" | "name">;
  isActive: boolean;
  size?: TagLabelSize;
}

export function TagLabel({ tag, isActive, size = "md" }: TagLabelProps) {
  return (
    <span
      className={twJoin(
        "inline-block truncate rounded-full border font-mono font-semibold text-black transition-all",
        sizeStyles[size],
      )}
      style={
        isActive
          ? {
              backgroundColor: tag.color,
              borderColor: "black",
            }
          : {
              background: `repeating-linear-gradient(
              45deg,
              hsl(from ${tag.color} h s l / 0.30),
              hsl(from ${tag.color} h s l / 0.30) 4px,
              hsl(0, 0%, 0%, 0.30) 4px,
              hsl(0, 0%, 0%, 0.30) 6px
              )`,
              borderColor: "black",
            }
      }
    >
      {tag.name}
    </span>
  );
}

const sizeStyles: Record<TagLabelSize, ClassNameValue> = {
  md: "px-4 py-1.5 text-sm",
  sm: "px-3 py-1 text-xs",
};
