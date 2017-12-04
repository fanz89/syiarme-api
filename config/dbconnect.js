var express    = require("express");
var mysql      = require('mysql');
var bodyParser = require('body-parser');


var connection = mysql.createPool({
  connectionLimit: 50,
  host: "localhost",
  user: "root",
  password: "",
  database: "db_syiarme"
});

var app = express();
app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.post("/api/findByDate",function(req,res){

	var date = req.body.date;
	var doDate = req.body.doDate;
	
	var query = 'SELECT * '+
				'FROM tbl_user u '+
				'INNER JOIN tbl_post p '+
				'ON u.alias = p.alias '+
				'WHERE (STR_TO_DATE(p.date,"%Y-%m-%d") BETWEEN  "'+ date +'" AND "'+ doDate +'") '+
				'AND u.alias = "pemudahijrah"';


	connection.getConnection(function(error, conn){
		if(!!error){
			conn.release();
			console.log('Error'); 
		}else{
			console.log(query); 
			console.log('Connected!!');
			conn.query(query, function(error, rows, fields){
				conn.release();
				if(!!error){
					console.log('Error in the query');
				}else{
					res.json(rows);
				}
			});
		}
	});
});

app.post("/api/save",function(req,res){

	var json = JSON.parse(req.body.json);

    var qUser = 'INSERT INTO tbl_user '
            + '(alias, username, description_profile, url_profile, url_img_profile, website, number_posts, number_followers, number_following, private, is_official) '
            + 'VALUES ('
            + '"'+ json.alias +'", "'+json.username+'", "'+json.descriptionProfile+'", "'+json.urlProfile+'", "'+json.urlImgProfile+'" , "'+json.website+'", '
            + '"'+json.numberPosts+'", "'+json.numberFollowers+'", "'+json.numberFollowing+'", "'+json.private+'", "'+json.isOfficial+'") '
            + 'ON DUPLICATE KEY UPDATE '
            + 'username="'+json.username+'", '
            + 'description_profile="'+json.descriptionProfile+'", '
            + 'url_profile="'+json.urlProfile+'", '
            + 'url_img_profile="'+json.urlImgProfile+'", '
            + 'website="'+json.website+'", '
            + 'number_posts="'+json.numberPosts+'", '
            + 'number_followers="'+json.numberFollowers+'", '
            + 'number_following="'+json.numberFollowing+'", '
            + 'private="'+json.private+'", '
            + 'is_official="'+json.isOfficial+'"';

	connection.getConnection(function(error, conn){
		if(!!error){
			conn.release();
			console.log('Error'); 
		}else{
			console.log('Insert User : alias ("'+json.alias+'")');
			conn.query(qUser, function(error, rows, fields){
				conn.release();
				if(!!error){
					console.log('Error in the query');
				}else{
					res.json(rows);
				}
			});
		}
	});

	for(var i = 0, len = json.posts.length; i < 1 ; i++){
		
		var post = json.posts[i];


	    var qPost = 'INSERT INTO tbl_post '
	                + '(alias, url, urlImage, width, height, number_likes, number_comments, is_video, multiple_image, tags, mentions, description, date) '
	                + 'VALUES( '
	                + '"'+json.alias+'", "'+post.url+'", "'+post.urlImage+'", "'+post.width+'", "'+post.height+'", "'+post.numberLikes+'", '
	                + '"'+post.numberComments+'", "'+post.isVideo+'", "'+post.multipleImage+'", "'+post.tags+'", "'+post.mentions+'", '
	                + '"'+post.description+'", "'+post.date+'") '
	                + 'ON DUPLICATE KEY UPDATE '
	                + 'alias="'+post.alias+'", '
	                + 'urlImage="'+post.urlImage+'", '
	                + 'width="'+post.width+'", '
	                + 'height="'+post.height+'", '
	                + 'number_likes="'+post.numberLikes+'", '
	                + 'number_comments="'+post.numberComments+'", '
	                + 'is_video="'+post.isVideo+'", '
	                + 'multiple_image="'+post.multipleImage+'", '
	                + 'tags="'+post.tags+'", '
	                + 'mentions="'+post.mentions+'", '
	                + 'description="'+post.description+'", '
	                + 'date="'+post.date+'"';	
		
		connection.getConnection(function(error, conn){
				if(!!error){
					conn.release();
					console.log('Error'); 
				}else{
					console.log('Insert Post : url ("'+post.url+'")');
					conn.query(qPost, function(error, rows, fields){
						conn.release();
						if(!!error){
							console.log('Error in the query');
						}else{
							res.json(rows);
						}
					});
				}
			});	                

	  }

});


app.listen(3000);

