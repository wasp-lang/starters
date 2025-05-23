import { type AuthUser } from "wasp/auth";
import { TagsSection } from "../tags/components/TagsSection";
import { TasksSection } from "./components/TasksSection";

export const TaskDashboardPage = ({ user }: { user: AuthUser }) => {
  return (
    <section className="flex flex-col items-center gap-12 p-12 py-24">
      <h1 className="text-4xl font-bold">{`${user.username}'s tasks 📋`}</h1>
      <div className="flex w-full flex-wrap items-start justify-center gap-8">
        <TagsSection />
        <TasksSection />
      </div>
    </section>
  );
};
