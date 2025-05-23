import React from "react";
import { Tag } from "wasp/entities";
import { cx } from "../../common/tailwind";

interface TagLabelProps {
  tag: Tag;
  isActive: boolean;
  onClick?: (tag: Tag) => void;
  size?: "normal" | "small";
  as?: React.ElementType;
}

export function TagLabel({
  tag,
  isActive,
  onClick,
  size = "normal",
  as = "div",
}: TagLabelProps) {
  const TagLabelBase = React.createElement(
    as,
    {
      key: tag.id,
      className: cx(
        "rounded-full border font-mono font-medium transition-all",
        onClick && "cursor-pointer",
        size === "normal" && "px-4 py-1.5 text-sm",
        size === "small" && "px-3 py-1 text-xs",
      ),
      onClick: () => onClick?.(tag),
      style: isActive
        ? {
            backgroundColor: tag.color,
            borderColor: "black",
            color: "black",
          }
        : {
            backgroundColor: `hsl(from ${tag.color} h s l / 0.25)`,
            borderColor: tag.color,
            color: "black",
          },
    },
    tag.name,
  );

  return TagLabelBase;
}
