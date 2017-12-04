var connection = require('../../config/db');
const util = require('util')

function Todo() {
 
  this.get = function(req,res,next) {

      console.log(req.body.json);

        var request = JSON.parse(req.body.json);

        var query = 'SELECT * '+
          'FROM tbl_user u '+
          'INNER JOIN tbl_post p '+
          'ON u.alias = p.alias '+
          'WHERE (STR_TO_DATE(p.date,"%Y-%m-%d") BETWEEN ? AND ?) '+
          'AND u.alias = ?';

         connection.acquire(function(err,con){
              console.log(err)

            if (err) throw err;
              con.query(query, [request.date, request.doDate, request.alias], function(err,data){
                con.release();
                if(err){
                   return res.json({status:'400',message: 'Failed',result:[]});
                }else{
                  return res.json({status:'200',message:'success',result:data});
                }
            });
         });
  };


  this.insert = function(req, res, next){

      var json = JSON.parse(req.body.json);

      var query = 'INSERT INTO tbl_user '
                  + '(alias, username, description_profile, url_profile, url_img_profile, website, number_posts, number_followers, number_following, private, is_official) '
                  + 'VALUES('
                  + '?, ?, ?, ?, ? , ?, ?, ?, ?, ?, ?) '
                  + 'ON DUPLICATE KEY UPDATE '
                  + 'username=?, '
                  + 'description_profile=?, '
                  + 'url_profile=?, '
                  + 'url_img_profile=?, '
                  + 'website=?, '
                  + 'number_posts=?, '
                  + 'number_followers=?, '
                  + 'number_following=?, '
                  + 'private=?, '
                  + 'is_official=?';

      connection.acquire(function(err, con) {
          con.query(query, [json.alias, json.username, json.descriptionProfile, json.urlProfile, 
                            json.urlImgProfile, json.website, json.numberPosts, json.numberFollowers, 
                            json.numberFollowing, json.private, json.isOfficial,
                            json.username, json.descriptionProfile, json.urlProfile, json.urlImgProfile, 
                            json.website, json.numberPosts, json.numberFollowers, json.numberFollowing, 
                            json.private, json.isOfficial], 
              function(err, result) {
                  con.release();
                  console.log(err);
                  if (err) {
                    res.send({status: 400, message: 'User creation failed'});
                  } else {
                    res.send({status: 200, message: 'User created successfully'});
                  }
              });
        });
    }
}




module.exports = new Todo();