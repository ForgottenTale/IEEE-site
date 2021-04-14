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

    app.route('/api/my-approvals')
    .get(auth.ensureAuthenticated, auth.ensureAdmin, (req, res)=>{
        req.query.user_id = req.user._id;
        database.findUserApprovals(req.query, (err, results)=>{
            if(err) return respondError(err, res);
            res.status(200).json(results);
        })
    })

    app.route('/api/:type/:action')
    .post(auth.ensureAuthenticated, auth.ensureAdmin, (req, res)=>{
        database.changeAppointmentStatus({
            user_id: req.user._id,
            userRole: req.user.role,
            appointmentId: req.body.id,
            type: req.params.type,
            response: req.body.response,
            encourages: req.params.action=="reject"?false:true
        })
    })

}