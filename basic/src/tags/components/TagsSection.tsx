import { CreateTagForm } from "./CreateTagForm";

export function TagsSection() {
  return (
    <section className="card flex basis-1/5 flex-col gap-6">
      <h2 className="text-xl font-semibold">Create a new tag:</h2>
      <CreateTagForm />
    </section>
  );
}
