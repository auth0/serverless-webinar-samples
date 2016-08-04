const Particle = require('particle-api-js@5.2.7')
const particle = new Particle()

module.exports = function(ctx, cb){
    particle.callFunction({
      deviceId: 'office-lights',
      name: 'pixels',
      argument: ctx.body.color || '000000',
      auth: ctx.secrets.particle_token
    }).then(function(){
      cb(null, "should be lit up!")
    }, function(err){
      cb(err, null)
    })
}