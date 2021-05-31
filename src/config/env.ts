import * as dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET;
export const DBURL = process.env.DBURL;
export const EMAIL = process.env.EMAIL;
export const PASSWORD = process.env.PASSWORD;
