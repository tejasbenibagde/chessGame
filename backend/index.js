import express from "express";
import path from "path";
import { fileURLToPath } from "url"; // Import fileURLToPath
import gameRoutes from "./routes/gameRoutes.js";
import requestHandler from "./middlewares/requestHandler.js";

const __filename = fileURLToPath(import.meta.url); // Convert URL to file path
const __dirname = path.dirname(__filename); // Get the directory name

const app = express();
const port = 5001;

// Set EJS as the view engine
app.set("view engine", "ejs");

// Set the views directory
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(requestHandler);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", gameRoutes);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
