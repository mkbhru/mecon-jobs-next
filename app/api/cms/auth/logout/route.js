export default function handler(req, res) {
  if (req.method === "POST") {
    // Clear authentication cookies or session
    res.setHeader("Set-Cookie", "auth_token=; Path=/; Max-Age=0");

    return res.status(200).json({ message: "Logged out" });
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
