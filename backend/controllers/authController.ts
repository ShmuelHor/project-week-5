import e, { Request, Response, NextFunction } from "express";
import { User } from '../models/types.js';
import { v4 as uuidv4 } from 'uuid';
import { writeUserToJsonFile, readFromJsonFile } from "../DAL/jsonUser.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET: string = process.env.JWT_SECRET || "your_jwt_secret";

export const register = (req: Request, res: Response) => {
    try {
        const user: User = req.body;
        user.id = uuidv4();
        user.password = bcrypt.hashSync(user.password, 10);
        writeUserToJsonFile(user);
        res.send(user);
    } catch (e: any) {
        res.status(500).send({ message: e.message });
    }
}

export const login = async (req: Request, res: Response, next: NextFunction): Promise<User | null> => {
    try {
        const user: User = req.body;
        const users: User[] = await readFromJsonFile();
        const userFind: User | undefined = users.find((u) => u.userName === user.userName);
        
        if (userFind && userFind.password == user.password) {
            // bcrypt.compareSync(user.password, userFind.password)
            const token = jwt.sign({ id: userFind.id, username: userFind.userName }, JWT_SECRET, { expiresIn: '1h' });
            res.cookie('token', token, {
                httpOnly: true, 
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3600000, 
                sameSite: 'strict',
              });
              res.send(token);
              return userFind;
        } else {
            throw new Error("Password incorrect");
        }
    } catch (e: any) {
        next(e);
        return null;
    }
}




