import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

import { Footer } from "./components/Footer";

import { Header } from "./components/Header";
import { getSession } from "./sessions.server";


export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const isLoggedIn = Boolean(session.get("accessToken"));
  // check for token expiration
  return { isLoggedIn };
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen grid grid-rows-[auto_1fr_auto]">
        <Header />
        {children}
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let status = 500;
  let message = "Something went wrong.";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    status = error.status;
    message =
      error.status === 403
        ? "Access denied."
        : error.status === 404
          ? "Not found."
          : "Something went wrong.";
    details =
      error.status === 403
        ? "You don't have clearance for this."
        : error.status === 404
          ? "There's no record of that page."
          : error.statusText || details;
  } else if (import.meta.env.DEV && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="flex items-center justify-center">
      <div className="w-full max-w-sm text-center">
        <div className="size-36 mb-10 mx-auto relative">
          <div className="absolute inset-0 -rotate-6 rounded-full border-[3px] border-[#8a2e2a]/80" />
          <div className="absolute inset-0 -rotate-6 flex flex-col items-center justify-center">
            <span className="text-5xl font-semibold text-[#8a2e2a]">
              {status}
            </span>
          </div>
        </div>

        <h1 className="text-2xl font-medium">
          {message}
        </h1>
        <p className="max-w-xs mx-auto mt-4 text-slate-400 leading-relaxed">
          {details}
        </p>

        {stack && (
          <pre className="max-h-64 mt-8 p-4 overflow-auto rounded-sm border border-[#9c9177]/20 text-left text-xs">
            <code>{stack}</code>
          </pre>
        )}
      </div>
    </main>
  );
}
