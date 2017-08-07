import React, {Component} from 'react';
import  {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ListAction from '../actions/ListAction';
import WeatherDiv from './WeatherDiv';

class ListView extends Component{
	constructor(props) {
		super(props);
		this.state = {
			listArray: []
		}
	}

	componentWillMount() {
		if(this.props.loginInfo.token !== undefined){
			this.props.listAction({
				token: this.props.loginInfo.token,
				surveyId: this.props.surveyId
			})
		}
	}

	componentWillReceiveProps(nextProps) {
		// console.log("NEXT PROPS")
		// console.log(nextProps)

		var listData = []
		var lastCategory = "";

		nextProps.listView.map((listItem, index)=>{
			if(listItem.itemCategory !== lastCategory){
				listData.push(
					<div className="row" key={listItem.id}>
						<div className="col-xs-offset-1 col-xs-11">
							<h3 className="category-title">{listItem.itemCategory}</h3>
						</div>
					</div>
				)
				lastCategory = listItem.itemCategory;
			}
			listData.push(
				<div className="row" key={listItem.id}>
                	<div className="col-xs-3 text-right">
                		<div className="">
							<input type="checkbox" className="list-checkbox" />
							<label htmlFor="list-checkbox"></label>
						</div>
					</div>
                	<div className="col-xs-9 item">{listItem.item}</div>
                </div> 
			)
		})

		this.setState({
			listArray: listData
		})
	}

	render(){

		return(
			<div>
				<WeatherDiv />
				<div className="listview-page">
					<div className="listview-section col-md-offset-4 col-md-4 col-sm-offset-3 col-sm-6 col-xs-offset-1 col-xs-10">
						<h1 className="text-center">Packing Recommendations</h1>
						{this.state.listArray}
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state){
	return{
		listView: state.listReducer,
		loginInfo: state.registerReducer,
		surveyId: state.surveyReducer
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		listAction: ListAction
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(ListView);