import dotenv from 'dotenv'
dotenv.config();
import "reflect-metadata";
import { Auth, Role } from "../../entity/autentication/auth.entity";
import { Request,Response,NextFunction } from "express";
import { AppDataSource } from "../../data-source"
const authRepository = AppDataSource.getRepository(Auth);


export const getUser = async (req:Request, res:Response) => {
   
    const user = await authRepository.findOne({
        where: {
            role: Role.Retailer
        }
    })
    res.status(200).json({
        status: 'Success',        
        data: {
            user
        },
    });
};