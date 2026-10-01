import { createCookieSessionStorage } from "react-router";

type SessionData = {
  accessToken: string;
  expiresIn: number;
  subject: string;
  roles: string[];
};

type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: "__session",
      httpOnly: true,
      maxAge: 3600,
      path: "/",
      sameSite: "lax",
      secrets: [process.env.SESSION_SECRET || "s3cret1"],
      secure: true,
    },
  });

export { getSession, commitSession, destroySession };