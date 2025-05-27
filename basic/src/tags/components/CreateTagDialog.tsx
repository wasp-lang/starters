import React from "react";
import { Button } from "../../common/Button";
import { Dialog } from "../../common/Dialog";
import { CreateTagForm } from "./CreateTagForm";

export function CreateTagDialog() {
  const [tagDialogOpen, setTagDialogOpen] = React.useState(false);

  if (!tagDialogOpen) {
    return (
      <Button
        type="button"
        size="sm"
        className="p-0"
        onClick={() => setTagDialogOpen(true)}
      >
        <span>Add a Tag</span>
        <span>+</span>
      </Button>
    );
  }

  return (
    <Dialog open={tagDialogOpen} onClose={() => setTagDialogOpen(false)}>
      <section className="card relative flex w-full max-w-sm flex-col gap-6">
        <button
          type="button"
          onClick={() => setTagDialogOpen(false)}
          className="absolute right-3 top-3 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="black"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </button>
        <h2 className="text-xl font-semibold">Create a new tag:</h2>
        <CreateTagForm onTagCreated={() => setTagDialogOpen(false)} />
      </section>
    </Dialog>
  );
}
