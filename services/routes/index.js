const protected = require('./user.js');
const public = require('./public.js');

module.exports = function(app){
    public(app);
    protected(app);
    app.route('/*')
    .get((req, res)=>{
        res.sendFile(process.cwd() + '/build/index.html');
    })
}