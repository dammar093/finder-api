import app from "./app";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import userRouter from "./routes/user.routes"
import categoryRouter from "./routes/category.routes";
import propertyRouter from "./routes/property.routes";
import cors from "cors";
import connectDb from "./config/db";

dotenv.config();
const PORT = process.env.PORT || 8080;
app.use(cors({
  origin: "*"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

connectDb().then(() => {
  app.use("/", (req: Request, res: Response) => {
    res.send("Welcome to PropertyPro-lite API")
  });
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/categories", categoryRouter);
  app.use("/api/v1/properties", propertyRouter);
  app.listen(PORT, () => {
    console.log(`Sever running on port::${PORT}`);
  });
}).catch(() => {
  console.log("Failed to conenct db")
})
