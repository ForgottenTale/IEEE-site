const protected = require('./user.js');
const public = require('./public.js');

module.exports = function(app){
    app.route('/')
    .get((req, res)=>{
        res.sendFile(process.cwd() + '/build/index.html');
    })
    public(app);
    protected(app);
}