var knex = require('./knex')

module.exports = {
  findUserbyUsername(username){
    knex('passport').select().where('username', username).first()
    .then(function(user){
      return user
    })
  },
  getUser(id){
    knex('passport').select().where('id', id).first()
    .then(function(user){
      return user
    })
  },
  addUser(user){
    knex('passport').insert(user, 'id')
    .then(function(user){
      return user
    })
  },
}
