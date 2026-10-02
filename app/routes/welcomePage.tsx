import { redirect } from "react-router";
import { getSession } from "~/sessions.server";
import type { Route } from "./+types/welcomePage";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const accessToken = session.get("accessToken");

  if (!accessToken) {
    throw redirect("/login");
  }

  return {
    subject: session.get("subject"),
    roles: session.get("roles") ?? [],
  };
}

export default function WelcomePage({ loaderData }: Route.ComponentProps) {
  const { subject, roles } = loaderData;

  return (
    <main className="flex items-center justify-center px-4 py-12">
      <section className="w-full max-w-2xl rounded-lg border border-slate-300 p-8 shadow-sm dark:border-slate-700">
        <h1 className="text-3xl font-bold">Welcome, {subject}</h1>
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          You are logged in to BlackMarqet.
        </p>

        <div className="mt-8">
          <h2 className="text-xl font-semibold">Your roles</h2>
          {roles.length > 0 ? (
            <ul className="mt-3 flex flex-wrap gap-2">
              {roles.map((role) => (
                <li
                  className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-950 dark:text-blue-200"
                  key={role}
                >
                  {role}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              No roles are assigned to this account.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
