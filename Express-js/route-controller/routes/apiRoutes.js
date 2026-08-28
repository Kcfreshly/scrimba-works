import express from "express";
import { productsController } from "../controllers/productsController.js";
import { servicesController } from "../controllers/servicesController.js";

export const appRouter = express.Router();

appRouter.get("/products", productsController)
appRouter.get("/services", servicesController)