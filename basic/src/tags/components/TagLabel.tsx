import { ClassNameValue, twJoin } from "tailwind-merge";
import { Tag } from "wasp/entities";

type TagLabelSize = "md" | "sm" | "tiny";

interface TagLabelProps {
  tag: Pick<Tag, "id" | "color" | "name">;
  isActive: boolean;
  size?: TagLabelSize;
}

export function TagLabel({ tag, isActive, size = "md" }: TagLabelProps) {
  return (
    <span
      className={twJoin(
        "inline-flex items-center gap-1 rounded-full border-2 border-neutral-200 font-mono font-semibold",
        sizeStyles[size],
      )}
      style={{
        backgroundColor: isActive ? tag.color : "transparent",
      }}
    >
      {tag.name}
      {size === "md" && (
        <span
          className={twJoin(
            "relative -right-2 h-3 w-3 rounded-full border-2 border-neutral-300 bg-white",
          )}
          style={{
            backgroundColor: isActive ? undefined : tag.color,
          }}
        />
      )}
    </span>
  );
}

const sizeStyles: Record<TagLabelSize, ClassNameValue> = {
  md: "px-4 py-1.5 text-sm",
  sm: "px-3 py-1 text-xs",
  tiny: "px-2 py-0.5 text-xs",
};
