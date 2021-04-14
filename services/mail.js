const nodemailer = require("nodemailer");

if(process.env.NODE_ENV == "development"){
    const transporterData = {
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: "alexandrea60@ethereal.email",
            pass: "TYyn4h39zEFzNZAKCk"
        },
        tls:{
            rejectUnauthorized:false
        }
    };    
}else if(process.env.NODE_ENV=="production"){
    const transporterData = {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        },
        tls:{
            rejectUnauthorized:false
        }
    };
}

module.exports= {
    sendOTP: function(emailID){
        return new Promise(async(resolve, reject)=>{
            var rand = Date.now() + "";
            rand = rand.split('').slice(rand.length-4, rand.length).join('');
            let transporter = nodemailer.createTransport(transporterData);
        
            let info = await transporter.sendMail({
                from: '<noreplyilluminati@example.com',
                to: emailID,
                subject: "Verification Email",
                html: "<span>OTP: <b>" + rand + "</b>",
            })
            .catch((err)=>console.error(err))
        
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            resolve(rand);
        })
    },

    sendResetLink: function (emailID){
        return new Promise(async(resolve, reject)=>{
            var rand = Date.now() + "";
            let transporter = nodemailer.createTransport(transporterData);
            var link = 'http://localhost:3000/reset-password/' + rand;
            let info = await transporter.sendMail({
                from: '<noreplyilluminati@example.com',
                to: emailID,
                subject: "Password Reset",
                html: "<span>Follow this link: <a href='" + link + "'>"+ link +"</a><span>",
            });
        
            console.log("Message sent: %s", info.messageId);        
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            resolve(rand);
        })
    }
}