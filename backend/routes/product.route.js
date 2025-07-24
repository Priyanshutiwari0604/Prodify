import express from "express";
import mongoose, { get } from "mongoose";
import Product from "../models/Product.js";
import { deleteProducts } from "../controllers/product.controller.js";
import { getProducts, createProducts, updateProducts } from "../controllers/product.controller.js";
const router = express.Router();


router.get("/",getProducts);
// Test route
router.get("/", (req, res) => {
    res.json({ message: "Server is running!" });
});

router.post("/",createProducts);

const PORT = process.env.PORT || 5000;



router.delete("/:id",deleteProducts);


router.put("/:id",updateProducts);
export default router;