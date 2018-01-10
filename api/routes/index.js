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

router.get('/profile', (req, res)=>{
	profileQuery = `SELECT * FROM users
	LEFT JOIN tripInfo ON users.id = tripInfo.uid`
	connection.query(profileQuery, (error, results)=>{
		if (error) throw error;
		res.json(results);
	})
})

router.post('/survey', (req, res)=>{
	console.log(req.body.tripDate)
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
    }else if (children == 'both'){
    	childrenCheck += `${tripSettingCheck} AND childAndBaby = 1`
    }

    // console.log(children)
    // console.log(childrenCheck)

    const getUidQuery = `SELECT id from users WHERE token=?`
	connection.query(getUidQuery, [token], (error,results)=>{
		console.log(token)
		if (error){console.log('SURVEY — Error 1')};
		if(results.length == 0){
			res.json({msg:"badToken"})
		}else{
			const addToTripsQuery = `INSERT INTO tripInfo (uid, tripType, tripSetting, destination, tripDate, children)
				VALUES (?,?,?,?,?,?)`
			connection.query(addToTripsQuery, [results[0].id, tripType, tripSetting, destination, tripDate, children], (error2,results2)=>{

				console.log(tripDate);
				console.log("****error2****")
				console.log(error2)
				if (error){console.log('SURVEY — Error 2')};
				res.json({
					tripInfoId: results2.insertId
				})
				// console.log(results2)
			})
		}
	})
})	

router.post('/listview', (req,res)=>{
    surveyId = req.body.surveyId;
    token = req.body.token;

    console.log('survey ID and token')
    console.log(surveyId)
    console.log(token)
    // var LISTITEMS;

    if (surveyId != undefined){
        console.log(surveyId)

		const getUidQuery = `SELECT id,gender from users WHERE token= ?`
		connection.query(getUidQuery, [token], (error,results)=>{
			if (error){console.log('LIST — Error 1')}

			var gender = results[0].gender
			console.log(gender)

			var genderCheck = ""
			if (gender == 'Female'){
				genderCheck += ' AND (whichGender = "Female" OR whichGender = "Both")'
			}else if (gender == 'Male'){
				genderCheck += ' AND (whichGender = "Male" OR whichGender = "Both")'
			}
			console.log(genderCheck)

	        const currentTripQuery = `SELECT * FROM tripInfo WHERE id = ?`
	        // console.log(currentTripQuery)
	        connection.query(currentTripQuery, [surveyId], (error2,results2)=>{
	        	if (error2){console.log('LIST — Error 2')}
	            console.log(results2[0])
	            var tripSettingCheck = ''
	            if (results2[0].tripSetting == 'beach'){
	                tripSettingCheck += ' AND beach = 1'
	            }else if (results2[0].tripSetting == 'winter'){
	                tripSettingCheck += ' AND winter = 1'
	            }else if (results2[0].tripSetting == 'camping'){
	                tripSettingCheck += ' AND camping = 1'
	            }else if (results2[0].tripSetting == 'formal'){
	                tripSettingCheck += ' AND formal = 1'
	            }else if (results2[0].tripSetting == 'international'){
	                tripSettingCheck += ' AND international = 1'
	            }else if (results2[0].tripSetting == 'business international'){
	                tripSettingCheck += ' AND businessInternational = 1'
	            }else if (results2[0].tripSetting == 'business casual'){
	                tripSettingCheck += ' AND businessCasual = 1'
	            }else if (results2[0].tripSetting == 'business formal'){
	                tripSettingCheck += ' AND businessFormal = 1'
	            }
	            // console.log(tripSettingCheck)
	            var childrenCheck = ''
	            if (results2[0].children == 'children'){
	                childrenCheck += `${tripSettingCheck} AND childJoining = 1`
	            }else if (results2[0].children == 'babies'){
	                childrenCheck += `${tripSettingCheck} AND babyJoining = 1`
	            }else if (results2[0].children == 'none'){
	                childrenCheck += `${tripSettingCheck} AND noChildren = 1`
	            }else if (results2[0].children == 'both'){
	                childrenCheck += `${tripSettingCheck} AND childAndBaby = 1`
	            }
	            // console.log(childrenCheck)
	            connection.query(`SELECT * from packList WHERE 1 ${childrenCheck} ${genderCheck}`, (error3,results3)=>{
	                if (error3) {console.log("List — Error 3")}
	                else {
	                	LISTITEMS = (results3)
	                    LISTITEMS.map((listItem, index)=>{
	                    	connection.query('INSERT INTO userListItems (tripId, item, itemCategory) VALUES (?, ?, ?)', [surveyId, listItem.item, listItem.itemCategory], (error4, results4) => {
	                    		if (error4) throw error4;
	                    		// console.log(results4)
	                    	})
	                    })
	                    res.json(LISTITEMS);
	                }
	            })
	        })
	    })
    }
})


router.post('/userPackingList', (req,res)=>{
	console.log(req.body)
	item = req.body.item;
	itemCategory = req.body.itemCategory;
	tripId = req.body.tripId;
	query = req.body.query;
	token = req.body.token; 
	console.log("item")
	console.log(item)
	console.log("itemCategory")
	console.log(itemCategory)
	console.log("tripId")
	console.log(tripId)
	console.log("query")
	console.log(query)
	console.log("token")
	console.log(token)

	connection.query(query, [tripId, item, itemCategory]), (error, results)=>{
		if (error) throw error;
		connection.query('SELECT * FROM userListItems WHERE tripId=(?)', [tripId], (error2, results2) => {
			if (error2) throw error;
			res.json(results2)
		})
	}
})

module.exports = router;