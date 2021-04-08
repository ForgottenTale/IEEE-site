const auth = require('../auth.js');
const {OnlineMeeting, InternSupport, ENotice, Publicity} = require('../controller.js');
const database = require('../database/database.js');
const upload = require('../upload.js');

function respondError(err, res){
    console.error(err);
    res.status(400).json({error: err.message || err});
}

module.exports = function(app){
    app.route('/protected')
    .get(auth.ensureAuthenticated, (req, res)=>{
        res.sendFile(process.cwd() + '/coverage/protected.html');
    })

    app.route('/book/appointment')
    .get(auth.ensureAuthenticated, (req, res)=>{
        res.sendFile(process.cwd() + '/coverage/new_appointment.html');
    })
    app.route('/book/:params')
    .post(auth.ensureAuthenticated, (req, res)=>{
        upload.single('poster')(req, res, (err)=>{
            try{
                if(err) throw err;
                let newAppointment;

                req.body.coHosts = [
                    ["Jimmy Neesham", "jimmyneesham@gmail.com"],
                    ["MS Dhoni", "msd@gmail.com"],
                    ["Gautam Gambhir", "gautamgambhir@gmail.com"]
                ];
                req.body.startTime = new Date('December 17, 1995 03:24:00').toISOString();
                req.body.endTime = new Date().toISOString();

                req.body.poster = req.file?req.file.filename:null;
                req.body.creatorId = req.user._id;
                req.body.type = req.params.params;
                switch(req.params.params){
                    case "online_meeting":  newAppointment = new OnlineMeeting(req.body);
                                            break;                                    
                    case "intern_support":  newAppointment = new InternSupport(req.body);
                                            break;
                    case "e_notice":        newAppointment = new ENotice(req.body);
                                            break;
                    case "publicity":       newAppointment = new Publicity(req.body);
                                            break;
                    default:                throw "Appointment type not found";
                }
                database.addAppointment(newAppointment, (err, doc)=>{
                    if(err){
                        return respondError(err, res);
                    }
                    return res.status(200).json(newAppointment.getPublicInfo());
                })
            }
            catch(err){
                respondError(err, res);
            }
        })
    })
}