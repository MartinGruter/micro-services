import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { login } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const loginResponse = await login({ username, password });

      sessionStorage.setItem("accessToken", loginResponse.accessToken);
      sessionStorage.setItem("expiresIn", String(loginResponse.expiresIn));
      sessionStorage.setItem("subject", loginResponse.subject);
      sessionStorage.setItem("roles", JSON.stringify(loginResponse.roles));

      navigate("/welcome");
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex items-center justify-center px-4 py-12">
      <section className="w-full max-w-md rounded-lg border border-slate-300 p-8 shadow-sm dark:border-slate-700">
        <h1 className="mb-6 text-3xl font-bold">Log in</h1>

        <form className="space-y-5" aria-busy={isLoading} onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block font-medium" htmlFor="username">
              Username
            </label>
            <input
              className="w-full rounded-md border border-slate-400 bg-transparent px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:border-slate-600"
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              disabled={isLoading}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium" htmlFor="password">
              Password
            </label>
            <input
              className="w-full rounded-md border border-slate-400 bg-transparent px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:border-slate-600"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              disabled={isLoading}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          {error && (
            <p
              className="rounded-md bg-red-100 px-3 py-2 text-sm text-red-800 dark:bg-red-950 dark:text-red-200"
              role="alert"
            >
              {error}
            </p>
          )}

          <button
            className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:focus:ring-offset-gray-950"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log in"}
          </button>
        </form>
      </section>
    </main>
  );
}
