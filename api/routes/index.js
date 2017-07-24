var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../config/config');
var bcrypt = require('bcrypt-nodejs');
var randToken = require('rand-token');

var connection = mysql.createConnection({
	host: config.host,
	user: config.user,
	password: config.password,
	database: config.database
})
connection.connect();

router.post('/register', (req, res)=>{
	var email = req.body.email;
	var password = req.body.password;
	var username = req.body.username;
	var name = req.body.name;
	var gender = req.body.gender;

})

router.post('/login', (req, res)=>{
	var email = req.body.email;
	var password = req.body.password;
	var checkEmailQuery = `SELECT * FROM users
		WHERE email=?`
	connection.query(checkEmailQuery, [email], (error,results)=>{
		// console.log(results)
		if (error) throw error;
		if (results.length === 0){
			// Email is not in the database
			res.json({
				msg: 'badUsername'
			})
		}else{
			// The username is valid. Check password:
			var checkHash = bcrypt.compareSync(password, results[0].password);
			if (checkHash == true){
				const updateToken = `UPDATE users SET token=?, token_exp=DATE_ADD(NOW(), INTERVAL 1 HOUR)
					WHERE email=?`;
				var token = randToken.uid(40);
				connection.query(updateToken, [token,email], (error2, results2)=>{

					res.json({
						msg: 'loginSuccess',
						name: results[0].username,
						token: token
					})
				})
			}else{
				res.json({
					msg: 'wrongPassword'
				})
			} 
		}
	})
})




module.exports = router;
