const config = require('../knexfile.js');
const knex = require('knex');
const bookshelf = require('bookshelf')

class DB {
  constructor(){
    if(!this.instance) {
      const environment = process.env.NODE_ENV || 'development'
      const knexClient = knex(config[environment]) 
      const bookshelfClient = bookshelf(knexClient)
      bookshelfClient.plugin('registry')
      this.instance = {
        knex: knexClient,
        bookshelf: bookshelfClient
      }
    }
    return this.instance
  }
}

module.exports = new DB()