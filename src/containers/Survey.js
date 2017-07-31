import React, {Component} from 'react';
import  {bindActionCreators} from 'redux';
import SurveyAction from '../actions/SurveyAction';
import {connect} from 'react-redux';
import $ from 'jquery';

class Survey extends Component{
    constructor(props) {
        super(props);
        this.state = {
            surveyStatus: '1'
        }
        this.handleSurvey = this.handleSurvey.bind(this);
        // this.handleVisbility = this.handleVisbility.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.handleSurvey(nextProps)
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
        this.props.history.push('/listview');
    }

    // handleVisbility(event){
    //     return true;
    // }

	render(){

        // var selectName = $('select').attr('name');

        // // add a hidden element with the same name as the select
        // var hidden = $('<input type="hidden" name="'+selectName+'">');
        // hidden.val($('select').val());
        // hidden.insertAfter($('select'));

        // $("select option").unwrap().each(function() {
        //     var btn = $('<div class="btn">'+$(this).text()+'</div>');
        //     if($(this).is(':checked')) btn.addClass('on');
        //     $(this).replaceWith(btn);
        // });

        // $(document).on('click', '.btn', function() {
        //     $('.btn').removeClass('on');
        //     $(this).addClass('on');
        //     $('input[name="'+selectName+'"]').val($(this).text());
        // });

		return(
			<div className="survey-box text-center">
				<form id="formSubmit" method="get" onSubmit={this.handleSurvey}>
                    <div className="survey question-1 text-center visible">
                        <h1>What type of trip is this?</h1>
                        <select className="tripType">
                            <option name="business" value="business">Business</option>
                            <option name="leisure" value="leisure">Leisure</option>
                        </select>
                    </div>
                    <div className="survey question-2 text-center not-visible">
                        <h1>And what is the setting?</h1>
                        <select className="leisure">
                            <option value="beach">Leisure: Beach</option>
                            <option value="winter">Leisure: Winter</option>
                            <option value="camping">Leisure: Camping</option>
                            <option value="formal">Leisure: Formal</option>
                            <option value="international">Leisure: International</option>
                            <option value="business international">Business: International</option>
                            <option value="business casual">Business: Casual</option>
                            <option value="business formal">Business: Formal</option>
                        </select>
                    </div>
                    <div className="survey question-3 text-center not-visible">
                        <h1>Where to?</h1>
                        <input type="text"/>
                    </div>
                    <div className="survey question-4 text-center not-visible">
                        <h1>When do you leave?</h1>
                        <input type="date"/>
                    </div>
                    <div className="survey question-5 text-center not-visible">
                        <h1>Any children or babies on this trip?</h1>
                        <select className="children">
                            <option value="none">No children</option>
                            <option value="children">Yes, children will be joining</option>
                            <option value="babies">Yes, babies will be joining</option>
                            <option value="childrenAndBabies">Children AND babies!</option>
                        </select>
                    </div>
                    <button type="submit">
                        Submit
                    </button>
                </form>
			</div>
		)
	}
}

function mapStateToProps(state){
    return{
        surveyResponse: state.surveyReducer,
        loginInfo: state.registerReducer
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        surveyAction: SurveyAction
    }, dispatch)
}

// export default Register;
export default connect(mapStateToProps,mapDispatchToProps)(Survey);