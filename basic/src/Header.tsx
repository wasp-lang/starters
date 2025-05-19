import { logout, useAuth } from "wasp/client/auth";
import { Link } from "wasp/client/router";

export function Header() {
  const { data: user } = useAuth();

  return (
    <header className="bg-black text-white flex justify-center shadow-wasp-yellow">
      <div className="px-12 p-4 flex justify-between items-center max-w-screen-lg w-full">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-10 w-10" />
          <h1 className="text-2xl font-semibold">Todo App</h1>
        </Link>
        <nav>
          <ul className="flex gap-x-6 font-semibold">
            {user ? (
              <>
                <li>
                  <button onClick={logout}>Log out</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/signup">Sign up</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
