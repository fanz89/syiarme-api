var post = require('../controllers/post');
 
module.exports = {
  configure: function(app) {
    app.route('/api/post/insert').post(post.insert);
  }
};
