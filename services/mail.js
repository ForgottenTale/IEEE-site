const nodemailer = require("nodemailer");

let transporterData;
if(process.env.NODE_ENV == "development"){
    transporterData = {
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
    transporterData = {
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
    sendNeedsApproval: function(input){
        return new Promise(async(resolve, reject)=>{
            let transporter = nodemailer.createTransport(transporterData);
            
            for(let idx in input.emailIds){
                let info = await transporter.sendMail({
                    from: '<' + transporterData.auth.user + '>',
                    to: input.emailIds[idx],
                    subject: "An appointment needs your approval",
                    html: "<span>An" + input.type + " needs your approval </span>"
                })
                .catch(err=>reject(err))   
                console.log("Message sent: %s", info.messageId);
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            }
            resolve("message send");
        })
    },

    sendResponses: function(input){
        return new Promise(async(resolve, reject)=>{
            let transporter = nodemailer.createTransport(transporterData);
            
            for(let idx in input.emailIds){
                let info = await transporter.sendMail({
                    from: '<' + transporterData.auth.user + '>',
                    to: input.emailIds[idx],
                    subject: "An appointment needs your approval",
                    html: "<span>An" + input.type + " needs your approval </span>"
                })
                .catch(err=>reject(err))   
                console.log("Message sent: %s", info.messageId);
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            }
            resolve(rand);
        })
    },

    sendFinal: function(input){
        return new Promise(async(resolve, reject)=>{
            let transporter = nodemailer.createTransport(transporterData);
            
            for(let idx in input.emailIds){
                let info = await transporter.sendMail({
                    from: '<' + transporterData.auth.user + '>',
                    to: input.emailIds(idx),
                    subject: "An appointment needs your approval",
                    html: "<span>An" + input.type + " needs your approval </span>"
                })
                .catch(err=>reject(err))   
                console.log("Message sent: %s", info.messageId);
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            }
            resolve(rand);
        })
    }
}