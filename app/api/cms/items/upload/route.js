import formidable from "formidable";
import fs from "fs";
import path from "path";

// Disable Next.js's default body parser to handle file uploads with formidable
export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  const form = new formidable.IncomingForm();

  // Set the upload directory to 'public/uploads'
  form.uploadDir = path.join(process.cwd(), "public", "uploads");
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: "Something went wrong" });
    }

    // Return the file details
    res.status(200).json({ fields, files });
  });
}
