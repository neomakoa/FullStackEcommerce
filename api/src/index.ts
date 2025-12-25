import express from "express";

import productsRoutes from "./routes/products";

const port = process.env.PORT || 3000;
const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/products", productsRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
