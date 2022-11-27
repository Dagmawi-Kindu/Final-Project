import { AppDataSource } from "../data-source";
import { Auth } from "../entity/autentication/auth.entity";
import multer from 'multer';
import express from 'express';

import { verifyToken, verifyRetailer, verifySupplier, verifyAdmin } from "../middlewares/tokenValidation.middleware"
import { getUser } from "../controllers/retailer/retailerContoller";

const router = express.Router();

router.get('/login/get', verifyToken, verifyRetailer, getUser);
         
export {
    router as userRouter
}
