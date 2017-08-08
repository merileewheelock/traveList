import React, {Component} from 'react';
import  {bindActionCreators} from 'redux';
import SurveyAction from '../actions/SurveyAction';
import { getWeatherData } from '../actions/index';
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
            currentQuestion: 1,
            term: '' 

        }
        this.handleSurvey = this.handleSurvey.bind(this);
        // this.handleVisibility = this.handleVisibility.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.handleButton = this.handleButton.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        // console.log('componentWillReceiveProps triggered!')
        // console.log('/////////')
        // console.log("Next props")
        // console.log(nextProps)
        // console.log('/////////')
        if(nextProps.surveyResponse != null){
            // console.log('If statement inside of componentWillReceiveProps triggered (nextProps.surveyResponse!=null)')
            // console.log('Pushing to /listview.... (this.props.history.push("/listview")')
            this.props.history.push('/listview');
        }
    }

    onInputChange(event) {
        this.setState({ term: event.target.value })
    }

    // handleVisibility(event, value){

    //     // console.log('HandleVisibility event triggered!')
    //     // console.log('/////////')
    //     // console.log('Event')
    //     // console.log(event)
    //     // console.log('/////////')

    //     // console.log('///SUPER IMPORTANT///')
    //     // console.log('event.target.parentNode')
    //     // console.dir(event.target.parentNode)
    //     // console.log('///SUPER IMPORTANT///')

    //     console.log('///ALSO PRETTY IMPORTANT//')
    //     console.log('this.state.currentQuestion')
    //     console.log(this.state.currentQuestion)
    //     // console.log("event.target.parentNode.value")
    //     // console.dir(event.target)
    //     console.log(value)
    //     console.log('///ALSO PRETTY IMPORTANT//')


    //     if (this.state.currentQuestion === 1){
    //         this.setState({
    //             tripType: value
    //         });
    //     }

    //     if (this.state.currentQuestion === 2){
    //         this.setState({
    //             tripSetting: value
    //         });
    //     }

    //     if (this.state.currentQuestion === 3){
    //         var destination = $('#destination-input-text').val()
    //         this.setState({
    //             destination: destination
    //         });
    //     }

    //     if (this.state.currentQuestion === 4){
    //         var tripDate = $('#date-input-value').val()
    //         this.setState({
    //             tripDate: tripDate
    //         })
    //     }

    //     if (this.state.currentQuestion === 5){
    //         this.setState({
    //             children: value
    //         });
    //     }

    //     // console.log('If statements have run!')
    //     // console.log('THIS.STATE')
    //     // console.log(this.state)


    //     // console.log('/////////////')
    //     // console.log('this.state.currentQuestion')
    //     // console.log(this.state.currentQuestion)
    //     // console.log('/////////////')


    //     // console.log('/////////////')
    //     // console.log('this.state.totalQuestions')
    //     // console.log(this.state.totalQuestions)
    //     // console.log('/////////////')


    //     var current = (this.state.currentQuestion).toString();
    //     var next = (this.state.currentQuestion + 1).toString();


    //     // console.log('/////////////')
    //     // console.log('var current')
    //     // console.log(current)
    //     // console.log('var next')
    //     // console.log(next)
    //     // console.log('/////////////')


    //     // console.log('Current/total question IF STATEMENT about to run...')



    //     if (this.state.currentQuestion === this.state.totalQuestions){
    //         // console.log('IF STATEMENT TRIGGERED (currentQuestion = totalQuestions)')
    //         // submit the form
    //         // console.log("You done it!");
    //         $('#next').addClass('not-visible');
    //         // console.log("'not-visible' class ADDED to #next")
    //         $('#submit').removeClass('not-visible');
    //         // console.log("'not-visible' class REMOVED from #submit")
    //         // console.log('IF STATEMENT HAS RUN!')
    //     }else{
    //         // console.log('ELSE STATEMENT TRIGGERED')
    //         $('.question-'+current).addClass('not-visible');
    //         // console.log('not-visible class ADDED to ('.question-'+current)')
    //         // console.log('VALUE OF ('.question-'+current)')
    //         // console.log('.question-'+current)
    //         $('.question-'+next).removeClass('not-visible');
    //         // console.log('not-visible class REMOVED from ('.question-'+next)')
    //         // console.log('VALUE OF ('.question-'+next)')
    //         // console.log('.question-'+next)

    //         // var currentQuestionUpdate = this.state.currentQuestion + 1
    //         var currentQuestionUpdate = this.state.currentQuestion + 1


    //         // console.log('////////////////')
    //         // console.log('currentQuestionUpdate')
    //         // console.log(currentQuestionUpdate)
    //         // console.log('////////////////')

    //         // console.log('////////////////')
    //         // console.log('this.state BEFORE updating currentQuestion')
    //         // console.log(this.state)
    //         // console.log('////////////////')

    //         this.setState({
    //             currentQuestion: currentQuestionUpdate
    //         });

    //         // console.log('////////////////')
    //         // console.log('this.state AFTER updating currentQuestion')
    //         // console.log(this.state)
    //         // console.log('////////////////')

    //         // console.log('ELSE STATEMENT HAS RUN!')
    //     }

    //     // this.setState({
    //     //     tripType: tripType,
    //     //     tripSetting: tripSetting,
    //     //     children: children
    //     // })

    //     // this.props.surveyAction({
    //     //     tripType: tripType,
    //     //     tripSetting: tripSetting,
    //     //     children: children
    //     // });  

    //     // console.log('HANDLEVISIBILITY HAS RUN')
    // }

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




    handleInput(event){

        if (this.state.currentQuestion === 3){
            var destination = $('#destination-input-text').val()
            this.setState({
                destination: destination
            });
        }

        if (this.state.currentQuestion === 4){
            var tripDate = $('#date-input-value').val()
            this.setState({
                tripDate: tripDate
            })
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





    handleSurvey(event){
        event.preventDefault();

        this.props.getWeatherData(this.state.term);
        this.setState({ term: '' });
        // console.log('HANDLESURVEY EVENT TRIGGERED!')

        // console.log('/////////')
        // console.log('event')
        // console.log(event)
        // console.log('/////////')

        // console.log('/////////')
        // console.log('this.props')
        // console.log(this.props)
        // console.log('/////////')

        // console.log('/////////')
        // console.log('event.target.childNodes')
        // console.log(event.target.childNodes)
        // console.log('/////////')

        var tripType = this.state.tripType
        var tripSetting = this.state.tripSetting
        var destination = this.state.destination
        var tripDate = this.state.tripDate
        var children = this.state.children

        var token = this.props.loginInfo.token

        // console.log('///////////')
        // console.log('var token')
        // console.log(token)
        // console.log('///////////')

        // console.log('///////////')
        // console.log('var tripType')
        // console.log(tripType)
        // console.log('///////////')

        // console.log('///////////')
        // console.log('var tripSetting')
        // console.log(tripSetting)
        // console.log('///////////')

        // console.log('///////////')
        // console.log('var destination')
        // console.log(destination)
        // console.log('///////////')

        // console.log('///////////')
        // console.log('var tripDate')
        // console.log(tripDate)
        // console.log('///////////')

        // console.log('///////////')
        // console.log('var children')
        // console.log(children)
        // console.log('///////////')


        this.props.surveyAction({
            tripType: tripType,
            tripSetting: tripSetting,
            destination: destination,
            tripDate: tripDate,
            children: children,
            token: token
        });   

        // console.log('/////////')
        // console.log("SurveyAction has fired! (Maybe? I mean it would. Ideally. In a perfect world. We'll see.")
        // console.log('/////////')

    }

	render(){
        // console.log('/////////')
        // console.log('SURVEY.JS HAS RENDERED')
        // console.log('this.props')
        // console.log(this.props)
        // console.log('/////////')


        var tripSettingButtons = []
        if(this.state.tripType === "leisure"){
            tripSettingButtons.push(
                <button type='button' value='beach' className='survey-option-box ease1' id='next' onClick={()=>this.handleButton('beach')} key="1">
                    <i className="fa fa-sun-o fa-5x" aria-hidden="true"></i>
                    Beach
                </button>,
                <button type='button' value='winter' className='survey-option-box ease2' id='next' onClick={()=>this.handleButton('winter')} key="2">
                    <i className="fa fa-snowflake-o fa-5x" aria-hidden="true"></i>
                    Winter
                </button>,
                <button type='button' value='camping' className='survey-option-box ease3' id='next' onClick={()=>this.handleButton('camping')} key="3">
                    <i className="fa fa-fire fa-5x" aria-hidden="true"></i>
                    Camping
                </button>,
                <button type='button' value='formal' className='survey-option-box ease4' id='next' onClick={()=>this.handleButton('formal')} key="4">
                    <i className="fa fa-black-tie fa-5x" aria-hidden="true"></i>
                    Formal
                </button>,
                <button type='button' value='international' className='survey-option-box ease5' id='next' onClick={()=>this.handleButton('international')} key="5">
                    <i className="fa fa-globe fa-5x" aria-hidden="true"></i>
                    International
                </button>
            )
        }else if(this.state.tripType === "business"){
            tripSettingButtons.push(
                <button type='button' value='business international' className='survey-option-box ease1' id='next' onClick={()=>this.handleButton('business international')} key="1">
                    <i className="fa fa-globe fa-5x" aria-hidden="true"></i>
                    International
                </button>,
                <button type='button' value='business casual' className='survey-option-box ease2' id='next' onClick={()=>this.handleButton('business casual')} key="2">
                    <i className="fa fa-suitcase fa-5x" aria-hidden="true"></i>
                    Casual
                </button>,
                <button type='button' value='business formal' className='survey-option-box ease3' id='next' onClick={()=>this.handleButton('business formal')} key="3">
                    <i className="fa fa-black-tie fa-5x" aria-hidden="true"></i>
                    Formal
                </button>
            )
        }
        
		return(
            <div className='survey-box text-center'>
                <form id='formSubmit' method='post' onSubmit={this.handleSurvey}>
                    <div className='survey question-1 text-center visible'>
                        <h1>What type of trip is this?</h1>
                        <button type='button' name='business' value='business' className='survey-option-box trip-type ease1' id='next' onClick={()=>this.handleButton('business')}>
                            <i className="fa fa-briefcase fa-5x" aria-hidden="true"></i>
                            Business
                        </button>
                        <button type='button' name='leisure' value='leisure' className='survey-option-box trip-type ease2' id='next' onClick={()=>this.handleButton('leisure')}>
                            <i className="fa fa-binoculars fa-5x" aria-hidden="true"></i>
                            Leisure
                        </button>
                    </div>
                    <div className='survey question-2 text-center not-visible'>
                        <h1>And what is the setting?</h1>
                        {tripSettingButtons}
                    </div>
                    <div className='survey question-3 text-center not-visible'>
                        <h1>Where to?</h1>
                        <input
                            placeholder="Destination"
                            value={this.state.term}
                            onChange={this.onInputChange}
                            id='destination-input-text'
                            className='ease3'
                        />
                        {/*<input type='text' id='destination-input-text'/>*/}
                        <br/>
                        <div id='next' onClick={this.handleInput}>Next</div>
                    </div>
                    <div className='survey question-4 text-center not-visible'>
                        <h1>When do you leave?</h1>
                        <input type='date' id='date-input-value' className='ease3'/>
                        <br/>
                        <div id='next' onClick={this.handleInput}>Next</div>
                    </div>
                    <div className='survey question-5 text-center not-visible'>
                        <h1>Any children or babies on this trip?</h1>
                        <button type='button' value='none' className='survey-option-box ease1' id='next' onClick={()=>this.handleButton('none')}>
                            <i className="fa fa-times fa-5x" aria-hidden="true"></i>
                            No children
                        </button>
                        <button type='button' value='children' className='survey-option-box ease2' id='next' onClick={()=>this.handleButton('children')}>
                            <i className="fa fa-user fa-5x" aria-hidden="true"></i>
                            Yes, children
                        </button>
                        <button type='button' value='babies' className='survey-option-box ease3' id='next' onClick={()=>this.handleButton('babies')}>
                            <i className="fa fa-child fa-5x" aria-hidden="true"></i>
                            Yes, babies
                        </button>
                        <button type='button' value='both' className='survey-option-box ease4' id='next' onClick={()=>this.handleButton('both')}>
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
        surveyAction: SurveyAction,
        getWeatherData: getWeatherData
    }, dispatch)
}

// export default Register;
export default connect(mapStateToProps,mapDispatchToProps)(Survey);







// handleButton(value){

//         if (this.state.currentQuestion === 1){
//             this.setState({
//                 tripType: value
//             });
//         }

//         if (this.state.currentQuestion === 2){
//             this.setState({
//                 tripSetting: value
//             });
//         }

//         if (this.state.currentQuestion === 5){
//             this.setState({
//                 children: value
//             });
//         }

//         var current = (this.state.currentQuestion).toString();
//         var next = (this.state.currentQuestion + 1).toString();


//         if (this.state.currentQuestion === this.state.totalQuestions){
//             $('#next').addClass('not-visible');
//             $('#submit').removeClass('not-visible');
//         }else{   
//             $('.question-'+current).addClass('not-visible');
//             $('.question-'+next).removeClass('not-visible');
         
//             var currentQuestionUpdate = this.state.currentQuestion + 1

//             this.setState({
//                 currentQuestion: currentQuestionUpdate
//             });        
//         }
//     }




// handleInput(event){

//         if (this.state.currentQuestion === 3){
//             var destination = $('#destination-input-text').val()
//             this.setState({
//                 destination: destination
//             });
//         }

//         if (this.state.currentQuestion === 4){
//             var tripDate = $('#date-input-value').val()
//             this.setState({
//                 tripDate: tripDate
//             })
//         }

//         var current = (this.state.currentQuestion).toString();
//         var next = (this.state.currentQuestion + 1).toString();


//         if (this.state.currentQuestion === this.state.totalQuestions){
//             $('#next').addClass('not-visible');
//             $('#submit').removeClass('not-visible');
//         }else{   
//             $('.question-'+current).addClass('not-visible');
//             $('.question-'+next).removeClass('not-visible');
         
//             var currentQuestionUpdate = this.state.currentQuestion + 1

//             this.setState({
//                 currentQuestion: currentQuestionUpdate
//             });
         
//         } 
//     }






