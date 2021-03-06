export default function Contact(req, res) {
  const nodemailer = require('nodemailer');

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
    secure: true
  });

  transporter.verify((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Ready to Send");
    }
  });

  const mailData = {
    from: req.body.email,
    to: process.env.GMAIL_USER,
    subject: `Message From ${req.body.name}`,
    html: `<div>${req.body.message}</div><p>Sent from: ${req.body.name}</p>`
  }

  transporter.sendMail(mailData, function(err, info) {
    if (err) {
      res.status(500).json({status: 'fail', err, mailData})
    } else {
      res.status(200).json({status: 'success', info});
    }
  })
}
