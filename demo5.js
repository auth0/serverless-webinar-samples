var app = new (require('express'))();
var wt = require('webtask-tools');
const Particle = require('particle-api-js@5.2.7')
const particle = new Particle()

app.use(require('body-parser').urlencoded());

app.get('/', function (req, res) {
    particle.callFunction({
      deviceId: 'office-lights',
      name: 'pixels',
      argument: 'rainbow',
      auth: req.webtaskContext.secrets.particle_token
    }).then(function(){
      res.send({success: true})
    }, function(err){
      res.send(err)
    })
});

app.post('/', function(req, res){
  console.log(req.body)
    particle.callFunction({
      deviceId: 'office-lights',
      name: 'pixels',
      argument: req.body.color,
      auth: req.webtaskContext.secrets.particle_token
    }).then(function(){
      res.send({success: true})
    }, function(err){
      res.send(err)
    })
})


module.exports = wt.fromExpress(app);
