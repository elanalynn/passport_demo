const db = require('../db/api')
const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const saltRounds = 8

passport.use(new LocalStrategy(function(username, password, done) {
  db.findUserByUsername(username).then(function(user){
    if(user &&  bcrypt.compareSync(password, user.password)) {
      return done(null, user)
    } else {
      return done(new Error('Invalid Email or Password'))
    }
  }).catch(function(err){
    return done(err)
  })
}))

function createUser(user) {
  var hash = bcrypt.hashSync(user.password, saltRounds)
  user = {
    username: user.username,
    password: hash,
  }
  return db.addUser(user).then(function(id) {
    return id[0]
  }).catch(function(err) {
    return Promise.reject(err)
  })
}

module.exports = {
  passport: passport,
  createUser: createUser,
}
