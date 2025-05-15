import { Outlet } from "react-router-dom";
import "./App.css";
import { Header } from "./Header";

export function App() {
  return (
    <main className="bg-black text-white min-h-screen w-full flex flex-col">
      <Header />
      <Outlet />
    </main>
  );
}
