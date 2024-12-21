import jwt from "jsonwebtoken";

export async function getSession(cookie) {
  if (!cookie) return null;

  const token = cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  if (!token) return null;

  try {
    const session = jwt.verify(token, process.env.JWT_SECRET);
    return session;
  } catch {
    return null;
  }
}
