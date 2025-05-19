import { CreateTagForm } from "./CreateTagForm";

export function TagsSection() {
  return (
    <section className="flex flex-col gap-6 rounded-xl bg-neutral-900 p-6 py-8 border border-wasp-yellow shadow-[0_0_50px_-20px] shadow-wasp-yellow basis-2/5">
      <h2 className="text-xl font-semibold">Create a new tag:</h2>
      <CreateTagForm />
    </section>
  );
}
