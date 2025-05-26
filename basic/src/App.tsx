import { Outlet } from "react-router-dom";
import "./App.css";
import { Header } from "./Header";

export function App() {
  return (
    <main className="flex min-h-screen w-full flex-col bg-neutral-300 text-black">
      <Header />
      <Outlet />
    </main>
  );
}
