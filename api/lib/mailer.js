import mailer from 'nodemailer';

const transporter = mailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    secure: false, // true for 465, false for other ports
    auth: {
        user: config.smtpUser, // generated ethereal user
        pass: config.smtpPass, // generated ethereal password
    },
});

export default transporter