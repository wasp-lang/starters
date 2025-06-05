import React from "react";
import { Button } from "../../shared/components/Button";
import { PortalDialog } from "../../shared/components/Dialog";
import { CREATE_TAG_FORM_ID, CreateTagForm } from "./CreateTagForm";

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
    <PortalDialog open={tagDialogOpen} onClose={() => setTagDialogOpen(false)}>
      <section className="card relative flex w-full max-w-lg flex-col">
        <header className="px-6 pb-4 pt-8">
          <h2 className="text-xl font-semibold">Create a new tag</h2>
        </header>
        <div className="overflow-y-auto p-4 px-6">
          <CreateTagForm onTagCreated={() => setTagDialogOpen(false)} />
        </div>
        <footer className="flex justify-end gap-2 px-6 pb-8 pt-4">
          <Button form={CREATE_TAG_FORM_ID} type="submit">
            Create
          </Button>
          <Button
            form={CREATE_TAG_FORM_ID}
            type="button"
            onClick={() => setTagDialogOpen(false)}
            variant="danger"
          >
            Cancel
          </Button>
        </footer>
      </section>
    </PortalDialog>
  );
}
