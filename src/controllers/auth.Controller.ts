import dotenv from 'dotenv'
dotenv.config();
import "reflect-metadata";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import sharp from 'sharp';
import { Request, Response, NextFunction } from 'express';
import { Auth } from "../entity/autentication/auth.entity"
import { AppDataSource } from "../data-source"

//sign-in
export const sign_in = async (req:Request, res:Response, next:NextFunction) => {
    const authRepository = AppDataSource.getRepository(Auth)

    //check if user exits
    let foundAuth = await authRepository.findOne({
        where: {
            phoneNumber:req.body.phoneNumber
        }
    })
    if(!foundAuth)
        res.status(404).json({
        message:"Sorry, the entered credential doesn't exist"
        })
    
    //check if password is correct
    const isPasswordCorrect = await bcrypt.compare(req.body.password, foundAuth.password) 
    if (!isPasswordCorrect)
        
        res.status(404).json({
            message: "The phone number or password is not correct"
        })
    let token = jwt.sign({
        id: foundAuth.id,
        role: foundAuth.role
    }, process.env.JWT_KEY)
    let { password, ...otherCredentials } = foundAuth
    res.status(200).json({
        userData: otherCredentials,
        access_token:token
    })
}

const multerStorage = multer.memoryStorage();

const multerFilter = (req:Request, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    }
    else {
        cb((res:Response ) => {
            res.status(400).json({
                "message": "Not an image!"
            })
        }),false
    }
}
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});
export const uploadUserPhoto = upload.fields([
    { name: 'tradeLiscence', maxCount: 1 },
    { name: 'kebeleID', maxCount: 1 },
    { name: 'profilePicture', maxCount: 1 },
    // { name: 'images', maxCount: 3 }
]);

export const resizeUserPhoto = async (req, res, next) => {
    if (!req.files.tradeLiscence || !req.files.kebeleID || !req.files.profilePicture) return next();
    //Trade liscence photo
    req.body.tradeLiscence = `user-${Date.now()}.jpeg`  
    await sharp(req.files.tradeLiscence[0].buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })        
        .toFile(`D:/Final-Project/src/images/trade_liscences/${req.body.tradeLiscence}`);
    // //Kebele ID photo
    req.body.kebeleID = `user-${Date.now()}.jpeg`  
    await sharp(req.files.kebeleID[0].buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })        
        .toFile(`D:/Final-Project/src/images/kebele_id/${req.body.kebeleID}`);
    //Profile Picture
    req.body.profilePicture = `user-${Date.now()}.jpeg`  
    await sharp(req.files.profilePicture[0].buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })        
        .toFile(`D:/Final-Project/src/images/profile_pictures/${req.body.profilePicture}`);
   
    //     //images
    // req.body.images = [];
    // await Promise.all(
    //     req.files.images.map(async (file, i) => {
    //         const filename = `images-${Date.now()}-${i + 1}.jpeg`;
    //         await sharp(file.buffer)
    //             .resize(500, 500)
    //             .toFormat('jpeg')
    //             .jpeg({ quality: 90 })
    //             .toFile(`C:/Users/Dagim Kennedy/Testing-Functionalities/src/Images/Users/${filename}`);
    //         req.body.images.push(filename);
    //     })
    // );
     
    next();
};

//sign-up
export const sign_up = async (req:Request, res:Response, next:NextFunction) => {
    const authRepository = AppDataSource.getRepository(Auth)
   
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)

    let auth = new Auth()
    auth.firstName = req.body.firstName    
    auth.middleName = req.body.middleName   
    auth.lastName = req.body.lastName
    auth.email = req.body.email         
    auth.tradeLiscenceNumber = req.body.tradeLiscenceNumber
    auth.tradeLiscence = req.body.tradeLiscence
    auth.kebeleID = req.body.kebeleID
    auth.profilePicture = req.body.profilePicture
    auth.role = req.body.role
    auth.phoneNumber = req.body.phoneNumber  
    auth.password = hash
    await authRepository.save(auth)
    res.status(200).json({
        message:"Your entered information is being reviewed."
    })
    
}