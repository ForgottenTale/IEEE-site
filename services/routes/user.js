module.exports = function(app){
    app.route('/protected')
    .get(auth.ensureAuthenticated, (req, res)=>{
        res.sendFile(process.cwd() + '/coverage/protected.html');
    })
}