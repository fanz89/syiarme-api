var user = require('../controllers/user');
 
module.exports = {
  configure: function(app) {
    app.route('/api/user/get').post(user.get);
    app.route('/api/user/insert').post(user.insert);
  }
};
