import { Router } from "express";
import {
  listProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} from "./productsController";
import { validateData } from "../../middleware/validation";
import { createInsertSchema } from "drizzle-zod";
import { productsTable } from "../../db/productsSchema";

const productSchema = createInsertSchema(productsTable);

const router = Router();

router.get("/", listProducts);
router.get("/:id", getProductById);
router.post("/",validateData(productSchema), createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
