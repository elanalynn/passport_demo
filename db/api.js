var knex = require('./knex')

module.exports = {
  findUserbyUsername(username){
    knex('passport').where('username', username).first()
    .then(user => user)
  },
  getUser(id){
    knex('passport').where('id', id).first()
    .then(user => user)
  },
  addUser(user){
    knex('passport').insert(user, 'id')
    .then(user => user)
  },
}
