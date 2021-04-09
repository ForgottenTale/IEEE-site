const auth = require('../auth.js');
const {getClass} = require('../controller.js');
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

                req.body.startTime = new Date('April 15, 2021 01:05:00').toISOString();
                req.body.endTime = new Date('April 15, 2021 01:30:00').toISOString();

                req.body.poster = req.file?req.file.filename:null;
                req.body.creatorId = req.user._id;
                req.body.type = req.params.params;
                AppointmentClass= getClass(req.params.params);
                newAppointment = new AppointmentClass(req.body);
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