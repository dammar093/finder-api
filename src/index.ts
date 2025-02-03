import app from "./app";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import userRouter from "./routes/user.routes"
import categoryRouter from "./routes/category.routes";
import propertyRouter from "./routes/property.routes";
import homerRouter from "./routes/home.routes"
import cors from "cors";
import connectDb from "./config/db";
import swaggerDocs from "./utils/swagger";

dotenv.config();
const PORT = process.env.PORT || 8080;
app.use(cors({
  origin: "*"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

connectDb().then(() => {
  app.use("/healthcheck", homerRouter)
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/categories", categoryRouter);
  app.use("/api/v1/properties", propertyRouter);
  app.listen(PORT, () => {
    console.log(`Sever running on port::${PORT}`);
  });
  swaggerDocs(app)
}).catch(() => {
  console.log("Failed to conenct db")
})
