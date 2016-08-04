const Particle = require('particle-api-js@5.2.7')
const particle = new Particle()

module.exports = function(ctx, req, res){
    particle.callFunction({
      deviceId: 'office-lights',
      name: 'pixels',
      argument: ctx.body.color || '000000',
      auth: ctx.secrets.particle_token
    }).then(function(){
      res.send({success: true})
    }, function(err){
      res.send(err)
    })
}