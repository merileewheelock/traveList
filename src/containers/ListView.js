import React, {Component} from 'react';
import  {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ListAction from '../actions/ListAction';
import $ from 'jquery';
import hostAddress from '../config'

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
		console.log("NEXT PROPS")
		console.log(nextProps)

		var listData = []
		var lastCategory = "";
		// var key = 0;

		this.nextProps.listView.map((listItem, index)=>{
			if(listItem.itemCategory !== lastCategory){
				listData.push(
					<div className="col-sm-offset-6" key={listItem.id}>
						<h3 className="category-title">{listItem.itemCategory}</h3>
					</div>
				)
				lastCategory = listItem.itemCategory;
				// key++;
			}
			listData.push(
				<div key={listItem.id}>
                	<div className="col-sm-6 text-right">
						<input type="checkbox" />
						<span className="slider round"></span>
					</div>
                	<div className="col-sm-6 item">{listItem.item}</div>
                </div> 
			)
		})

		this.setState({listArray: listData})
	}

	render(){

		// console.log("******THIS.PROPS******")
		// console.log(this.props)
		// console.log("******THIS.PROPS******")

		this.state.listArray.map((listItem)=>{})
		return(
			<div>
				<h1>Your Packing List</h1>
				{this.state.listArray}
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