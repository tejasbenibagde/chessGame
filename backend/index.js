import express from "express";

const app = express();

const PORT = process.env.PORT || 7777;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello World")
});

app.listen(PORT, () => {
  console.log(`Server started at port: http://localhost:${PORT}`);
});
