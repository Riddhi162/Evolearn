const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");

const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT || 587, // Default to 587 if MAIL_PORT is not set
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        const templatePath = path.resolve(__dirname, '../mail/templates', 'passwordUpdate.html');
        let htmlContent = fs.readFileSync(templatePath, 'utf8');
        htmlContent = htmlContent.replace('{{resetUrl}}', body);



        const verifyPath = path.resolve(__dirname, '../mail/templates', 'emailVerificationTemplate.html');

        let htmlContent2 = fs.readFileSync(verifyPath, 'utf8');
        htmlContent2 = htmlContent2.replace('{{resetUrl}}', body);
        let info = await transporter.sendMail({
            from: 'thakkarriddhi1610@gmail.com',
            to: email,
            subject: title,
            html: htmlContent2,
        });

        console.log(info);
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};

module.exports = mailSender;
