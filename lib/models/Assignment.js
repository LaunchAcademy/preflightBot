const db = require("../db")
const Assignment = db.bookshelf.Model.extend({
  tableName: 'assignments',
  hasTimestamps: ['created_at', 'updated_at'],
  submissions: function() {
    return this.hasMany('Submission');
  }
});

module.exports = Assignment