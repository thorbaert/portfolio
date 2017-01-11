/**
 * Created by Joshua Baert on 1/11/2017.
 */
const express = require('express');
const mailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./config');


let transporter = mailer.createTransport(config.smtpStr);


const app = express();


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());


app.post('/mail', function (req, res, next) {
	console.log(req.body);
	let body = req.body;
	let email = {
		from: 'portfolio@baert.io',
		to: 'developer@baert.io',
		subject: 'contact from your portfolio',
		text: `You've receive a contact request from ${body.name} 
email : ${body.email}
phone : ${body.phone}
Message : ${body.message}
`,
	};
	transporter.sendMail(email, (err, results) => {
		if (err) {
			console.log(err);
			res.sendStatus(400)
		}	else {
			console.log(results);
			res.sendStatus(200)
		}
	})
});


app.listen(config.port, () => {
	console.log('listening on port ' + config.port)
});