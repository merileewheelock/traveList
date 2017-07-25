import React, {Component} from 'react';

class Survey extends Component{
    constructor(props) {
        super(props);
        this.state = {
            surveyStatus: '1'
        }
        this.handleSurvey = this.handleSurvey.bind(this);
        this.handleVisbility = this.handleVisbility.bind(this);
    }

    handleSurvey(event){
        return true;
    }

    handleVisbility(event){
        return true;

    }



	render(){
		return(
			<div className="survey-box text-center col-sm-6 col-sm-offset-3">
				<form>
                    <div className="survey question-1 text-center visible">
                        <h1>What Type of trip is this?</h1>
                        <input type="checkbox"/> I'm a big ol' business person.
                        <br/>
                        <input type="checkbox"/> Time for a vay-cay, hey hey!
                    </div>
                    <div className="survey question-2 text-center not-visible">
                        <h1>And what is the setting?</h1>
                        <select className="leisure">
                            <option value="beach">On the water and in the sun!</option>
                            <option value="winter">Snow outside and warm inside</option>
                            <option value="camping">Something in-tents! (Intense, get it?)</option>
                            <option value="weekend">Just a few days away from home</option>
                            <option value="formal">Black tie</option>
                            <option value="abroad">Trying out a new country for a change</option>
                            <option value="space">space.</option>
                        </select> -----This one if leisure
                        <br/>
                        <select className="business">
                            <option value="international">I'm James Bond - ing it.</option>
                            <option value="domestic">In country</option>
                            <option value="buscasual">Business casual, fool!</option>
                            <option value="busformal">Business formal, sir.</option>
                        </select> ------This one if business
                    </div>
                    <div className="survey question-3 text-center not-visible">
                        <h1>Where'll it be, gov?</h1>
                        <input type="text"/>
                    </div>
                    <div className="survey question-4 text-center not-visible">
                        <h1>For best results, pick a date!</h1>
                        <input type="date"/>
                    </div>
                    <div className="survey question-5 text-center not-visible">
                        <h1>Finally, will there be any kids going with you?</h1>
                        <input type="checkbox"/>No. Never.
                        <br/>
                        <input type="checkbox"/>Yes, of course!
                        <br/>
                        <button bsStyle="primary" bsSize="small" type="submit">
                            Submit
                        </button>
                    </div>
                </form>
			</div>
		)
	}
}

export default Survey;