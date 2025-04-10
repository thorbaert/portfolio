import express from 'express';
import { transporter } from '../lib/mailer.js';

const router = express.Router();
const knownIps = [];

/* GET users listing. */
router.put('/', async (req, res, next) => {
    console.log('got a visit');
    let ipFull = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let [ip] = ipFull.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/);
    console.log(ip);
    if (knownIps.indexOf(ipFull) < 0) {
        knownIps.push(ipFull);
        let ipRes = await (await fetch(`http://ip-api.com/json/${ip}`)).json();
        console.log(ipRes);
        let text = `
You have a portfolio Visitor at ip: ${ip} with the info of

${JSON.stringify(ipRes, null, '  ')}\n`;
        let emailProps = {
            from: 'visitors@baert.io',
            to: 'developer@baert.io',
            subject: `Visitor from ${ipRes.city} ip: ${ip}`,
            text,
        };
        transporter.sendMail(emailProps, (err) => {
            if (err) {
                console.error(err)
                res.sendStatus(400);
            } else res.sendStatus(200);
        });
    } else {
        return res.sendStatus(200)
    }
});

export default router;
