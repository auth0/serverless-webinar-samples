var app = new (require('express'))();
var wt = require('webtask-tools');
const Particle = require('particle-api-js@5.2.7')
const particle = new Particle()

app.use(require('body-parser').urlencoded());

app.get('/', function (req, res) {
  if(req.webtaskContext.accessToken){
    res.send(req.webtaskContext.accessToken)
  } else {
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
  }
});

app.get('/login', function(req, res){
  res.send('logged in')
})

app.post('/color', function(req, res){
    particle.callFunction({
      deviceId: 'office-lights',
      name: 'pixels',
      argument: req.body.color,
      auth: req.webtaskContext.secrets.particle_token
    }).then(function(){
            console.log('storing color...')
      req.webtaskContext.storage.get(function(err, data){
        if(err){
          console.log(err)
          return
        } 
        console.log(data)
        data = data || {}
        data.colors = data.colors || []

        data.colors.push(req.body.color)

        req.webtaskContext.storage.set(data, {force: 1}, function(err){
          if(err) console.log(err)
          res.send({success: true})
        })
      })
    }, function(err){
      res.send(err)
    })
})


module.exports = wt.fromExpress(app).auth0({
  exclude: [ '/' ]
})

