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



// router.get('/listview', (req, res)=> {
// 	connection.query('SELECT * FROM packList', (error, results)=>{
// 		if (error) throw error;
// 		res.json(results);
// 	})
// })

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

    var tripSettingWhereClause = ""
    if (tripSetting == 'beach'){
    	tripSettingWhereClause += ' AND beach = 1'
    }else if (tripSetting == 'winter'){
    	tripSettingWhereClause += ' AND winter = 1'
    }else if (tripSetting == 'camping'){
    	tripSettingWhereClause += ' AND camping = 1'
    }else if (tripSetting == 'formal'){
    	tripSettingWhereClause += ' AND formal = 1'
    }else if (tripSetting == 'international'){
    	tripSettingWhereClause += ' AND international = 1'
    }else if (tripSetting == 'business international'){
    	tripSettingWhereClause += ' AND businessInternational = 1'
    }else if (tripSetting == 'business casual'){
    	tripSettingWhereClause += ' AND businessCasual = 1'
    }else if (tripSetting == 'business formal'){
    	tripSettingWhereClause += ' AND businessFormal = 1'
    }

    var childrenWhereClause = ""
    if (children == 'children'){
    	childrenWhereClause += `${tripSettingWhereClause} AND babyItem = 0`
    }else if (children == 'babies'){
    	childrenWhereClause += `${tripSettingWhereClause} AND childItem = 0`
    }else if (children == 'none'){
    	childrenWhereClause += `${tripSettingWhereClause} AND babyItem = 0 AND childItem = 0`
    }else if (children == 'childrenAndBabies'){
    	childrenWhereClause += `${tripSettingWhereClause}`
    }


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
				// THIS TAKES US FROM THE SURVEY TO THE LISTVIEW
				router.get('/listview', (req,res)=>{
					console.log('Query has fired!!!!!!!!!')
					const createListQuery = `SELECT * from packList WHERE 1 ${childrenWhereClause}`
					console.log(createListQuery)
					connection.query(createListQuery, (error3,results3)=>{
						// console.log(results3)
						if (error3) throw error3;
						res.json(results3);
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
