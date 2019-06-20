const db = require("../db")

const Submission = db.bookshelf.model('Submission', {
  tableName: 'submissions',
  hasTimestamps: ['created_at', 'updated_at'],
  user: function() {
    return this.belongsTo('User');
  },
  assignment: function() {
    return this.belongsTo('Assignment')
  }
});

module.exports = Submission