import { useState } from "react";
import { Form, useNavigation } from "react-router";
import { login } from "~/service/authService";

import { redirect } from "react-router";
import { getSession, commitSession } from "~/sessions.server";
import type { Route } from "./+types/loginPage";

export async function loader({ request }: Route.LoaderArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const accessToken = session.get("accessToken");

	// check for token expiration

	if (accessToken) {
		throw redirect("/welcome");
	}

	return null;
}

export function meta() {
	return [
		{ title: "Login - Blackmarqet" }
	];
}

export async function action({ request }: Route.ActionArgs) {
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

	return redirect("/welcome", {
		headers: {
			"Set-Cookie": await commitSession(session),
		},
	});
}

export default function LoginPage({ actionData }: Route.ComponentProps) {
	const error = actionData?.error;
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";

	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	return (
		<main className="flex items-center justify-center overflow-hidden">
			<div className="w-full max-w-sm">
				<p className="text-center text-xs tracking-[0.25em] text-slate-400">BLACKMARQET</p>
				<h1 className="mt-3 text-center text-2xl font-medium">State your business</h1>

				{error ? (
					<div className="w-fit mx-auto mt-6 px-4 py-2 rounded-md border-2 border-red-900 bg-red-300/30">
						<p className="text-center text-xs font-medium text-red-400">ACCESS DENIED</p>
						<p className="mt-1 text-center text-sm text-red-200">{error}</p>
					</div>
				) : null}

				<Form method="POST" className="mt-10 space-y-6">
					<div>
						<label htmlFor="username" className="block text-sm">Username</label>
						<input
							id="username" type="email" name="username" value={username} onChange={(e) => setUsername(e.target.value)}
							className="w-full mt-2 px-4 py-2 rounded-md border border-slate-500 bg-transparent outline-none"
						/>
					</div>

					<div>
						<label htmlFor="password" className="block text-sm">Password</label>
						<input
							id="password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}
							className="w-full mt-2 px-4 py-2 rounded-md border border-slate-500 bg-transparent outline-none"
						/>
					</div>

					<button
						type="submit" disabled={isSubmitting}
						className="w-full mt-4 px-6 py-3 rounded-sm border-2 border-slate-600 text-sm text-slate-300 font-medium transition-colors hover:bg-slate-800 hover:text-slate-100 hover:cursor-pointer disabled:opacity-50"
					>
						{isSubmitting ? "Logging in..." : "Login"}
					</button>
				</Form>
			</div>
		</main>
	);
}