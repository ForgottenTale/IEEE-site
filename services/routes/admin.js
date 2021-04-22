const auth = require('../auth.js');
const {getClass} = require('../controller.js');
const database = require('../database/database.js');

function respondError(err, res){
    console.error(err);
    res.status(400).json({error: err.message || err});
}

module.exports = function(app){
    
    app.route('/protected')
    .get(auth.ensureAuthenticated, auth.ensureAdmin, (req, res)=>{
        res.sendFile(process.cwd() + '/coverage/protected.html');
    })

    app.route('/api/users')
    .get(auth.ensureAuthenticated, auth.ensureAdmin, (req, res)=>{
        database.getUsers({role: req.query.role}, (err, results)=>{
            if(err) return respondError(err, res);
            res.status(200).json(results);
        });
    })

    app.route('/api/activity')
    .get(auth.ensureAuthenticated, auth.ensureAdmin, (req, res)=>{
        database.getActivity((err, results)=>{
            if(err) return respondError(err, res);
            res.status(200).json(results);
        })
    })
    app.route('/api/my-approvals')
    .get(auth.ensureAuthenticated, auth.ensureAdmin, (req, res)=>{
        req.query.user_id = req.user._id;
        database.findUserApprovals(req.query, (err, results)=>{
            if(err) return respondError(err, res);
            res.status(200).json(results);
        })
    })
    .post(auth.ensureAuthenticated, auth.ensureAdmin, (req, res)=>{
        if(!req.body.id || !req.body.response || !req.body.action){
            return respondError("Requried Fields missing", res);
        }
        database.changeAppointmentStatus({
            user: req.user,
            appointmentId: req.body.id,
            response: req.body.response,
            encourages: req.body.action=="decline"?false:true
        }, (err, msg)=>{
            if(err) return respondError(err, res);
            res.status(200).json({message: msg})
        })
    })

    app.route('/api/my-approvals/history')
    .get(auth.ensureAuthenticated, auth.ensureAdmin, (req, res)=>{
        req.query.user_id = req.user._id;
        database.findHistoryOfApprovals(req.query, (err, results)=>{
            if(err) return respondError(err, res);
            res.status(200).json(results);
        })
    })
}