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



router.get('/listview', (req, res)=> {
	connection.query('SELECT * FROM packList', (error, results)=>{
		if (error) throw error;
		res.json(results);
	})
})

router.get('/profile', (req, res)=>{
	profileQuery = `SELECT * FROM users
	LEFT JOIN tripInfo ON users.id = tripInfo.uid`
	connection.query(profileQuery, (error, results)=>{
		if (error) throw error;
		res.json(results);
	})
})

router.post('/survey', (req, res)=>{
	// console.log(req.body)
	var tripType = req.body.tripType;
    var tripSetting = req.body.tripSetting;
    var destination = req.body.destination;
    var tripDate = req.body.tripDate;
    var children = req.body.children;
    var token = req.body.token;
    // console.log(token)

    const getUidQuery = `SELECT id from users WHERE token=?`
	connection.query(getUidQuery, [token], (error,results)=>{
		console.log(token)
		if(error) throw error;
		if(results.length == 0 ){
			res.json({msg:"badToken"})
		}else{
			// console.log(results[0].id)
			const addToTripsQuery = `INSERT INTO tripInfo (uid, tripType, tripSetting, destination, tripDate, children)
				VALUES (?,?,?,?,?,?)`
			connection.query(addToTripsQuery, [results[0].id, tripType, tripSetting, destination, tripDate, children], (error2,results2)=>{
				router.get('/survey', (req,res)=>{
					const createListQuery = `SELECT * from packList WHERE destination = 1`
					connection.query(createListQuery, (error3,results3)=>{
						res.json(results3)
					})
				})	
			})
		}  
	})
})

// store trip you're looking for as a variable.

// select * from packlist where thetripyourestoringasavariable = 1 and children = 


router.post('/register', (req, res)=>{
	var email = req.body.email;
	var password = bcrypt.hashSync(req.body.password);
	var name = req.body.name;
	var gender = req.body.gender;
	var created = parseInt(Date.now() / 1000);
	var token = randToken.uid(40);

	const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
	connection.query(checkEmailQuery,[email],(error,results)=>{
		// console.log(results)
		// console.log(error)
		if(error) throw error;
		if(results.length > 0){
			res.json({
				msg: "userAlreadyExists"
			});
		}else{
			var insertIntoUsers = "INSERT INTO users (email, password, name, gender, token, created) VALUES (?,?,?,?,?,?)"
			connection.query(insertIntoUsers,[email, password, name, gender, token, created],(error2, results2)=>{
				if(error2){
					res.json({
						msg: error2
					})
				}else{
					res.json({
						msg: "userInserted",
						token: token,
						name: name
					});
				}
			})
		}
	})
})

router.post('/login', (req, res)=>{
	var email = req.body.email;
	var password = req.body.password;
	var checkLoginQuery = `SELECT * FROM users
		WHERE email=?`
	connection.query(checkLoginQuery, [email], (error,results)=>{
		// console.log(results)
		if (error) throw error;
		if (results.length === 0){
			// Email is not in the database
			res.json({
				msg: 'badEmail'
			})
		}else{
			// The email is valid. Check password:
			var checkHash = bcrypt.compareSync(password, results[0].password);
			if (checkHash == true){
				const updateToken = `UPDATE users SET token=?, token_exp=DATE_ADD(NOW(), INTERVAL 1 HOUR)
					WHERE email=?`;
				var token = randToken.uid(40);
				connection.query(updateToken, [token,email], (error2, results2)=>{
					console.log(token)
					res.json({
						msg: 'loginSuccess',
						token: token,
						name: results[0].name,
						email: results[0].email,
						gender: results[0].gender
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
