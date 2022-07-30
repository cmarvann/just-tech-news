const User = require('./User');
const Post = require("./Post");

// create associations
User.hasMany(Post, {
  foreignKey: 'user_id'
});

// this defines relationship bet Post & User model, declare the link to the foreign key
Post.belongsTo(User, {
    foreignKey: 'user_id',
  });
  






module.exports = { User, Post };
