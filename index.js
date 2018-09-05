/**
 * Created by Joshua Baert on 1/11/2017.
 */
const express = require('express');
const mailer = require('nodemailer');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const config = require('./config');

const knownIps = [];


let transporter = mailer.createTransport(config.smtpStr);


const app = express();



app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

app.get('/visit', function (req, res, next) {
    let ipFull = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let ip = ipFull.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/);
    if (knownIps.indexOf(ipFull) < 0) {
        knownIps.push(ipFull);
        axios.get(`http://ip-api.com/json/${ip}`)
            .then(function (ipTestResponse) {
                let email = {
                    from: 'visitors@baert.io',
                    to: 'developer@baert.io',
                    subject: `Visitor from ${ipTestResponse.data.city} ip: ${ip}`,
                    text: `you have a portfolio Visitor at ip: ${ip} with the info of
${JSON.stringify(ipTestResponse.data, null, '  ')}`,
                };
                transporter.sendMail(email, (err, results) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.sendStatus(200);
                    }

                });
            });
    }

});

app.post('/mail', function (req, res, next) {
    let body = req.body;
    let email = {
        from: 'portfolio@baert.io',
        to: 'developer@baert.io',
        subject: 'Contact request from Portfolio',
        text: `You've receive a contact request from ${body.name} 
email : ${body.email}
phone : ${body.phone}
Message : ${body.message}
`,
    };
    transporter.sendMail(email, (err, results) => {
        if (err) {
            console.log(err);
            res.sendStatus(400);
        } else {
            console.log(results);
            res.sendStatus(200);
        }
    });
});


app.listen(config.port, () => {
    console.log('listening on port ' + config.port);
});
