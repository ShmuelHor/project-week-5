var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { v4 as uuidv4 } from 'uuid';
import { writeUserToJsonFile, readFromJsonFile } from "../DAL/jsonUser.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
export const register = (req, res) => {
    try {
        const user = req.body;
        user.id = uuidv4();
        user.password = bcrypt.hashSync(user.password, 10);
        writeUserToJsonFile(user);
        res.send(user);
    }
    catch (e) {
        res.status(500).send({ message: e.message });
    }
};
export const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const users = yield readFromJsonFile();
        const userFind = users.find((u) => u.userName === user.userName);
        if (userFind && bcrypt.compareSync(user.password, userFind.password)) {
            if (bcrypt.compareSync(user.password, userFind.password)) {
                const token = jwt.sign({ id: userFind.id, username: userFind.userName }, JWT_SECRET, { expiresIn: '1h' });
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 3600000,
                    sameSite: 'strict',
                });
                res.send(token);
            }
            else {
                throw new Error("Password incorrect");
            }
        }
        else {
            throw new Error("user not found");
        }
    }
    catch (e) {
        next(e);
        return null;
    }
});
export const getAllGamesOfUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const users = yield readFromJsonFile();
        const userFind = users.find((u) => u.userName === user.userName);
        if (userFind) {
            const games = userFind.games;
            if (!games) {
                throw new Error("No games found");
            }
            res.send(games);
        }
    }
    catch (e) {
        res.status(500).send({ message: e });
    }
});
