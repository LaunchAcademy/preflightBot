const db = require("../db")

const User = db.bookshelf.model('User', {
  tableName: 'users',
  hasTimestamps: ['created_at', 'updated_at'],
  submissions: function() {
    return this.hasMany('Submission');
  }
});

module.exports = User