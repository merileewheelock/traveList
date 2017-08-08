![traveList Screenshot](assets/images/travelist.png "traveList Homepage")

# traveList
## Made with React, Redux, Express, MySQL, Javascript, jQuery, Booststrap, CSS, and SASS

### Overview
traveList is a web app designed to help travelers stay organized and prepared during all types of travel. The project was inspired by a friend who went on a business trip and noted the difference in packing for business versus packing for leisure. This was created as a tool to help users plan for their upcoming trips based on the type of trip they are taking, including types and settings such as business, international, beach, winter, and many more.

### Team Members
* Guido Bacce
* Merilee Wheelock
* Marissa Monivis
* Michael Gaynor

### Technologies Used
* OpenWeatherMap API
* jQuery
* AJAX
* Bootstrap
* MySQL
* Express
* Sass / Compass
* Node.js

### Dependencies
```
npm install express
npm install mysql
npm install bcrypt-nodejs

npm install react-redux
npm install react-router-dom
npm install react-bootstrap
npm install redux-promise
```

### Challenges and Solutions
#### JavaScript is Asynchronous


#### Creating a Single-Page Look in React


#### Creating a MySQL Database From Scratch


### Code Snippets
#### Insert Survey Results into tripInfo MySQL Database Table
```
const getUidQuery = `SELECT id from users WHERE token=?`
connection.query(getUidQuery, [token], (error,results)=>{
    console.log(token)
    if(error) throw error;
    if(results.length == 0){
        res.json({msg:"badToken"})
    }else{
        const addToTripsQuery = `INSERT INTO tripInfo (uid, tripType, tripSetting, destination, tripDate, children)
            VALUES (?,?,?,?,?,?)`
        connection.query(addToTripsQuery, [results[0].id, tripType, tripSetting, destination, tripDate, children], (error2,results2)=>{
            // const tripInfoId = results2.insertId
            // const listResultsQuery = `SELECT id FROM tripInfo
            //  INNER JOIN packList ON `
            // connection.query()
            console.log(tripDate);
            console.log("****error2****")
            console.log(error2)
            if (error2) throw error2;
            res.json({
                tripInfoId: results2.insertId
            })
            // console.log(results2)
        })
    }
})
```
#### Using React-Redux Logic to Navigate Users Through the Survey Questions
```
handleButton(value){

    if (this.state.currentQuestion === 1){
        this.setState({
            tripType: value
        });
    }

    if (this.state.currentQuestion === 2){
        this.setState({
            tripSetting: value
        });
    }

    if (this.state.currentQuestion === 5){
        this.setState({
            children: value
        });
    }

    var current = (this.state.currentQuestion).toString();
    var next = (this.state.currentQuestion + 1).toString();


    if (this.state.currentQuestion === this.state.totalQuestions){
        $('#next').addClass('not-visible');
        $('#submit').removeClass('not-visible');
    }else{   
        $('.question-'+current).addClass('not-visible');
        $('.question-'+next).removeClass('not-visible');
     
        var currentQuestionUpdate = this.state.currentQuestion + 1

        this.setState({
            currentQuestion: currentQuestionUpdate
        });        
    }
}
```

<!-- ### Screenshots
#### Homepage
![Homepage](/public/images/homepage.png)
#### Route Search
![Route Search](/public/images/route-search.png)
#### Log In Modal
![Log In Modal](/public/images/login-modal.png)
#### Register Modal
![Register Modal](/public/images/register-modal.png)
#### User Profile Page
![User Profile Page](/public/images/profile-page.png) -->