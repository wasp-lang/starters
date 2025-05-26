import { Tag } from "wasp/entities";
import { HttpError } from "wasp/server";
import { CreateTag } from "wasp/server/operations";

type CreateTagArgs = Pick<Tag, "name"> & Partial<Pick<Tag, "color">>;

export const createTag: CreateTag<CreateTagArgs, Tag> = (tag, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  return context.entities.Tag.create({
    data: {
      name: tag.name,
      color: tag.color || generateRandomBrightColor(),
      user: {
        connect: {
          id: context.user.id,
        },
      },
    },
  });
};

function generateRandomBrightColor() {
  const saturation = 100;
  const lightness = 65;
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
