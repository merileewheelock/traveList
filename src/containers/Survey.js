import React, {Component} from 'react';
import  {bindActionCreators} from 'redux';
import SurveyAction from '../actions/SurveyAction';
import {connect} from 'react-redux';
import $ from 'jquery';

class Survey extends Component{
    constructor(props) {
        super(props);
        this.state = {

            surveyStatus: '1',
            tripType: '',
            tripSetting: '',
            destination: '',
            tripDate: '',
            children: '',
            totalQuestions: 5,
            currentQuestion: 1

        }
        this.handleSurvey = this.handleSurvey.bind(this);
        this.handleVisibility = this.handleVisibility.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.surveyResponse != null){
            console.log("Going to /listview")
            console.log(nextProps.surveyResponse)
            this.props.history.push('/listview');
        }
    }

    handleSurvey(event){
        // console.dir(event.target)
        event.preventDefault();

        var tripType = event.target.childNodes[0].childNodes[1].value;
        var tripSetting = event.target.childNodes[1].childNodes[1].value;
        var destination = event.target.childNodes[2].childNodes[1].value;
        var tripDate = event.target.childNodes[3].childNodes[1].value;
        var children = event.target.childNodes[4].childNodes[1].value;
        var token = this.props.loginInfo.token

        this.props.surveyAction({
            tripType: tripType,
            tripSetting: tripSetting,
            destination: destination,
            tripDate: tripDate,
            children: children,
            token: token
        });   
    }

    handleVisibility(event){
        // console.log(this.state.currentQuestion);
        // console.log(this.state.totalQuestions);
        var current = (this.state.currentQuestion).toString();
        var next = (this.state.currentQuestion + 1).toString();
        if (this.state.currentQuestion === this.state.totalQuestions){
            // submit the form
            // console.log("You done it!");
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

	render(){
        console.log("*********************")
        console.log(this.props.reduxState)
        console.log("*********************")

        console.log(this.props.surveyResponse)
        

		return(
			<div className="survey-box text-center">
				<form id="formSubmit" method="post" onSubmit={this.handleSurvey}>
                    <div className="survey question-1 text-center visible">
                        <h1>What type of trip is this?</h1>
                        <button name="business" value="business" className="btn btn-default" id="next" onClick={this.handleVisibility}>Business</button>
                        <button name="leisure" value="leisure" className="btn btn-default" id="next" onClick={this.handleVisibility}>Leisure</button>
                    </div>
                    <div className="survey question-2 text-center not-visible">
                        <h1>And what is the setting?</h1>
                        <button value="beach" className="btn btn-default" id="next" onClick={this.handleVisibility}>Leisure: Beach</button>
                        <button value="winter" className="btn btn-default" id="next" onClick={this.handleVisibility}>Leisure: Winter</button>
                        <button value="camping" className="btn btn-default" id="next" onClick={this.handleVisibility}>Leisure: Camping</button>
                        <button value="formal" className="btn btn-default" id="next" onClick={this.handleVisibility}>Leisure: Formal</button>
                        <button value="international" className="btn btn-default" id="next" onClick={this.handleVisibility}>Leisure: International</button>
                        <button value="business international" className="btn btn-default" id="next" onClick={this.handleVisibility}>Business: International</button>
                        <button value="business casual" className="btn btn-default" id="next" onClick={this.handleVisibility}>Business: Casual</button>
                        <button value="business formal" className="btn btn-default" id="next" onClick={this.handleVisibility}>Business: Formal</button>
                    </div>
                    <div className="survey question-3 text-center not-visible">
                        <h1>Where to?</h1>
                        <input type="text"/>
                        <br/>
                        <div id="next" onClick={this.handleVisibility}>Next</div>
                    </div>
                    <div className="survey question-4 text-center not-visible">
                        <h1>When do you leave?</h1>
                        <input type="date"/>
                        <br/>
                        <div id="next" onClick={this.handleVisibility}>Next</div>
                    </div>
                    <div className="survey question-5 text-center not-visible">
                        <h1>Any children or babies on this trip?</h1>
                        <button value="none" className="btn btn-default" id="next" onClick={this.handleVisibility}>No children</button>
                        <button value="children" className="btn btn-default" id="next" onClick={this.handleVisibility}>Yes, children will be joining</button>
                        <button value="babies" className="btn btn-default" id="next" onClick={this.handleVisibility}>Yes, babies will be joining</button>
                        <button value="childrenAndBabies" className="btn btn-default" id="next" onClick={this.handleVisibility}>Children AND babies!</button>
                        <br/>
                        <button id="submit" type="submit" className="not-visible btn btn-default">
                            Submit
                        </button>
                    </div>
                </form>
			</div>
		)
	}
}

function mapStateToProps(state){
    return{
        surveyResponse: state.surveyReducer,
        loginInfo: state.registerReducer,
        reduxState: state
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        surveyAction: SurveyAction
    }, dispatch)
}

// export default Register;
export default connect(mapStateToProps,mapDispatchToProps)(Survey);