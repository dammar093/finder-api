import multer from "multer";
import path from "path";
import { Request } from "express";

export const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  }),
  fileFilter: (req: Request, file: Express.Multer.File, cb: any) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      return cb(new Error("Only images are allowed"));
    }
    cb(null, true);
  },
});
