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
        <h2 className="text-xl font-semibold">Create a new tag:</h2>
        <CreateTagForm
          onTagCreated={() => setTagDialogOpen(false)}
          onCancel={() => setTagDialogOpen(false)}
        />
      </section>
    </Dialog>
  );
}
