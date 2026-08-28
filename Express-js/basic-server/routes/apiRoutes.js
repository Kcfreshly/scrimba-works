import express from "express";
import { getAllData } from "../controllers/getAllData.js";
import { getDataByParams } from "../controllers/getDataByParams.js";

export const apiRouter = express.Router();
apiRouter.get("/", getDataByParams);
apiRouter.get("/:field/:value", getAllData);

