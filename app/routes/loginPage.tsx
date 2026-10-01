import { useState } from "react";
import { useNavigate } from "react-router";
import { login } from "~/service/authService";

import { redirect } from "react-router";
import { getSession, commitSession } from "~/sessions.server";
import type { Route } from "./+types/loginPage";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  const accessToken = session.get("accessToken");
  const roles = session.get("roles");

  if (accessToken) {
    throw redirect("/");
  }

  return { roles };
}

export async function action({ request }: Route.ActionArgs) {
    console.log("Action körs")
  const session = await getSession(request.headers.get("Cookie"));

  const formData = await request.formData();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const tokenResponse = await login({ username, password });

  if (!tokenResponse) {
    return { error: "Wrong username or password." };
  }

  session.set("accessToken", tokenResponse.accessToken);
  session.set("expiresIn", tokenResponse.expiresIn);
  session.set("subject", tokenResponse.subject);
  session.set("roles", tokenResponse.roles);

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function LoginPage() {
  //   const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  //   const handleSubmit = async (event: { preventDefault: () => void }) => {
  //     event.preventDefault();
  //     try {
  //       await login({ username, password });

  //       navigate("/");
  //     } catch (error) {
  //       console.log("Couldn't navigate");
  //     }
  //   };

  return (
    <main>
      <h3>Login</h3>
      <form method="POST">
        <input
          type="email"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </main>
  );
}
