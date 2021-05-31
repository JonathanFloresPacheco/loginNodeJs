import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import * as fs from 'fs';
import { EMAIL, PASSWORD, JWT_SECRET } from "../config/env";
var path = require('path');
const registerMail = async (params: any) => {
    const transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: EMAIL,
            pass: PASSWORD,
        },
    });
    const optionsObj = {
        from: `Hello <${EMAIL}>`,
        to: params.email,
        subject: params.subject,
        layout: "main",
        template: params.template,
        context: {
            // header: process.env.STATIC_HEADER,
            ...params.context,
        },
    };
    const getHandleBarsOptions = {
        viewEngine: {
            extName: ".hbs",
            layoutsDir: "views/layouts",
            partialsDir: "views/partials",
            defaultLayout: "main.hbs",
        },
        viewPath: "views/",
        extName: ".hbs",
    }
    transport.use("compile", hbs(getHandleBarsOptions));
    const status = await transport.sendMail(optionsObj);
    return status;
};
export default registerMail;
