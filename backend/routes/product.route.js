import express from "express";
import mongoose, { get } from "mongoose";
import Product from "../models/Product.js";
import { deleteProducts } from "../controllers/product.controller.js";
import { getProducts, createProducts, updateProducts } from "../controllers/product.controller.js";
const router = express.Router();


router.get("/",getProducts);


router.post("/",createProducts);

const PORT = process.env.PORT || 5000;



router.delete("/:id",deleteProducts);


router.put("/:id",updateProducts);
export default router;