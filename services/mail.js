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
                console.log("Mail sent to:", input.emailIds[idx]);
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
                    subject: input.user.name + input.encourages?" en":" dis" + "courages this",
                    html: "<span>This is "+input.encourages?"en":"dis" + "couraging because " + input.response + " </span>"
                })
                .catch(err=>reject(err));
                console.log("Email sent to: ", input.emailIds[idx]);
                console.log("Message sent: %s", info.messageId);
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            }
            resolve("Message Send");
        })
    },

    sendFinal: function(input){
        return new Promise(async(resolve, reject)=>{
            let transporter = nodemailer.createTransport(transporterData);
            
            for(let idx in input.emailIds){
                try{
                    let info = await transporter.sendMail({
                        from: '<' + transporterData.auth.user + '>',
                        to: input.emailIds[idx],
                        subject: "This appointment has completed hierarchy",
                        html: "<span>An" + input.type + " has completed hierarchy </span>"
                    })
                    console.log("Email sent to: ", input.emailIds[idx]);
                    console.log("Message sent: %s", info.messageId);
                    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                }catch(err){
                    reject(err);
                }
                resolve("Message Send");
            }
        })
    }
}