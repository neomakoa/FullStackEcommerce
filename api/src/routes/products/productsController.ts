import { Request, Response } from "express";

import db from "../../db";
import { productsTable } from "../../db/productsSchema";
import { eq } from "drizzle-orm";

export async function listProducts(req: Request, res: Response) {
  try {
    const products = await db.select().from(productsTable);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch products" });
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const [product] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, id));

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch product" });
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    const { name, description, image, price } = req.body;
    const [product] = await db
      .insert(productsTable)
      .values({
        name: name,
        description: description,
        image: image,
        price: price,
      })
      .returning();
    res.status(201).send(product);
  } catch (error) {
    res.status(500).send({ message: "Failed to create product" });
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const { name, description, image, price } = req.body;
    const [product] = await db
      .update(productsTable)
      .set({
        name: name,
        description: description,
        image: image,
        price: price,
      })
      .where(eq(productsTable.id, id))
      .returning();
    if (!product) {
      res.status(404).send({ message: "Product not found" });
    } else {
      res.status(200).send(product);
    }
  } catch (error) {
    res.status(500).send({ message: "Failed to update product" });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    const [deletedProduct] = await db
      .delete(productsTable)
      .where(eq(productsTable.id, id))
      .returning();

    if (deletedProduct) {
      res.status(204).send({ message: "Product deleted successfully" });
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Failed to delete product" });
  }
}
