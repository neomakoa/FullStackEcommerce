import { Request, Response } from "express";

export function listProducts(req: Request, res: Response) {
  res.send("product list");
}

export function getProductById(req: Request, res: Response) {
  console.log(req.params.id);
  res.send("product");
}

export function createProduct(req: Request, res: Response) {
  res.send("product created");
}

export function updateProduct(req: Request, res: Response) {
  res.send("product updated");
}

export function deleteProduct(req: Request, res: Response) {
  res.send("product deleted");
}
