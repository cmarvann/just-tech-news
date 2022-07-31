const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//Define the Post model 
// initialize the Post model

// create our Post model
class Post extends Model {
// columns, config naming, pass connection instance to initialize the Post model
static upvote(body, models) {
  return models.Vote.create({
    user_id: body.user_id,
    post_id: body.post_id
  }).then(() => {
    return Post.findOne({
      where: {
        id: body.post_id
      },
      attributes: [
        'id',
        'post_url',
        'title',
        'created_at',
        [
          sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
          'vote_count'
        ]
      ]
    });
  });
}
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    post_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isURL: true
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
  }
);

// make the Post model accessible to other parts of application
module.exports = Post;