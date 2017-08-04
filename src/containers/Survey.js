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
        console.log("Next props")
        console.log(nextProps)
        if(nextProps.surveyResponse != null){
            console.log("Going to /listview")
            console.log(nextProps.surveyResponse)
            this.props.history.push('/listview');
        }
    }

    handleSurvey(event){
        // console.dir(event.target.childNodes[0].childNodes[2].value)
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
        console.dir(event.target.parentNode.value)
        console.dir(event.target.parentNode)
        console.log(this.state.currentQuestion);
        console.log(this.state.totalQuestions);
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

        // this.setState({
        //     tripType: '',
        //     tripSetting: '',
        //     destination: '',
        //     tripDate: '',
        //     children: '',
        // })
    }

	render(){
        // console.log("*********************")
        // console.log(this.props.reduxState)
        // console.log("*********************")
        // console.log(this.props.surveyResponse)
        
		return(
            <div className='survey-box text-center'>
                <form id='formSubmit' method='post' onSubmit={this.handleSurvey}>
                    <div className='survey question-1 text-center visible'>
                        <h1>What type of trip is this?</h1>
                        <button type='button' name='business' value='business' className='survey-option-box trip-type' id='next' onClick={this.handleVisibility}>
                            <i className="fa fa-briefcase fa-5x" aria-hidden="true"></i>
                            Business
                        </button>
                        <button type='button' name='leisure' value='leisure' className='survey-option-box trip-type' id='next' onClick={this.handleVisibility}>
                            <i className="fa fa-binoculars fa-5x" aria-hidden="true"></i>
                            Leisure
                        </button>
                    </div>
                    <div className='survey question-2 text-center not-visible'>
                        <h1>And what is the setting?</h1>
                        <button type='button' value='beach' className='survey-option-box' id='next' onClick={this.handleVisibility}>
                            <i className="fa fa-sun-o fa-5x" aria-hidden="true"></i>
                            Beach
                        </button>
                        <button type='button' value='winter' className='survey-option-box' id='next' onClick={this.handleVisibility}>
                            <i className="fa fa-snowflake-o fa-5x" aria-hidden="true"></i>
                            Winter
                        </button>
                        <button type='button' value='camping' className='survey-option-box' id='next' onClick={this.handleVisibility}>
                            <i className="fa fa-fire fa-5x" aria-hidden="true"></i>
                            Camping
                        </button>
                        <button type='button' value='formal' className='survey-option-box' id='next' onClick={this.handleVisibility}>
                            <i className="fa fa-black-tie fa-5x" aria-hidden="true"></i>
                            Formal
                        </button>
                        <button type='button' value='international' className='survey-option-box' id='next' onClick={this.handleVisibility}>
                            <i className="fa fa-globe fa-5x" aria-hidden="true"></i>
                            International
                        </button>
                        <br/>
                        <button type='button' value='business international' className='survey-option-box' id='next' onClick={this.handleVisibility}>
                            <i className="fa fa-globe fa-5x" aria-hidden="true"></i>
                            International
                        </button>
                        <button type='button' value='business casual' className='survey-option-box' id='next' onClick={this.handleVisibility}>
                            <i className="fa fa-suitcase fa-5x" aria-hidden="true"></i>
                            Casual
                        </button>
                        <button type='button' value='business formal' className='survey-option-box' id='next' onClick={this.handleVisibility}>
                            <i className="fa fa-black-tie fa-5x" aria-hidden="true"></i>
                            Formal
                        </button>
                    </div>
                    <div className='survey question-3 text-center not-visible'>
                        <h1>Where to?</h1>
                        <input type='text'/>
                        <br/>
                        <div id='next' onClick={this.handleVisibility}>Next</div>
                    </div>
                    <div className='survey question-4 text-center not-visible'>
                        <h1>When do you leave?</h1>
                        <input type='date'/>
                        <br/>
                        <div id='next' onClick={this.handleVisibility}>Next</div>
                    </div>
                    <div className='survey question-5 text-center not-visible'>
                        <h1>Any children or babies on this trip?</h1>
                        <button type='button' value='none' className='survey-option-box' id='next' onClick={this.handleVisibility}>
                            <i className="fa fa-times fa-5x" aria-hidden="true"></i>
                            No children
                        </button>
                        <button type='button' value='children' className='survey-option-box' id='next' onClick={this.handleVisibility}>
                            <i className="fa fa-user fa-5x" aria-hidden="true"></i>
                            Yes, children
                        </button>
                        <button type='button' value='babies' className='survey-option-box' id='next' onClick={this.handleVisibility}>
                            <i className="fa fa-child fa-5x" aria-hidden="true"></i>
                            Yes, babies
                        </button>
                        <button type='button' value='childrenAndBabies' className='survey-option-box' id='next' onClick={this.handleVisibility}>
                            <i className="fa fa-users fa-5x" aria-hidden="true"></i>
                            Both!
                        </button>
                    </div>
                    <br/>
                    <button id='submit' type='submit' className='not-visible btn btn-primary'>
                        >>>
                    </button>
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