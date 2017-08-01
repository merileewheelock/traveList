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

    var tripSettingCheck = ""
    if (tripSetting == 'beach'){
    	tripSettingCheck += ' AND beach = 1'
    }else if (tripSetting == 'winter'){
    	tripSettingCheck += ' AND winter = 1'
    }else if (tripSetting == 'camping'){
    	tripSettingCheck += ' AND camping = 1'
    }else if (tripSetting == 'formal'){
    	tripSettingCheck += ' AND formal = 1'
    }else if (tripSetting == 'international'){
    	tripSettingCheck += ' AND international = 1'
    }else if (tripSetting == 'business international'){
    	tripSettingCheck += ' AND businessInternational = 1'
    }else if (tripSetting == 'business casual'){
    	tripSettingCheck += ' AND businessCasual = 1'
    }else if (tripSetting == 'business formal'){
    	tripSettingCheck += ' AND businessFormal = 1'
    }

    var childrenCheck = ""
    if (children == 'children'){
    	childrenCheck += `${tripSettingCheck} AND childJoining = 1`
    }else if (children == 'babies'){
    	childrenCheck += `${tripSettingCheck} AND babyJoining = 1`
    }else if (children == 'none'){
    	childrenCheck += `${tripSettingCheck} AND noChildren = 1`
    }else if (children == 'childrenAndBabies'){
    	childrenCheck += `${tripSettingCheck} AND childAndBaby = 1`
    }

    console.log(children)
    console.log(childrenCheck)

    const getUidQuery = `SELECT id from users WHERE token=?`
	connection.query(getUidQuery, [token], (error,results)=>{
		// console.log(token)
		if(error) throw error;
		if(results.length == 0 ){
			res.json({msg:"badToken"})
		}else{
			// console.log(results[0].id)
			const addToTripsQuery = `INSERT INTO tripInfo (uid, tripType, tripSetting, destination, tripDate, children)
				VALUES (?,?,?,?,?,?)`
			connection.query(addToTripsQuery, [results[0].id, tripType, tripSetting, destination, tripDate, children], (error2,results2)=>{
				// const tripInfoId = results2.insertId
				// connection.query()
				if (error2) throw error;
				res.json({
					tripInfoId: results2.insertId
				})
				console.log(results2)
			})
		}
	})
})

router.post('/listview', (req,res)=>{
	console.log(req.body)




	// surveyId = req.body.surveyId
	// token = req.body.token
	// console.log(surveyId)
	// console.log(token)
	// const createListQuery = `SELECT * from packList WHERE 1 ${childrenCheck}`
	// console.log(createListQuery)
	// connection.query(createListQuery, (error3,results3)=>{
	// 	// console.log(results3)
	// 	if (error3) throw error3;
	// 	res.json(results3);
	// })
})	

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
					// console.log(token)
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
