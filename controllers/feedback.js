const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.emailFeedback = (req, res)=>{
    // console.log(req.body);
    const {name, email, message, companyName}= req.body;
    const emailData = {
        to: process.env.EMAIL_TO,
        from: email,
        subject: "New Client Inquiry",
        html: `
            <h1>New Client Inquiry</h1>
            <hr />
            <h2>Sender Name: ${name}</h2>
            <h2>Sender Email: ${email}</h2>
            <h2>Sender Company Name: ${companyName}</h2>
            <br />
            <hr />
            <p>https://koastal-technology.com</p>
        `
    };
    sgMail.send(emailData)
    .then(sent=> {
        console.log(sent)
        return res.json({
            success: true
        })
    })
    .catch(err => {
        console.log(err);
        return res.json({
            success: false
        });
    });
};