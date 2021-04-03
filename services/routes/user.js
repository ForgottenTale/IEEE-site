const auth = require('../auth.js');
const {OnlineMeeting, InternSupport, ENotice, Publicity} = require('../controller.js');

function respondError(err, res){
    res.status(400).json({error: err});
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
        try{
            let newAppointment;
            req.body.creatorId = req.user._id;
            req.body.type = req.params.params;
            switch(req.params.params){
                case "online_meeting":  newAppointment = new OnlineMeeting(req.body);
                                        break;                                    
                case "intern_support":  newAppointment = new InternSupport(req.body);
                                        break;
                case "e-notice":        newAppointment = new ENotice(req.body);
                                        break;
                case "publicity":       newAppointment = new Publicity(req.body);
                                        break;
                default:                throw "Appointment type not found";
            }
            res.status(200).json(newAppointment.getPublicInfo());
        }
        catch(err){
            respondError(err || err.message, res);
        }
    })
}