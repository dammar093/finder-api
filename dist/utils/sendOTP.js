"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function sendOTP(email, otp, username, title) {
    return __awaiter(this, void 0, void 0, function* () {
        // Create a transporter object using SMTP transport
        let transporter = nodemailer_1.default.createTransport({
            service: 'gmail', // Use your email service
            auth: {
                user: process.env.GOOGLE_ID, // Your email
                pass: process.env.GOOGLE_MAIL_PASSWORD, // Your email password
            },
        });
        // Setup email data
        let mailOptions = {
            from: `${process.env.GOOGLE_ID}`, // Sender address
            to: email, // List of receivers
            subject: title, // Subject line
            html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forgot Password - Finder</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background-color: yellowgreen;
            color: #ffffff;
            text-align: center;
            padding: 20px;
            font-size: 24px;
        }
        .body {
            padding: 20px;
            color: #333333;
            line-height: 1.6;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            margin: 20px 0;
            color: yellowgreen;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #777777;
            padding: 20px;
        }
        a {
            color: yellowgreen;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            Forgot Your Password?
        </div>
        <div class="body">
            <p>Hi <strong>${username}</strong>,</p>
            <p>We received a request to reset your password for your Finder account. Use the One-Time Password (OTP) below to reset your password:</p>
            <div class="otp">
                ${otp}
            </div>
            <p>This OTP is valid for <strong>10 minutes</strong>. If you didn't request a password reset, please ignore this email. Your account remains secure.</p>
            <p><strong>Next Steps:</strong></p>
            <ol>
                <li>Open the Finder app or visit <a href="[Reset Password Link]">this link</a>.</li>
                <li>Enter the OTP to verify your identity.</li>
                <li>Follow the prompts to create a new password.</li>
            </ol>
            <p>If you have any questions, feel free to contact our support team at <a href="mailto:${process.env.GOOGLE_ID}">${process.env.GOOGLE_ID}</a>.</p>
            <p>Best regards,</p>
            <p>The Finder Team</p>
        </div>
        <div class="footer">
            &copy; ${new Date().getFullYear()} Finder. All rights reserved.
        </div>
    </div>
</body>
</html>
`, // HTML body
        };
        // Send mail with defined transport object
        try {
            let info = yield transporter.sendMail(mailOptions);
            console.log('Message sent: %s', info.messageId);
        }
        catch (error) {
            console.error('Error sending email: %s', error);
        }
    });
}
exports.default = sendOTP;
