const auth = require('../auth.js');
const {getClass} = require('../controller.js');
const database = require('../database/database.js');
const upload = require('../upload.js');

function respondError(err, res){
    console.error(err);
    res.status(400).json({error: err.message || err});
}

module.exports = function(app){

    app.route('/api/my-appointments')
    .get(auth.ensureAuthenticated, (req, res)=>{
        req.query.user_id = req.user._id;
        database.getUserAppointments(req.query, (err, appointments)=>{
            if(err) return respondError(err, res);
            res.status(200).json(appointments);
        });
    })
    
    app.route('/api/my-appointments/:type')
    .post(auth.ensureAuthenticated, (req, res)=>{
        if(req.query.cancel){
            database.removeAppointment({
                type: req.params.type,
                userId: req.user._id,
                appointmentId: req.query.cancel
            }, (err, msg)=>{
                if(err) return respondError(err, res);
                res.status(200).json({message: msg});
            })
        }else{
            respondError('Unsupported query', res);
        }
    })

    app.route('/book/appointment')
    .get(auth.ensureAuthenticated, (req, res)=>{
        res.sendFile(process.cwd() + '/coverage/new_appointment.html');
    })
    app.route('/api/book/:type')
    .post(auth.ensureAuthenticated, (req, res)=>{
        upload.single('img')(req, res, (err)=>{
            try{
                if(err) throw err;
                let newAppointment;
                req.body.img = req.file?req.file.filename:null;
                req.body.creatorId = req.user._id;
                req.body.type = req.params.type;

                req.body.startTime = new Date("April 29, 2021 7:00:00").toISOString();
                req.body.endTime = new Date("April 29, 2021 8:00:00").toISOString();

                AppointmentClass= getClass(req.params.type);
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

    app.route('/api/check-availability/:type')
    .post(auth.ensureAuthenticated, (req, res)=>{
        req.body.type = req.params.type;     
        database.checkAvailability(req.body, (err, msg)=>{
            if(err) return respondError(err, res);
            res.status(200).json({message: msg});
        });
    })
}