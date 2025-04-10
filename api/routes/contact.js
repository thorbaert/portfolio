import express from 'express';
import { transporter } from '../lib/mailer.js';

const router = express.Router();

/* GET home page. */
router.post('/', (req, res) => {
    let { email, phone, message, name } = req.body;

    let text = `
You've receive a contact request from ${name} 
email : ${email}
phone : ${phone}
Message : ${message}
`;
    let emailProps = {
        from: 'portfolio@baert.io',
        to: 'developer@baert.io',
        subject: `Contact request from Portfolio from ${name}`,
        text,
    };
    transporter.sendMail(emailProps, (err) => {
        if (err) {
            console.error(err);
            res.sendStatus(400);
        } else res.sendStatus(200);
    });
});

export default router;
