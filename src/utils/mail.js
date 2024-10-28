import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'flapberrywhistle@gmail.com',
		pass: 'gqmm lpbh gulu dqdn'
	}
});

const handlebarOptions = {
  viewEngine: {
    extName: '.html',
    partialsDir: path.resolve('./src/views/'),
    defaultLayout: false
  },
  viewPath: path.resolve('./src/views/'),
  extName: '.handlebars'
}

transporter.use('compile', hbs(handlebarOptions));

export async function dynamicMail(email, customer, product, mail, phone, date, quantity, message) {
  const mailOptions = {
    from: 'flapberrywhistle@gmail.com',
    to: email,
    subject: 'Edible Cups - Product Enquiry',
    template: 'email',
    context: {
      customer, product, mail, phone, date, quantity, message
    },
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('email sent:', email);
  } catch (error) {
    console.error('Error sending email:', error);
    console.log(error);
    res.json('Failed to send verification email');
  }
}

export async function contactMail(email, customer, mail, phone, date, message) {
  const mailOptions = {
    from: 'flapberrywhistle@gmail.com',
    to: email,
    subject: 'Edible Cups - Contact Us Enquiry',
    template: 'contact',
    context: {
      customer, mail, phone, date, message
    },
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('email sent:', email);
  } catch (error) {
    console.error('Error sending email:', error);
    console.log(error);
    res.json('Failed to send verification email');
  }
}

export async function sendVerificationEmail(email, verificationToken, admin = false) {
  let link = `<p>Hello,</p><p>Please click <a href="http://localhost:3000/register/${verificationToken}">here</a> to verify your email.</p>`;
  
  if (admin === true) {
    link = `<p>Hello,</p><p>Please click <a href="http://localhost:3000/admin/register/${verificationToken}">here</a> to verify your email.</p>`;
  }

  const mailOptions = {
    from: 'flapberrywhistlel@gmail.com',
    to: email,
    subject: 'Email Verification',
    html: link
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent:', email);
  } catch (error) {
    console.error('Error sending verification email:', error);
    console.log(error);


    res.json('Failed to send verification email');
  }
}

export async function sendMail(email) {
  let link = `<p>Hello,</p><p> From Edible Cups</p>`;

  const mailOptions = {
    from: 'flapberrywhistlel@gmail.com',
    to: email,
    subject: 'Email Verification',
    html: link
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Mail sent:', email);
  } catch (error) {
    console.error('Error sending Mail', error);
    console.log(error);
    res.json('Failed To Send Mail');
  }
}

export async function sendContactMail(email) {
  let link = `<p>Hello Contact,</p><p> From Edible Cups</p>`;

  const mailOptions = {
    from: 'flapberrywhistlel@gmail.com',
    to: email,
    subject: 'Email Verification',
    html: link
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Mail sent:', email);
  } catch (error) {
    console.error('Error sending Mail', error);
    console.log(error);
    res.json('Failed To Send Mail');
  }
}