import express from "express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

router.route("/").get(async (req, res) => {
  const title = "Your Page Title"; // Define your title here
  const viewsPath = path.join(__dirname, "../views/index");
  return await res.render(viewsPath, { title });
});

export default router;
