var connection = require('../../config/db');
const util = require('util')

function Todo() {
 
  this.insert = function(req, res, next){
    
      var json = JSON.parse(req.body.json);
      
      var query = 'INSERT INTO tbl_post '
                + '(alias, url, urlImage, width, height, number_likes, '
                + 'number_comments, is_video, multiple_image, tags, mentions, description, date) '
                + 'VALUES( '
                + '?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) '
                + 'ON DUPLICATE KEY UPDATE '
                + 'alias=?, '
                + 'urlImage=?, '
                + 'width=?, '
                + 'height=?, '
                + 'number_likes=?, '
                + 'number_comments=?, '
                + 'is_video=?, '
                + 'multiple_image=?, '
                + 'tags=?, '
                + 'mentions=?, '
                + 'description=?, '
                + 'date=?';

      connection.acquire(function(err, con) {
          con.query(query, [json.alias, json.url, json.urlImage, json.width, json.height, 
                            json.numberLikes, json.numberComments, json.isVideo, json.multipleImage, 
                            json.tags, json.mentions, json.description, json.date,                            
                            json.alias, json.urlImage, json.width, json.height, 
                            json.numberLikes, json.numberComments, json.isVideo, json.multipleImage, 
                            json.tags, json.mentions, json.description, json.date], 
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