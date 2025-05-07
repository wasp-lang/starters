import { Outlet } from "react-router-dom";
import "./App.css";
import { Header } from "./Header";

export function App() {
  return (
    <main className="bg-gray-100 min-h-screen h-full w-full flex flex-col">
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
    </main>
  );
}
