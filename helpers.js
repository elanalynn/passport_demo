var jwt = require('jsonwebtoken')

module.exports = {

  createToken: function(user, accessToken) {
    return new Promise(function(resolve, reject){
      // if (err) reject(err)
      delete user.password
      var data = { user: user }
      if(accessToken) data.accessToken = accessToken
      jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '1d' },
        function(token) {
          resolve(token)
        })
    })
  },
}
